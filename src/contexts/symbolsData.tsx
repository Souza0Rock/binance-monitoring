"use client";

import React, { createContext, useContext, useState } from "react";
import { ISymbolContextValue, ISymbolData, TSymbolNotData } from "./interface";

export const SymbolsDataContext = createContext<ISymbolContextValue | null>(
  null
);

export function SymbolsDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stashSymbolsSelected, setStashSymbolsSelected] = useState<TSymbolNotData>(
    []
  );

  const [symbolsSelected, setSymbolsSelected] = useState<TSymbolNotData>([]);

  const [symbolsSelectedData, setSymbolsSelectedData] = useState<ISymbolData[]>(
    []
  );

  const loadingForClearTable =
    symbolsSelected.length > 0 && symbolsSelectedData.length === 0;

  const loadingGetAllSymbolsSelected =
    symbolsSelected.length !== symbolsSelectedData.length;

  const [loadingAddSymbols, setLoadingAddSymbols] = useState(false);
  const enableLoadingAddSymbols = () => setLoadingAddSymbols(true);
  const disableLoadingAddSymbols = () => setLoadingAddSymbols(false);

  return (
    <SymbolsDataContext.Provider
      value={{
        stashSymbolsSelected,
        setStashSymbolsSelected,
        symbolsSelected,
        setSymbolsSelected,
        symbolsSelectedData,
        setSymbolsSelectedData,
        loadingAddSymbols,
        disableLoadingAddSymbols,
        enableLoadingAddSymbols,
        loadingForClearTable,
        loadingGetAllSymbolsSelected,
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
