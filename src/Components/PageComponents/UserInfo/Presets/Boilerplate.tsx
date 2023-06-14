import React from "react";

import styles from "../Presets.module.css";
import ModalTemplate from "../../../UI/PageElements/ModalTemplate";

import { IPresetArgs } from "../BudgetPresets";
import { boilerplateArray } from "./PresetHelpers/BoilerplateArray";

const BoilerplatePreset = ({ presetArgs }: IPresetArgs) => {
  const { modalState, setModalState, warningMsg, setExpenses, userInfo } =
    presetArgs;

  const readMoreLink =
    "https://localfirstbank.com/article/budgeting-101-personal-budget-categories/";

  const createBudget = () => {
    const monthlyIncome = userInfo.salary / 12;
    const necessities = Math.floor(monthlyIncome * 0.5);
    const wants = Math.floor(monthlyIncome * 0.3);
    const savings = Math.floor(monthlyIncome * 0.2);

    if (necessities <= 0 || wants <= 0 || savings <= 0) {
      return;
    }

    setExpenses(boilerplateArray);
  };

  const confirmClickHandler = () => {
    createBudget();
    setModalState("");
  };

  const cancelClickHandler = () => {
    setModalState("");
  };

  const presetClickHandler = () => {
    setModalState("boilerplate");
  };

  const boilerplateMsg = (
    <p>
      Apply the{" "}
      <a rel="noreferrer" target="_blank" href={readMoreLink}>
        <strong className={styles.budgetType}>Boilerplate Expenses</strong>
      </a>{" "}
      budget preset?
      {warningMsg}
    </p>
  );

  return (
    <React.Fragment>
      {modalState === "boilerplate" && (
        <ModalTemplate>
          <div className={styles.modalDiv}>
            {boilerplateMsg}
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
        Boilerplate Expenses
      </button>
    </React.Fragment>
  );
};

export default BoilerplatePreset;
