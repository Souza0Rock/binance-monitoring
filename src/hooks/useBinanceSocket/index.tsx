import { ISymbolData } from "@/contexts/interface";
import { useSymbolsData } from "@/contexts/symbolsData";
import { useRef, useState } from "react";

export const useBinanceSocket = () => {
  const {
    stashSymbolsSelected,
    setStashSymbolsSelected,
    toogleLoadingAddSymbols,
    symbolsSelectedData,
    setSymbolsSelectedData,
  } = useSymbolsData();

  // Usar state para controlar o status da conexão (aberta ou fechada)
  const [isSocketOpen, setIsSocketOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // Adicionar estado para verificar se o socket está em processo de fechamento
  const socketRef = useRef<WebSocket | null>(null); // Usar useRef para armazenar o WebSocket

  const addSymbolInStash = (symbol: string) => {
    if (stashSymbolsSelected.includes(symbol)) {
      const removeSymbol = stashSymbolsSelected.filter((i) => i !== symbol);
      setStashSymbolsSelected(removeSymbol);
      return;
    }

    setStashSymbolsSelected((prev) => [...prev, symbol]);
  };

  const fetchSymbolsSocket = () => {
    if (isClosing) {
      console.log("Aguarde o WebSocket fechar completamente antes de reabrir.");
      return;
    }

    // Se já houver um WebSocket aberto, fechá-lo antes de criar outro
    if (socketRef.current && isSocketOpen) {
      console.log("Fechando WebSocket existente...");
      socketRef.current.close();
      return;
    }

    try {
      toogleLoadingAddSymbols();

      const createQuery = stashSymbolsSelected.map(
        (i) => `${i.toLowerCase()}@ticker`
      );

      // const webSocket = new WebSocket(
      //   `wss://stream.binance.com:9443/stream?streams=${createQuery.join("/")}`
      // );

      if (!socketRef.current) {
        socketRef.current = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${createQuery.join("/")}`);
      }

      setIsSocketOpen(true); // Atualiza o status para aberto

      socketRef.current.onopen = () => {
        console.log("WebSocket aberto.");
        toogleLoadingAddSymbols();
      };

      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data)?.data;

        if (!data || !data.s || !data.E) return;

        const symbolTransform: ISymbolData = {
          symbol: data.s,
          lastPrice: data.c,
          bidPrice: data.b,
          askPrice: data.a,
          priceChangePercent: data.P,
        };

        setSymbolsSelectedData((prev) => {
          const existingItem = prev.find(
            (item) => item.symbol === symbolTransform.symbol
          );

          if (existingItem) {
            return prev.map((item) =>
              item.symbol === symbolTransform.symbol
                ? { ...symbolTransform }
                : item
            );
          }

          return [...prev, symbolTransform];
        });
      };

      socketRef.current.onerror = (event) => {
        console.error("Erro no WebSocket:", event);
      };

      socketRef.current.onclose = () => {
        console.log("Conexão WebSocket fechada.");
        setIsSocketOpen(false); // Atualiza o status para fechado
        setIsClosing(false); // O socket foi completamente fechado
        socketRef.current = null; // Limpa o socketRef ao fechar a conexão
      };
    } catch (error) {
      console.error("Erro ao conectar WebSocket:", error);
      setIsSocketOpen(false); // Certifica-se de que o estado está correto
    }
  };

  const addSymbolsSelected = () => {
    if (stashSymbolsSelected.length === 0) return;

    fetchSymbolsSocket(); // Criar nova conexão
  };

  const removeSymbol = (symbolData: ISymbolData) => {
    console.log("Tentando fechar WebSocket...");

    // Verifica se o WebSocket existe e está aberto antes de fechar
    if (isSocketOpen && socketRef.current) {
      console.log("Fechando WebSocket...");
      setIsClosing(true); // Marcar que o WebSocket está fechando
      socketRef.current.close(); // Fechar a conexão atual
    } else {
      console.log("Nenhum WebSocket para fechar ou já fechado.");
    }

    const removeSymbolStash = stashSymbolsSelected.filter(
      (i) => i !== symbolData.symbol
    );

    setStashSymbolsSelected(removeSymbolStash);

    const removeSymbolSelected = symbolsSelectedData.filter(
      (i) => i.symbol !== symbolData.symbol
    );

    setSymbolsSelectedData(removeSymbolSelected);

    // Aguardar o WebSocket ser completamente fechado antes de reabrir
    if (!isClosing) {
      fetchSymbolsSocket(); // Reabrir o WebSocket somente após o fechamento completo
    }
  };

  return {
    addSymbolInStash,
    addSymbolsSelected,
    fetchSymbolsSocket,
    removeSymbol,
  };
};
