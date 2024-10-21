import { useCallback, useEffect, useRef } from "react";
import { ISymbolData } from "@/contexts/interface";
import { useSymbolsData } from "@/contexts/symbolsData";
import { toast } from "react-toastify";

export const useSymbolsCreateData = ({
  blockConnect,
}: {
  blockConnect?: boolean;
}) => {
  const {
    stashSymbolsSelected,
    setStashSymbolsSelected,
    enableLoadingAddSymbols,
    disableLoadingAddSymbols,
    loadingGetAllSymbolsSelected,
    symbolsSelectedData,
    setSymbolsSelectedData,
    symbolsSelected,
    setSymbolsSelected,
  } = useSymbolsData();

  const socketRef = useRef<WebSocket | null>(null);

  const addSymbolInStash = useCallback(
    (symbol: string) => {
      if (stashSymbolsSelected.includes(symbol)) {
        const removeSymbol = stashSymbolsSelected.filter((i) => i !== symbol);
        setStashSymbolsSelected(removeSymbol);

        return;
      }

      setStashSymbolsSelected((prev) => [...prev, symbol]);
    },
    [stashSymbolsSelected, setStashSymbolsSelected]
  );

  const addSymbols = () => {
    enableLoadingAddSymbols();

    const filterSymbols = symbolsSelectedData.filter((i) =>
      stashSymbolsSelected.includes(i.symbol)
    );

    setSymbolsSelectedData(filterSymbols);
    setSymbolsSelected(stashSymbolsSelected);
  };

  const removeSymbol = useCallback(
    async (symbolData: ISymbolData) => {
      const removeSymbolFromStash = symbolsSelected.filter(
        (i) => i !== symbolData.symbol.toLowerCase()
      );

      setStashSymbolsSelected(removeSymbolFromStash);
      setSymbolsSelected(removeSymbolFromStash);

      const removeSymbolSelected = symbolsSelectedData.filter(
        (i) => i.symbol !== symbolData.symbol
      );

      setSymbolsSelectedData(removeSymbolSelected);
    },
    [symbolsSelectedData, stashSymbolsSelected]
  );

  const closeSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  };

  const clearSelection = () => {
    closeSocket();
    setSymbolsSelected([]);
    setSymbolsSelectedData([]);
    setStashSymbolsSelected([]);
  };

  useEffect(() => {
    if (blockConnect) return;

    let timerId: NodeJS.Timeout | null = null;

    if (loadingGetAllSymbolsSelected) {
      timerId = setTimeout(() => {
        toast.warn(
          "Loading is taking longer than usual, check your connection or select other symbols.",
          {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          }
        );
      }, 25000);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [loadingGetAllSymbolsSelected]);

  useEffect(() => {
    if (symbolsSelected.length === 0 || blockConnect) return;

    closeSocket();

    const createQuery = stashSymbolsSelected.map(
      (i) => `${i.toLowerCase()}@ticker`
    );

    socketRef.current = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${createQuery.join("/")}`
    );

    socketRef.current.onopen = () => {
      disableLoadingAddSymbols();
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

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [symbolsSelected]);

  return {
    addSymbols,
    addSymbolInStash,
    removeSymbol,
    clearSelection,
  };
};
