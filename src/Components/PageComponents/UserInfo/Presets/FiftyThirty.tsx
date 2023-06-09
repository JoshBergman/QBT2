import React from "react";

import styles from "../Presets.module.css";
import ModalTemplate from "../../../UI/PageElements/ModalTemplate";

import { IPresetArgs } from "../BudgetPresets";

const FiftyThirtyTwentyPreset = ({ presetArgs }: IPresetArgs) => {
  const { modalState, setModalState, warningMsg, setExpenses, userInfo } =
    presetArgs;

  const readMoreLink =
    "https://www.nerdwallet.com/article/finance/nerdwallet-budget-calculator";

  const createBudget = () => {
    const monthlyIncome = userInfo.salary / 12;
    const necessities = Math.floor(monthlyIncome * 0.5);
    const wants = Math.floor(monthlyIncome * 0.3);
    const savings = Math.floor(monthlyIncome * 0.2);

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
    setModalState("fifty");
  };

  const fiftyThirtyMsg = (
    <p>
      Apply the{" "}
      <a rel="noreferrer" target="_blank" href={readMoreLink}>
        <strong className={styles.budgetType}>50 / 30 / 20</strong>
      </a>{" "}
      budget preset?
      {warningMsg}
    </p>
  );

  return (
    <React.Fragment>
      {modalState === "fifty" && (
        <ModalTemplate>
          <div className={styles.modalDiv}>
            {fiftyThirtyMsg}
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
        50 / 30 / 20 Rule
      </button>
    </React.Fragment>
  );
};

export default FiftyThirtyTwentyPreset;
