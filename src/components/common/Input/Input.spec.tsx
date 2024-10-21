import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from ".";

describe("Input Component", () => {
  test("renders the input with a label", () => {
    render(<Input label="Test Label" value="" />);

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  test("displays the correct value in the input", () => {
    render(<Input label="Test Label" value="Test Value" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Test Value");
  });

  test("calls onChange handler when input value changes", () => {
    const handleChange = jest.fn();

    render(<Input label="Test Label" value="" onChange={handleChange} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "New Value" } });

    expect(handleChange).toHaveBeenCalledWith("New Value");
  });

  test("input should be empty by default", () => {
    render(<Input label="Test Label" value="" />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("");
  });
});
