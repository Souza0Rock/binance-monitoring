import React from "react";
import { Button } from ".";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Button Component", () => {
  test("renders the button with label", () => {
    render(<Button label="Click Me" />);

    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<Button label="Click Me" className="custom-class" />);

    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("custom-class");
  });

  test("disables the button when disabled is true", () => {
    render(<Button label="Click Me" disabled={true} />);

    const button = screen.getByText("Click Me");
    expect(button).toBeDisabled();
  });

  test("shows loading spinner when loading is true", () => {
    render(<Button label="Click Me" loading={true} />);

    const loadingSpinner = screen.getByTestId("spinner-component");
    expect(loadingSpinner).toBeInTheDocument();
  });

  test("triggers onClick when clicked", () => {
    const handleClick = jest.fn();

    render(<Button label="Click Me" onClick={handleClick} />);

    const button = screen.getByText("Click Me");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("button is outlined when outlined prop is true", () => {
    render(<Button label="Click Me" outlined={true} />);

    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("bg-transparent text-[#0c162d]");
  });

  test("button applies default styles when outlined is false", () => {
    render(<Button label="Click Me" />);

    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("bg-slate-50 text-[#0c162d]");
  });
});
