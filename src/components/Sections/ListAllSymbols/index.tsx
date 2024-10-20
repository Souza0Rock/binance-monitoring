"use client";

import React from "react";
import { Button, Checkbox, Input } from "@/components/common";
import { useSymbolsData } from "@/contexts/symbolsData";
import { useBinanceSocket } from "@/hooks/useBinanceSocket";

export const ListAllSymbols: React.FC<{ symbols: string[] }> = ({
  symbols,
}) => {
  const { stashSymbolsSelected, loadingAddSymbols } = useSymbolsData();
  const { addSymbolInStash, addSymbolsSelected } = useBinanceSocket();

  return (
    <section className="max-h-[94vh] p-2 flex flex-col gap-4 bg-zinc-300 border-solid border-2 border-sky-500">
      <Input name={""} label={"Search"} />

      <div className="overflow-y-auto p-2 px-3 grid gap-2 bg-zinc-200">
        {symbols.map((symbol, index) => (
          <Checkbox
            key={index}
            label={symbol}
            id={`checkbox-${symbol}`}
            onChange={() => addSymbolInStash(symbol)}
            checked={stashSymbolsSelected.includes(symbol)}
          />
        ))}
      </div>

      <Button
        label={"Add symbols"}
        loading={loadingAddSymbols}
        onClick={addSymbolsSelected}
      />
    </section>
  );
};
