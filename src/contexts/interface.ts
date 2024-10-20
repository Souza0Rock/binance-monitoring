import { Dispatch, SetStateAction } from "react";

export interface ISymbolContextValue {
  stashSymbolsSelected: string[];
  setStashSymbolsSelected: Dispatch<SetStateAction<string[]>>;
  loadingAddSymbols: boolean;
  toogleLoadingAddSymbols: () => void;
  symbolsSelectedData: ISymbolData[];
  setSymbolsSelectedData: Dispatch<SetStateAction<ISymbolData[]>>;
}

export interface ISymbolData {
  symbol: string;
  lastPrice: string;
  bidPrice: string;
  askPrice: string;
  priceChangePercent: string;
}
