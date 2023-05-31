import { useContext, useState } from "react";
import { DataContext } from "../../../../Store/Data/DataContext";
import ExpenseCard from "./ExpenseCard";

const RenderExpenses = () => {
  const [currSortMethod, setCurrSortMethod] = useState("bigToSmall");
  const dataCTX = useContext(DataContext).userData;
  const expenses = dataCTX.expenses; //returns object of expenses ex: {groceries: 20, etc}

  const removeHandler = (label: string) => {
    dataCTX.actions.remExpense(label);
  };

  const modifyHandler = (
    oldLabel: string,
    newLabel: string,
    newAmount: number
  ) => {
    dataCTX.actions.modifyExpense(oldLabel, newLabel, newAmount);
  };

  const returnExpenseCards = () => {
    const expenseKeys = Object.keys(expenses);
    const cards: React.ReactNode[] = [];

    expenseKeys.forEach((key) => {
      cards.push(
        <ExpenseCard
          actions={{ remove: removeHandler, modify: modifyHandler }}
          label={key}
          amount={expenses[key]}
          key={key}
        />
      );
    });
    return cards;
  };
  return <div>{returnExpenseCards()}</div>;
};

export default RenderExpenses;
