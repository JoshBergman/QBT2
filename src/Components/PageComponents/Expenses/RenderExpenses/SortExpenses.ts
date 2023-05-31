export const sortExpenses = (
  sortMethod: string,
  expenses: [string, number][]
) => {
  const sortedExpenses = expenses.concat([]);

  if (sortMethod === "Largest To Smallest") {
    sortedExpenses.sort((a, b) => b[1] - a[1]);
  }

  if (sortMethod === "Smallest To Largest") {
    sortedExpenses.sort((a, b) => a[1] - b[1]);
  }

  return sortedExpenses;
};
