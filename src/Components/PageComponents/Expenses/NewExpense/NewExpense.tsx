import React, { useState, useContext } from "react";

import styles from "./NewExpense.module.css";
import ExpenseCard from "../RenderExpenses/ExpenseCard";
import { DataContext } from "../../../../Store/Data/DataContext";

const NewExpense = () => {
  const [makingExpense, setMakingExpense] = useState(false);
  const dataCTX = useContext(DataContext).userData;

  const toggleMakingExpense = () => {
    setMakingExpense((prevState) => !prevState);
  };

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

  return (
    <React.Fragment>
      {makingExpense && (
        <ExpenseCard
          label={""}
          amount={0}
          newExpState={toggleMakingExpense}
          actions={{
            remove: removeHandler,
            modify: modifyHandler,
            parent: toggleMakingExpense,
          }}
        />
      )}
      {!makingExpense && (
        <button onClick={toggleMakingExpense} className={styles.newExpBtn}>
          New Expense
        </button>
      )}
    </React.Fragment>
  );
};

export default NewExpense;
