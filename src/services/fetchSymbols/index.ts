import { webSocket } from "rxjs/webSocket";
import { connectApi } from "..";

export const fetchAllSymbols = async (): Promise<string[]> => {
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

export const fetchSocketSymbolsSelected = async () => {
  const socketBaseUrl = process.env.NEXT_PUBLIC_API_BINANCE_SOCKET ?? "";


  
  const connectSocket = webSocket(socketBaseUrl);


};
