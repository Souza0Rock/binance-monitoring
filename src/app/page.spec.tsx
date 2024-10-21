import React from "react";
import Page from "@/app/page";
import { render, screen, waitFor } from "@testing-library/react";
import { fetchAllSymbols } from "@/services/fetchSymbols";

jest.mock("../services/fetchSymbols", () => ({
  fetchAllSymbols: jest.fn(),
}));

jest.mock("../components/Sections", () => ({
  ListAllSymbols: jest.fn(() => <div data-testid="list-all-symbols" />),
  ListSymbolsSelected: jest.fn(() => <div data-testid="list-symbols-selected" />),
}));

const renderAsync = async (Component: any) => {
  let container: HTMLElement;
  await waitFor(async () => {
    container = render(await Component()).container;
  });
  return container!;
};

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders ListAllSymbols and ListSymbolsSelected components with fetched data", async () => {
    const mockSymbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];
    (fetchAllSymbols as jest.Mock).mockResolvedValueOnce(mockSymbols);

    await renderAsync(Page);

    await waitFor(() => {
      expect(fetchAllSymbols).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByTestId("list-all-symbols")).toBeInTheDocument();
    expect(screen.getByTestId("list-symbols-selected")).toBeInTheDocument();
  });
});
