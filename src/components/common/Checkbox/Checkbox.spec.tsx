import { Checkbox } from '@/components/common';
import { render, screen, fireEvent } from "@testing-library/react";

describe("Checkbox Component", () => {
  test("renders checkbox with label", () => {
    render(<Checkbox id="checkbox-test" label="Test Checkbox" />);

    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByLabelText("Test Checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  test("checkbox should be checked when passed as checked", () => {
    const handleChange = jest.fn();
    render(<Checkbox id="checkbox-test" label="Test Checkbox" onChange={handleChange} checked={true} />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("checkbox should not be checked by default", () => {
    render(<Checkbox id="checkbox-test" label="Test Checkbox" />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
  });
});
