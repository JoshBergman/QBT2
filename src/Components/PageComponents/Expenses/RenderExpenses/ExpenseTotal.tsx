import { useContext } from "react";

import ExpenseCard from "./ExpenseCard";
import { DataContext } from "../../../../Store/Data/DataContext";

const ExpenseTotal = () => {
  const expenses = useContext(DataContext).userData.expenses;
  const keys = Object.keys(expenses);

  const getTotal = () => {
    let thisTotal: number = 0;
    keys.forEach((key) => {
      thisTotal += expenses[key][0];
    });
    return thisTotal;
  };

  return (
    <ExpenseCard
      actions={{ remove: () => {}, modify: () => {} }}
      label={"Total"}
      amount={getTotal()}
      color={"black"}
      btnsOff={true}
    />
  );
};

export default ExpenseTotal;
