import React from "react";
import { ListSymbolsSelected } from ".";
import { render, screen } from "@testing-library/react";
import { useSymbolsData } from "@/contexts/symbolsData";

jest.mock("../../../contexts/symbolsData", () => ({
  useSymbolsData: jest.fn(),
}));

const contextMock = {
  loadingForClearTable: false,
  stashSymbolsSelected: [],
  setStashSymbolsSelected: jest.fn(),
  symbolsSelected: [],
  setSymbolsSelected: jest.fn(),
  setSymbolsSelectedData: jest.fn(),
  loadingAddSymbols: false,
  enableLoadingAddSymbols: jest.fn(),
  disableLoadingAddSymbols: jest.fn(),
  loadingGetAllSymbolsSelected: false,
};

describe("ListSymbolsSelected Component", () => {
  const mockUseSymbolsData = useSymbolsData as jest.MockedFunction<
    typeof useSymbolsData
  >;

  beforeEach(() => {
    mockUseSymbolsData.mockClear();
  });

  test("renders table when symbols are selected", () => {
    mockUseSymbolsData.mockReturnValue({
      symbolsSelectedData: [
        {
          symbol: "BTCUSDT",
          lastPrice: "50000",
          bidPrice: "49950",
          askPrice: "50010",
          priceChangePercent: "2.5",
        },
        {
          symbol: "ETHUSDT",
          lastPrice: "4000",
          bidPrice: "3990",
          askPrice: "4010",
          priceChangePercent: "1.5",
        },
      ],
      ...contextMock,
    });

    render(<ListSymbolsSelected />);

    const symbolColumn = screen.getByText("Symbol");
    expect(symbolColumn).toBeInTheDocument();

    const btcSymbol = screen.getByText("BTCUSDT");
    const ethSymbol = screen.getByText("ETHUSDT");
    expect(btcSymbol).toBeInTheDocument();
    expect(ethSymbol).toBeInTheDocument();

    const btcLastPrice = screen.getByText("50000");
    const ethLastPrice = screen.getByText("4000");
    expect(btcLastPrice).toBeInTheDocument();
    expect(ethLastPrice).toBeInTheDocument();
  });

  test('renders "Select symbols for to start! :D" when no symbols are selected and loading is false', () => {
    mockUseSymbolsData.mockReturnValue({
      symbolsSelectedData: [],
      ...contextMock,
    });

    render(<ListSymbolsSelected />);

    const message = screen.getByText("Select symbols for to start! :D");
    expect(message).toBeInTheDocument();
  });
});
