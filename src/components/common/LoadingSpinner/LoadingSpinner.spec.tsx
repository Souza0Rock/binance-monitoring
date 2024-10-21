import React from "react";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from ".";

describe("LoadingSpinner Component", () => {
  test("renders the spinner component", () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByTestId("spinner-component");
    expect(spinner).toBeInTheDocument();
  });

  test("applies default size and color", () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByTestId("spinner-component");

    expect(spinner).toHaveStyle({
      width: "48px",
      height: "48px",
      borderColor: "#f3fcff",
      borderRightColor: "transparent",
    });
  });

  test("applies custom size and color", () => {
    render(<LoadingSpinner size={32} color="#ff0000" />);

    const spinner = screen.getByTestId("spinner-component");

    expect(spinner).toHaveStyle({
      width: "32px",
      height: "32px",
      borderColor: "#ff0000",
      borderRightColor: "transparent",
    });
  });

  test("applies custom className", () => {
    render(<LoadingSpinner className="custom-class" />);

    const spinner = screen.getByTestId("spinner-component");

    expect(spinner).toHaveClass("custom-class");
  });
});
