import React from "react";

import styles from "../Presets.module.css";
import ModalTemplate from "../../../UI/PageElements/ModalTemplate";

import { IPresetArgs } from "../BudgetPresets";

const FiftyThirtyTwentyPreset = ({ presetArgs }: IPresetArgs) => {
  const { modalState, setModalState, warningMsg, setExpenses, userInfo } =
    presetArgs;

  const createBudget = () => {
    const monthlyIncome = userInfo.salary / 12;
    const necessities = Math.round(monthlyIncome * 0.5);
    const wants = Math.round(monthlyIncome * 0.3);
    const savings = Math.round(monthlyIncome * 0.2);

    if (necessities <= 0 || wants <= 0 || savings <= 0) {
      return;
    }

    const fiftyThirtyBudget: [string, number][] = [
      ["Necessities", necessities],
      ["Wants", wants],
      ["Savings & Debt Repayment", savings],
    ];

    setExpenses(fiftyThirtyBudget);
  };

  const confirmClickHandler = () => {
    createBudget();
    setModalState("");
  };

  const cancelClickHandler = () => {
    setModalState("");
  };

  const presetClickHandler = () => {
    const fiftyThirtyMsg = (
      <p>
        Apply the{" "}
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.nerdwallet.com/article/finance/nerdwallet-budget-calculator"
        >
          <strong className={styles.budgetType}>50 / 30 / 20</strong>
        </a>{" "}
        budget preset?
        {warningMsg}
      </p>
    );
    setModalState(fiftyThirtyMsg);
  };

  return (
    <React.Fragment>
      {modalState !== "" && (
        <ModalTemplate>
          <div className={styles.modalDiv}>
            {modalState}
            <button className={styles.btn} onClick={confirmClickHandler}>
              Confirm
            </button>
            <button className={styles.btn} onClick={cancelClickHandler}>
              Cancel
            </button>
          </div>
        </ModalTemplate>
      )}
      <button className={styles.btn} onClick={presetClickHandler}>
        50 / 30 / 20
      </button>
    </React.Fragment>
  );
};

export default FiftyThirtyTwentyPreset;
