import { useContext } from "react";
import { DataContext } from "../../../../Store/Data/DataContext";

const RenderExpenses = () => {
  const dataCTX = useContext(DataContext).userData;
  const expenses = dataCTX.expenses; //returns object of expenses ex: {groceries: 20, etc}

  const returnExpenseCards = () => {
    const expenseKeys = Object.keys(expenses);
    const cards: React.ReactNode[] = [];

    expenseKeys.forEach((key) => {
      cards.push(<p key={key}>{key + ": " + expenses[key]}</p>);
    });
    return cards;
  };
  return <div>{returnExpenseCards()}</div>;
};

export default RenderExpenses;
