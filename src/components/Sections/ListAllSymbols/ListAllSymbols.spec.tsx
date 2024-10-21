import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ListAllSymbols } from ".";
import { useSymbolsData } from "@/contexts/symbolsData";
import { useSymbolsCreateData } from "@/hooks/useSymbolsCreateData";

jest.mock("../../../contexts/symbolsData", () => ({
  useSymbolsData: jest.fn(),
}));

jest.mock("../../../hooks/useSymbolsCreateData", () => ({
  useSymbolsCreateData: jest.fn(),
}));

describe("ListAllSymbols Component", () => {
  const mockUseSymbolsData = useSymbolsData as jest.MockedFunction<
    typeof useSymbolsData
  >;
  const mockUseSymbolsCreateData = useSymbolsCreateData as jest.MockedFunction<
    typeof useSymbolsCreateData
  >;

  beforeEach(() => {
    mockUseSymbolsData.mockReturnValue({
      stashSymbolsSelected: [],
      loadingAddSymbols: false,
      symbolsSelectedData: [],
      setStashSymbolsSelected: jest.fn(),
      symbolsSelected: [],
      setSymbolsSelected: jest.fn(),
      setSymbolsSelectedData: jest.fn(),
      enableLoadingAddSymbols: jest.fn(),
      disableLoadingAddSymbols: jest.fn(),
      loadingForClearTable: false,
      loadingGetAllSymbolsSelected: false,
    });

    mockUseSymbolsCreateData.mockReturnValue({
      addSymbols: jest.fn(),
      addSymbolInStash: jest.fn(),
      clearSelection: jest.fn(),
      removeSymbol: jest.fn(),
    });
  });

  test("renders search input and buttons", () => {
    render(<ListAllSymbols symbols={["BTCUSDT", "ETHUSDT"]} />);

    const input = screen.getByLabelText("Search");
    expect(input).toBeInTheDocument();

    const addButton = screen.getByText("Add symbols");
    const clearButton = screen.getByText("Clear all symbols");

    expect(addButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  test("filters symbols based on search input", () => {
    render(<ListAllSymbols symbols={["BTCUSDT", "ETHUSDT", "BNBUSDT"]} />);

    const input = screen.getByLabelText("Search");

    fireEvent.change(input, { target: { value: "ETH" } });

    expect(screen.queryByLabelText("BTCUSDT")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("BNBUSDT")).not.toBeInTheDocument();
  });

  test("displays 'Not found results' message when no symbols match search input", () => {
    render(<ListAllSymbols symbols={["BTCUSDT", "ETHUSDT", "BNBUSDT"]} />);

    const input = screen.getByLabelText("Search");

    fireEvent.change(input, { target: { value: "XRP" } });

    const notFoundMessage = screen.getByText('Not found results for "XRP"');
    expect(notFoundMessage).toBeInTheDocument();
  });

  test("disables 'Add symbols' button when no symbols are selected", () => {
    render(<ListAllSymbols symbols={["BTCUSDT", "ETHUSDT"]} />);

    const addButton = screen.getByText("Add symbols");

    expect(addButton).toBeDisabled();
  });
});
