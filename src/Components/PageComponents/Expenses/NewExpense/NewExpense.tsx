import React, { useState } from "react";

import styles from "./NewExpense.module.css";
import NewExpenseForm from "./NewExpenseForm";

const NewExpense = () => {
  const [makingExpense, setMakingExpense] = useState(false);

  const toggleMakingExpense = () => {
    setMakingExpense((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      {!makingExpense && (
        <button onClick={toggleMakingExpense} className={styles.newExpBtn}>
          New Expense
        </button>
      )}
      {makingExpense && (
        <div className={styles.card}>
          <NewExpenseForm toggleMakingExpense={toggleMakingExpense} />
        </div>
      )}
    </React.Fragment>
  );
};

export default NewExpense;
