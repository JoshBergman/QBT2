import React, { useContext, useRef, useState } from "react";

import styles from "./NewExpense.module.css";
import { DataContext } from "../../../../Store/Data/DataContext";

interface INewExpenseFormProps {
  toggleMakingExpense: () => void;
}

const NewExpenseForm = ({ toggleMakingExpense }: INewExpenseFormProps) => {
  const [currError, setCurrError] = useState("none");
  const dataCTX = useContext(DataContext).userData;

  const newLabelRef = useRef<HTMLInputElement>(null);
  const newAmountRef = useRef<HTMLInputElement>(null);

  const newExpense = (label: string, amount: number, again: boolean) => {
    dataCTX.actions.newExpense(label, amount);
    if (!again) {
      toggleMakingExpense();
    } else {
      if (newAmountRef.current !== null && newLabelRef.current !== null) {
        newAmountRef.current.value = "";
        newLabelRef.current.value = "";
      }
    }
  };

  const saveHandler = (again: boolean) => {
    //authenticates input
    if (newLabelRef.current && newAmountRef.current) {
      const currLabel: string = newLabelRef.current.value;
      const currAmount: number = parseInt(newAmountRef.current.value);

      if (!(currLabel.length >= 1) || !(currLabel.length <= 14)) {
        setCurrError("Label must be between 1-14 characters.");
        return;
      }
      if (!(currAmount >= 0.01) || !(currAmount <= 999999)) {
        setCurrError("Amount must be between 0 - 999,999");
        return;
      }

      newExpense(currLabel, currAmount, again);
    }
  };

  const cancelHandler = () => {
    toggleMakingExpense();
  };

  const onChangeHandler = () => {
    if (currError !== "none") {
      setCurrError("none");
    }
  };

  return (
    <React.Fragment>
      {currError !== "none" && <p>Error: {currError}</p>}
      <label className={styles.label} htmlFor="label">
        Expense Name
      </label>
      <input
        type="text"
        id="label"
        ref={newLabelRef}
        placeholder={"Expense Label"}
        className={styles.input}
        onChange={onChangeHandler}
      />
      <label className={styles.label} htmlFor="amount">
        Amount $USD
      </label>
      <input
        type="number"
        id="amount"
        ref={newAmountRef}
        placeholder={"Cost $USD"}
        min={1}
        max={999999}
        className={styles.input}
        onChange={onChangeHandler}
      />
      <div>
        <button
          className={styles.btn}
          onClick={() => {
            saveHandler(false);
          }}
        >
          Save
        </button>
        <button className={styles.btn} onClick={() => saveHandler(true)}>
          Save & Add Another
        </button>
      </div>
      <button className={styles.btn} onClick={cancelHandler}>
        Cancel
      </button>
    </React.Fragment>
  );
};

export default NewExpenseForm;
