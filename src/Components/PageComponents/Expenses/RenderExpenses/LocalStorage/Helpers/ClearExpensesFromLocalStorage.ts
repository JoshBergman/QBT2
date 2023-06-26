import getExpensesFromLocalStorage from "./GetExpensesFromLocalStorage";

const clearExpensesFromLocalStorage = () => {
  const storedExpenses = getExpensesFromLocalStorage();

  storedExpenses.forEach((storedExpense) => {
    const deleteItemKey = storedExpense[0];
    localStorage.removeItem(deleteItemKey);
  });
};

export default clearExpensesFromLocalStorage;
