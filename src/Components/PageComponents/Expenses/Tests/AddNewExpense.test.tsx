import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Expenses from "../Expenses";

test("Add New Expense Functionality", async () => {
  const user = userEvent.setup();
  render(<Expenses />);

  const btn = screen.getByRole("button", { name: "New Expense" });
  await act(async () => {
    await user.click(btn);
  });

  //find required elements and verify their existance
  const newExpenseLabelInput = screen.getByPlaceholderText("Expense Label");
  const newExpenseAmountInput = screen.getByRole("spinbutton");
  const saveExpenseBtn = screen.getByRole("button", { name: "Save" });
  expect(newExpenseLabelInput).toBeInTheDocument();
  expect(newExpenseAmountInput).toBeInTheDocument();
  expect(saveExpenseBtn).toBeInTheDocument();

  //enter info then click save
  await userEvent.type(newExpenseLabelInput, "New Expense Test");
  await userEvent.type(newExpenseAmountInput, "263");
  await act(async () => {
    await user.click(saveExpenseBtn);
  });

  //verify new expense appears as expected
  const newExpense = screen.getByText("New Expense");
  expect(newExpense).toBeInTheDocument();
});
