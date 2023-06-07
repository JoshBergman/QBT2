import { useContext } from "react";

import ExpenseCard from "./ExpenseCard";
import { DataContext } from "../../../../Store/Data/DataContext";

export const getTotal = (
  keys: string[],
  expenses: { [index: string]: [number, string] }
) => {
  let thisTotal: number = 0;
  keys.forEach((key) => {
    thisTotal += expenses[key][0];
  });
  return thisTotal;
};

const ExpenseTotal = () => {
  const expenses = useContext(DataContext).userData.expenses;
  const keys = Object.keys(expenses);

  return (
    <ExpenseCard
      actions={{ remove: () => {}, modify: () => {} }}
      label={"Total"}
      amount={getTotal(keys, expenses)}
      color={"black"}
      btnsOff={true}
    />
  );
};

export default ExpenseTotal;
