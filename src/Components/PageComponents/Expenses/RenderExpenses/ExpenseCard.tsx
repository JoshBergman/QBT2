import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

import styles from "./ExpenseCard.module.css";
import ModifyMenu from "./ModifyMenu";

interface IExpenseCardProps {
  label: string;
  amount: number;
  color: string;
  newExpState?: () => void;
  actions: {
    remove: (label: string) => void;
    modify: (oldLabel: string, newlabel: string, newAmount: number) => void;
    parent?: () => void;
  };
}

const ExpenseCard = ({
  label,
  amount,
  color,
  actions,
  newExpState,
}: IExpenseCardProps) => {
  const [expenseState, setExpenseState] = useState(
    newExpState ? "modify" : "default"
  );

  const enterModifyHandler = () => {
    setExpenseState("modify");
  };

  const saveModifyHandler = (
    ogLable: string,
    newLabel: string,
    amount: number
  ) => {
    actions.modify(ogLable, newLabel, amount);
    if (newExpState) {
      newExpState();
      return;
    }
    setExpenseState("default");
  };

  const removeHandler = () => {
    setExpenseState("default");
    actions.remove(label);
  };

  return (
    <div className={styles.card} style={{ borderColor: color }}>
      {expenseState === "default" && (
        <React.Fragment>
          <h5 className={styles.textItem}>{label}</h5>
          <h5 className={styles.textItem}>{"$ " + amount}</h5>
          <button onClick={enterModifyHandler} className={styles.actionBtn}>
            <FiEdit />
          </button>
          <button onClick={removeHandler} className={styles.actionBtn}>
            <AiOutlineDelete />
          </button>
        </React.Fragment>
      )}
      {expenseState === "modify" && (
        <ModifyMenu
          ogAmount={amount}
          ogLabel={label}
          newExpState={newExpState}
          setParentState={setExpenseState}
          modifyFunc={saveModifyHandler}
        />
      )}
    </div>
  );
};

export default ExpenseCard;
