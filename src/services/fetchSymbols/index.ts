import { connectApi } from "..";
import { TSymbolNotData } from "@/contexts/interface";

export const fetchAllSymbols = async (): Promise<TSymbolNotData> => {
  try {
    const {
      data: { symbols },
    } = await connectApi.get("/exchangeInfo");

    const convertedData = symbols.map((item: { symbol: string }) =>
      item.symbol.toLowerCase()
    );

    return convertedData;
  } catch (error) {
    return [];
  }
};
