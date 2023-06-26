const saveExpensesToLocalStorage = (expenses: [string, number][]) => {
  expenses.forEach((expense) => {
    const expenseTitle = "EXP-" + expense[0];
    const expenseAmount = "" + expense[1];

    localStorage.setItem(expenseTitle, expenseAmount);
  });
};

export default saveExpensesToLocalStorage;
