"use client";

import React, { useState, useMemo } from "react";
import { Button, Checkbox, Input } from "@/components/common";
import { useSymbolsData } from "@/contexts/symbolsData";
import { useSymbolsCreateData } from "@/hooks/useSymbolsCreateData";
import { TSymbolNotData } from "@/contexts/interface";

export const ListAllSymbols: React.FC<{ symbols: TSymbolNotData }> = ({
  symbols,
}) => {
  const { stashSymbolsSelected, loadingAddSymbols, symbolsSelectedData } =
    useSymbolsData();

  const { addSymbols, addSymbolInStash, clearSelection } = useSymbolsCreateData(
    { blockConnect: true }
  );

  const [filterSymbolsValue, setFilterSymbolsValue] = useState("");

  const filterValueLower = filterSymbolsValue.toLowerCase();

  const symbolsFiltered = useMemo(() => {
    return symbols.filter((symbol) => symbol.includes(filterValueLower));
  }, [symbols, filterValueLower]);

  return (
    <section
      data-testid="list-all-symbols"
      className="h-[94vh] rounded p-2 flex flex-col gap-4 bg-zinc-300 border-solid border-2 border-zinc-400"
    >
      <Input label="Search" onChange={(e) => setFilterSymbolsValue(e)} />

      {symbolsFiltered.length > 0 ? (
        <div className="overflow-y-auto p-2 px-3 grid gap-2 bg-zinc-200">
          {symbolsFiltered.map((symbol, index) => (
            <Checkbox
              key={index}
              label={symbol.toUpperCase()}
              id={`checkbox-${symbol}`}
              onChange={() => addSymbolInStash(symbol)}
              checked={stashSymbolsSelected.includes(symbol)}
            />
          ))}
        </div>
      ) : (
        <h3 className="mt-4 text-2xl text-center line-break-anywhere">
          Not found results for "{filterSymbolsValue}"
        </h3>
      )}

      <Button
        label="Add symbols"
        onClick={addSymbols}
        loading={loadingAddSymbols}
        disabled={loadingAddSymbols || stashSymbolsSelected.length === 0}
        className="mt-auto"
      />

      <Button
        label="Clear all symbols"
        onClick={clearSelection}
        disabled={loadingAddSymbols || symbolsSelectedData.length === 0}
        outlined
      />
    </section>
  );
};
