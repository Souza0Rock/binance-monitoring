import axios from "axios";

export const connectApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BINANCE,
});

export const connectSocket = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BINANCE_SOCKET,
});
