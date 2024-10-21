import { renderHook, act } from "@testing-library/react";
import { SymbolsDataProvider, useSymbolsData } from "./symbolsData";

describe("SymbolsDataProvider", () => {
  test("provides default context values", () => {
    const { result } = renderHook(() => useSymbolsData(), {
      wrapper: SymbolsDataProvider,
    });

    expect(result.current.stashSymbolsSelected).toEqual([]);
    expect(result.current.symbolsSelected).toEqual([]);
    expect(result.current.symbolsSelectedData).toEqual([]);
    expect(result.current.loadingAddSymbols).toBe(false);
    expect(result.current.loadingForClearTable).toBe(false);
    expect(result.current.loadingGetAllSymbolsSelected).toBe(false);
  });

  test("allows updating stashSymbolsSelected", () => {
    const { result } = renderHook(() => useSymbolsData(), {
      wrapper: SymbolsDataProvider,
    });

    act(() => {
      result.current.setStashSymbolsSelected(["BTCUSDT", "ETHUSDT"]);
    });

    expect(result.current.stashSymbolsSelected).toEqual(["BTCUSDT", "ETHUSDT"]);
  });

  test("allows updating symbolsSelected", () => {
    const { result } = renderHook(() => useSymbolsData(), {
      wrapper: SymbolsDataProvider,
    });

    act(() => {
      result.current.setSymbolsSelected(["BTCUSDT", "ETHUSDT"]);
    });

    expect(result.current.symbolsSelected).toEqual(["BTCUSDT", "ETHUSDT"]);
  });

  test("allows updating symbolsSelectedData", () => {
    const { result } = renderHook(() => useSymbolsData(), {
      wrapper: SymbolsDataProvider,
    });

    const newData = [
      {
        symbol: "BTCUSDT",
        lastPrice: "50000",
        bidPrice: "49950",
        askPrice: "50010",
        priceChangePercent: "2.5",
      },
    ];

    act(() => {
      result.current.setSymbolsSelectedData(newData);
    });

    expect(result.current.symbolsSelectedData).toEqual(newData);
  });

  test("toggles loadingAddSymbols", () => {
    const { result } = renderHook(() => useSymbolsData(), {
      wrapper: SymbolsDataProvider,
    });

    act(() => {
      result.current.enableLoadingAddSymbols();
    });

    expect(result.current.loadingAddSymbols).toBe(true);

    act(() => {
      result.current.disableLoadingAddSymbols();
    });

    expect(result.current.loadingAddSymbols).toBe(false);
  });

  test("calculates loadingForClearTable correctly", () => {
    const { result } = renderHook(() => useSymbolsData(), {
      wrapper: SymbolsDataProvider,
    });

    act(() => {
      result.current.setSymbolsSelected(["BTCUSDT"]);
      result.current.setSymbolsSelectedData([]);
    });

    expect(result.current.loadingForClearTable).toBe(true);
  });
});
