import { useState } from "react";

import styles from "./ExpenseCard.module.css";

interface IExpenseCardProps {
  label: string;
  amount: number;
  actions: {
    remove: (label: string) => void;
    modify: (oldLabel: string, newlabel: string, newAmount: number) => void;
  };
}

const ExpenseCard = ({ label, amount, actions }: IExpenseCardProps) => {
  const expenseState = useState("default");
  return (
    <div className={styles.card}>
      <h5 className={styles.textItem}>{label}</h5>
      <h5 className={styles.textItem}>{"$" + amount}</h5>
      <button onClick={() => actions.remove(label)}>Rem</button>
    </div>
  );
};

export default ExpenseCard;
