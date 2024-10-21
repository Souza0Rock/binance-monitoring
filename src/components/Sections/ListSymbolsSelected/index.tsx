"use client";

import React, { Fragment } from "react";
import { useSymbolsData } from "@/contexts/symbolsData";
import { LoadingSpinner } from "@/components/common";
import { useSymbolsCreateData } from "@/hooks/useSymbolsCreateData";
import { formatPercentage } from "@/utils/formatPercentage";
import Image from "next/image";
import TrashIcon from "../../../assets/trash.svg";

export const ListSymbolsSelected: React.FC = () => {
  const {
    symbolsSelectedData,
    loadingForClearTable,
    loadingGetAllSymbolsSelected,
  } = useSymbolsData();

  const { removeSymbol } = useSymbolsCreateData({ blockConnect: false });

  const renderTable = () => {
    if (symbolsSelectedData.length > 0)
      return (
        <Fragment>
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-black bg-[#f1f4ff]" />
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
                <th className="min-w-[156px] px-3 py-2 text-center text-black bg-[#f1f4ff]">
                  Price Change (%)
                </th>
              </tr>
            </thead>

            <tbody>
              {symbolsSelectedData.map((symbol) => (
                <tr key={symbol.symbol}>
                  <td className="px-3 py-2 border border-[#f1f4ff] border-t-0 border-r-0 flex justify-center">
                    <button
                      className="w-6 h-6"
                      onClick={() => removeSymbol(symbol)}
                    >
                      <Image src={TrashIcon} alt={"Exclude Symbol"} />
                    </button>
                  </td>
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
                  <td className="px-3 py-2 text-center border border-[#f1f4ff] border-t-0">
                    {formatPercentage(symbol.priceChangePercent)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {loadingGetAllSymbolsSelected && (
            <div className="mt-4 flex gap-3 items-center justify-center">
              <h2>Loading symbols, please wait...</h2>
              <LoadingSpinner size={20} />
            </div>
          )}
        </Fragment>
      );

    return <h2>Select symbols for to start! :D</h2>;
  };

  return (
    <main
      data-testid="list-symbols-selected"
      className="h-fit p-2 bg-zinc-300 rounded border-solid border-2 overflow-x-auto border-zinc-400 min-[600px]:h-[94vh]"
    >
      {loadingForClearTable ? (
        <div className="h-full flex justify-center items-center">
          <LoadingSpinner size={64} />
        </div>
      ) : (
        renderTable()
      )}
    </main>
  );
};
