import axios from "axios";

export const connectApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BINANCE,
});
