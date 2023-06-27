import { render, screen } from "@testing-library/react";

import Expenses from "../Expenses";

describe("Initial Laodup For Expenses Section", () => {
  test("Initial expenses load correctly", () => {
    render(<Expenses />);

    const initialExpense = screen.getByText(/Welcome To QBT/i);
    expect(initialExpense).toBeInTheDocument();

    const initialExpense2 = screen.getByText(/Choose A Preset To Get Started/i);
    expect(initialExpense2).toBeInTheDocument();
  });
});
