"use client";

import React from "react";
import { useSymbolsData } from "@/contexts/symbolsData";
import { useBinanceSocket } from "@/hooks/useBinanceSocket";

export const ListSymbolsSelected: React.FC = () => {
  const { symbolsSelectedData } = useSymbolsData();

  const { removeSymbol } = useBinanceSocket();

  const formatPercentage = (percent: string) => {
    const num = parseFloat(percent);
    return isNaN(num) ? "N/A" : `${num.toFixed(2)}%`;
  };

  return (
    <main className="p-2 border-solid border-2 overflow-x-auto border-sky-500">
      <table className="w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left text-black bg-[#f1f4ff]">
              Symbol
            </th>
            <th className="px-3 py-2 text-left text-black bg-[#f1f4ff]">
              Last Price
            </th>
            <th className="px-3 py-2 text-left text-black bg-[#f1f4ff]">
              Bid Price
            </th>
            <th className="px-3 py-2 text-left text-black bg-[#f1f4ff]">
              Ask Price
            </th>
            <th className="px-3 py-2 text-left text-black bg-[#f1f4ff]">
              Price Change (%)
            </th>
            <th />
          </tr>
        </thead>

        <tbody>
          {symbolsSelectedData.map((symbol, index) => (
            <tr key={index}>
              <td className="px-3 py-2 text-left border border-[#f1f4ff] border-t-0 border-r-0">
                {symbol.symbol}
              </td>
              <td className="px-3 py-2 text-left border border-[#f1f4ff] border-t-0 border-r-0">
                {symbol.lastPrice}
              </td>
              <td className="px-3 py-2 text-left border border-[#f1f4ff] border-t-0 border-r-0">
                {symbol.bidPrice}
              </td>
              <td className="px-3 py-2 text-left border border-[#f1f4ff] border-t-0 border-r-0">
                {symbol.askPrice}
              </td>
              <td className="px-3 py-2 text-center border border-[#f1f4ff] border-t-0 border-r-0">
                {formatPercentage(symbol.priceChangePercent)}
              </td>
              <td className="px-3 py-2 text-center border border-[#f1f4ff] border-t-0 border-r-0">
                <button onClick={() => removeSymbol(symbol)}>exclude</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

// "use client"

// import React, { useRef, useState, useEffect } from "react";
// import { useSymbolsData } from "@/contexts/symbolsData";
// import { ISymbolData } from "@/contexts/interface";

// export const ListSymbolsSelected: React.FC = () => {
//   const {
//     stashSymbolsSelected,
//     setStashSymbolsSelected,
//     toogleLoadingAddSymbols,
//     symbolsSelectedData,
//     setSymbolsSelectedData,
//   } = useSymbolsData();

//   const [isSocketOpen, setIsSocketOpen] = useState(false);
//   const socketRef = useRef<WebSocket | null>(null); // Usar useRef para armazenar o WebSocket

//   const addSymbolInStash = (symbol: string) => {
//     if (stashSymbolsSelected.includes(symbol)) {
//       const removeSymbol = stashSymbolsSelected.filter((i) => i !== symbol);
//       setStashSymbolsSelected(removeSymbol);
//       return;
//     }
//     setStashSymbolsSelected((prev) => [...prev, symbol]);
//   };

//   // Hook para abrir e fechar a conexão WebSocket com base no stashSymbolsSelected
//   useEffect(() => {
//     if (stashSymbolsSelected.length === 0) {
//       // Se não houver símbolos, fechar a conexão
//       if (socketRef.current) {
//         console.log("Fechando WebSocket, não há símbolos selecionados.");
//         socketRef.current.close();
//         socketRef.current = null;
//       }
//       setIsSocketOpen(false);
//       return;
//     }

//     // Se já houver um WebSocket aberto, não recriar um novo
//     if (isSocketOpen) {
//       console.log("WebSocket já está aberto, não recriar.");
//       return;
//     }

//     // Abrir um novo WebSocket
//     const createQuery = stashSymbolsSelected.map(
//       (i) => `${i.toLowerCase()}@ticker`
//     );

//     const webSocket = new WebSocket(
//       `wss://stream.binance.com:9443/stream?streams=${createQuery.join("/")}`
//     );

//     socketRef.current = webSocket;
//     setIsSocketOpen(true);

//     webSocket.onopen = () => {
//       console.log("WebSocket aberto.");
//       toogleLoadingAddSymbols();
//     };

//     webSocket.onmessage = (event) => {
//       const data = JSON.parse(event.data)?.data;

//       if (!data || !data.s || !data.E) return;

//       const symbolTransform: ISymbolData = {
//         symbol: data.s,
//         lastPrice: data.c,
//         bidPrice: data.b,
//         askPrice: data.a,
//         priceChangePercent: data.P,
//       };

//       setSymbolsSelectedData((prev) => {
//         const existingItem = prev.find(
//           (item) => item.symbol === symbolTransform.symbol
//         );

//         if (existingItem) {
//           return prev.map((item) =>
//             item.symbol === symbolTransform.symbol
//               ? { ...symbolTransform }
//               : item
//           );
//         }

//         return [...prev, symbolTransform];
//       });
//     };

//     webSocket.onerror = (event) => {
//       console.error("Erro no WebSocket:", event);
//     };

//     webSocket.onclose = () => {
//       console.log("Conexão WebSocket fechada.");
//       setIsSocketOpen(false);
//       socketRef.current = null;
//     };

//     // Limpar a conexão WebSocket quando o componente desmontar ou os símbolos mudarem
//     return () => {
//       if (socketRef.current) {
//         console.log("Fechando WebSocket ao desmontar ou mudar os símbolos.");
//         socketRef.current.close();
//         socketRef.current = null;
//       }
//     };
//   }, [stashSymbolsSelected, isSocketOpen, toogleLoadingAddSymbols, setSymbolsSelectedData]);

//   const removeSymbol = (symbolData: ISymbolData) => {
//     console.log("Tentando remover símbolo e atualizar WebSocket...");

//     const removeSymbolStash = stashSymbolsSelected.filter(
//       (i) => i !== symbolData.symbol
//     );

//     setStashSymbolsSelected(removeSymbolStash);

//     const removeSymbolSelected = symbolsSelectedData.filter(
//       (i) => i.symbol !== symbolData.symbol
//     );

//     setSymbolsSelectedData(removeSymbolSelected);

//     // O useEffect cuidará do fechamento e reabertura do WebSocket
//   };

//   return (
//     <main className="p-2 border-solid border-2 overflow-x-auto border-sky-500">
//       <table className="w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
//         <thead>
//           <tr>
//             <th className="px-3 py-2 text-left text-black bg-[#f1f4ff]">
//               Symbol
//             </th>
//             <th className="px-3 py-2 text-left text-black bg-[#f1f4ff]">
//               Last Price
//             </th>
//             <th className="px-3 py-2 text-left text-black bg-[#f1f4ff]">
//               Bid Price
//             </th>
//             <th className="px-3 py-2 text-left text-black bg-[#f1f4ff]">
//               Ask Price
//             </th>
//             <th className="px-3 py-2 text-left text-black bg-[#f1f4ff]">
//               Price Change (%)
//             </th>
//             <th />
//           </tr>
//         </thead>

//         <tbody>
//           {symbolsSelectedData.map((symbol, index) => (
//             <tr key={index}>
//               <td className="px-3 py-2 text-left border border-[#f1f4ff] border-t-0 border-r-0">
//                 {symbol.symbol}
//               </td>
//               <td className="px-3 py-2 text-left border border-[#f1f4ff] border-t-0 border-r-0">
//                 {symbol.lastPrice}
//               </td>
//               <td className="px-3 py-2 text-left border border-[#f1f4ff] border-t-0 border-r-0">
//                 {symbol.bidPrice}
//               </td>
//               <td className="px-3 py-2 text-left border border-[#f1f4ff] border-t-0 border-r-0">
//                 {symbol.askPrice}
//               </td>
//               <td className="px-3 py-2 text-center border border-[#f1f4ff] border-t-0 border-r-0">
//                 {symbol.priceChangePercent}
//               </td>
//               <td className="px-3 py-2 text-center border border-[#f1f4ff] border-t-0 border-r-0">
//                 <button onClick={() => removeSymbol(symbol)}>Excluir</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </main>
//   );
// };
