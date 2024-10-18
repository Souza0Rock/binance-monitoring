"use client"

import React, { useState } from "react";
import { Checkbox, Input } from "@/components/common";

export const ListAllSymbols: React.FC<{ symbols: string[] }> = ({
  symbols,
}) => {
  const [] = useState();

  return (
    <section className="p-2 flex flex-col gap-4 bg-zinc-300 border-solid border-2 border-sky-500">
      <Input name={""} label={"Search"} />

      <div className="p-2 px-3 grid gap-2 bg-zinc-200">
        {symbols.map((symbol, index) => (
          <Checkbox id={`checkbox-${symbol}`} key={index} />
        ))}
      </div>
    </section>
  );
};
