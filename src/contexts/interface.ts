import { Dispatch, SetStateAction } from "react";

export interface ISymbolContextValue {
  stashSymbolsSelected: TSymbolNotData;
  setStashSymbolsSelected: Dispatch<SetStateAction<TSymbolNotData>>;
  symbolsSelected: TSymbolNotData;
  setSymbolsSelected: Dispatch<SetStateAction<TSymbolNotData>>;
  symbolsSelectedData: ISymbolData[];
  setSymbolsSelectedData: Dispatch<SetStateAction<ISymbolData[]>>;
  loadingAddSymbols: boolean;
  enableLoadingAddSymbols: () => void;
  disableLoadingAddSymbols: () => void;
  loadingForClearTable: boolean;
  loadingGetAllSymbolsSelected: boolean;
}

export interface ISymbolData {
  symbol: string;
  lastPrice: string;
  bidPrice: string;
  askPrice: string;
  priceChangePercent: string;
}

export type TSymbolNotData = string[];
