import { useContext } from "react";

import styles from "./ExpenseCard.module.css";
import { DataContext } from "../../../../Store/Data/DataContext";
import { sortExpenses } from "./SortExpenses";
import ExpenseCard from "./ExpenseCard";
import ExpenseLegendCard from "./ExpenseLegendCard";
import NewExpense from "../NewExpense/NewExpense";
import ExpenseTotal from "./ExpenseTotal";
import ExpenseErrors from "./ExpenseErrors";

interface IRenderExpensesProps {
  currSortMethod: string;
}

const RenderExpenses = ({ currSortMethod }: IRenderExpensesProps) => {
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
    const expenseArray: [string, number][] = expenseKeys.map((key) => [
      key,
      expenses[key][0],
    ]);

    const sortedExpenses = sortExpenses(currSortMethod, expenseArray);
    const cards: React.ReactNode[] = [];

    sortedExpenses.forEach((expense) => {
      cards.push(
        <ExpenseCard
          actions={{ remove: removeHandler, modify: modifyHandler }}
          label={expense[0]}
          amount={expense[1]}
          key={expense[0]}
          color={expenses[expense[0]][1]}
        />
      );
    });
    return cards;
  };
  return (
    <div className={styles.container}>
      <ExpenseErrors />
      <ExpenseLegendCard />
      <ExpenseTotal />
      {returnExpenseCards()}
      <NewExpense />
    </div>
  );
};

export default RenderExpenses;
