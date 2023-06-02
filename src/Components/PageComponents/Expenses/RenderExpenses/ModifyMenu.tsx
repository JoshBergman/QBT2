import React, { useRef } from "react";

import styles from "./ExpenseCard.module.css";

interface IModifyMenuProps {
  modifyFunc: (ogLabel: string, newLabel: string, amount: number) => void;
  setParentState: (newState: string) => void;
  newExpState?: () => void;
  ogLabel: string;
  ogAmount: number;
}

const ModifyMenu = ({
  modifyFunc,
  setParentState,
  ogLabel,
  ogAmount,
  newExpState,
}: IModifyMenuProps) => {
  const newLabelRef = useRef<HTMLInputElement>(null);
  const newAmountRef = useRef<HTMLInputElement>(null);

  const saveChangesHandler = () => {
    let currentNewLabel: string;
    let currentNewAmount: number;
    if (newAmountRef.current === null || newLabelRef.current == null) {
      currentNewLabel = ogLabel;
      currentNewAmount = ogAmount;
    } else {
      currentNewLabel = newLabelRef.current.value;
      currentNewAmount = parseInt(newAmountRef.current.value);
    }

    modifyFunc(ogLabel, currentNewLabel, currentNewAmount);
  };

  const cancelChangesHandler = () => {
    if (newExpState) {
      newExpState();
      return;
    }
    setParentState("default");
  };

  return (
    <React.Fragment>
      <input
        type="text"
        ref={newLabelRef}
        defaultValue={ogLabel}
        placeholder={"Expense Label"}
        className={styles.input}
      />
      <input
        type="number"
        ref={newAmountRef}
        defaultValue={ogAmount + ""}
        placeholder={"Cost $USD"}
        min={1}
        max={999999}
        className={styles.input}
      />
      <button className={styles.modifyBtn} onClick={saveChangesHandler}>
        Save
      </button>
      <button className={styles.modifyBtn} onClick={cancelChangesHandler}>
        Cancel
      </button>
    </React.Fragment>
  );
};

export default ModifyMenu;
