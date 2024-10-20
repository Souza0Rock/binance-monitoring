"use client";

import React, { createContext, useContext, useState } from "react";
import { ISymbolContextValue, ISymbolData } from "./interface";

export const SymbolsDataContext = createContext<ISymbolContextValue | null>(
  null
);

export function SymbolsDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stashSymbolsSelected, setStashSymbolsSelected] = useState<string[]>(
    []
  );

  const [symbolsSelectedData, setSymbolsSelectedData] = useState<ISymbolData[]>(
    []
  );

  const [loadingAddSymbols, setLoadingAddSymbols] = useState(false);
  const toogleLoadingAddSymbols = () => setLoadingAddSymbols((prev) => !prev);

  return (
    <SymbolsDataContext.Provider
      value={{
        stashSymbolsSelected,
        setStashSymbolsSelected,
        loadingAddSymbols,
        toogleLoadingAddSymbols,
        symbolsSelectedData,
        setSymbolsSelectedData,
      }}
    >
      {children}
    </SymbolsDataContext.Provider>
  );
}

export function useSymbolsData() {
  const context = useContext(SymbolsDataContext);

  if (!context) {
    throw new Error(
      "useSymbolsData must be used within an SymbolsDataProvider"
    );
  }
  return context;
}
