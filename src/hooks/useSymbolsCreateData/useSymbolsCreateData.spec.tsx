import { renderHook, act } from "@testing-library/react";
import { useSymbolsCreateData } from "@/hooks/useSymbolsCreateData";
import { useSymbolsData } from "@/contexts/symbolsData";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn(),
  },
}));

jest.mock("../../contexts/symbolsData", () => ({
  useSymbolsData: jest.fn(),
}));

describe("useSymbolsCreateData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should remove a symbol from the stash", () => {
    const mockSetStashSymbolsSelected = jest.fn();
    const mockSetSymbolsSelected = jest.fn();

    (useSymbolsData as jest.Mock).mockReturnValue({
      stashSymbolsSelected: ["BTCUSDT", "ETHUSDT"],
      setStashSymbolsSelected: mockSetStashSymbolsSelected,
      setSymbolsSelected: mockSetSymbolsSelected,
      enableLoadingAddSymbols: jest.fn(),
      disableLoadingAddSymbols: jest.fn(),
      loadingGetAllSymbolsSelected: false,
      symbolsSelectedData: [],
      setSymbolsSelectedData: jest.fn(),
      symbolsSelected: [],
    });

    const { result } = renderHook(() =>
      useSymbolsCreateData({ blockConnect: false })
    );

    act(() => {
      result.current.addSymbolInStash("BTCUSDT");
    });

    expect(mockSetStashSymbolsSelected).toHaveBeenCalledWith(
      expect.arrayContaining(["ETHUSDT"])
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });
});
