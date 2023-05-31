import React, { useState } from "react";

import styles from "./ExpenseCard.module.css";
import ModifyMenu from "./ModifyMenu";

interface IExpenseCardProps {
  label: string;
  amount: number;
  actions: {
    remove: (label: string) => void;
    modify: (oldLabel: string, newlabel: string, newAmount: number) => void;
  };
}

const ExpenseCard = ({ label, amount, actions }: IExpenseCardProps) => {
  const [expenseState, setExpenseState] = useState("default");

  const enterModifyHandler = () => {
    setExpenseState("modify");
  };

  const saveModifyHandler = (
    ogLable: string,
    newLabel: string,
    amount: number
  ) => {
    setExpenseState("default");
    actions.modify(ogLable, newLabel, amount);
  };

  const removeHandler = () => {
    setExpenseState("default");
    actions.remove(label);
  };

  return (
    <div className={styles.card}>
      {expenseState === "default" && (
        <React.Fragment>
          <h5 className={styles.textItem}>{label}</h5>
          <h5 className={styles.textItem}>{"$ " + amount}</h5>
          <button onClick={enterModifyHandler}>Edit</button>
          <button onClick={removeHandler}>Remove</button>
        </React.Fragment>
      )}
      {expenseState === "modify" && (
        <ModifyMenu
          ogAmount={amount}
          ogLabel={label}
          setParentState={setExpenseState}
          modifyFunc={saveModifyHandler}
        />
      )}
    </div>
  );
};

export default ExpenseCard;
