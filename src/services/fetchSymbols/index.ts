import { connectApi } from "..";

export const fetchAllSymbols = async () => {
  try {
    const {
      data: { symbols },
    } = await connectApi.get("/exchangeInfo");

    const convertedData = symbols.map(
      (item: { symbol: string }) => item.symbol
    );

    return convertedData;
  } catch (error) {
    return [];
  }
};
