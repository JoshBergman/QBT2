import React from "react";

import styles from "../Presets.module.css";
import ModalTemplate from "../../../UI/PageElements/ModalTemplate";

import { IPresetArgs } from "../BudgetPresets";
import { getMedianBudget } from "./PresetHelpers/MedianCalc";

const MedianPreset = ({ presetArgs }: IPresetArgs) => {
  const { modalState, setModalState, warningMsg, setExpenses, userInfo } =
    presetArgs;

  const readMoreLink =
    "https://www.fool.com/the-ascent/research/average-monthly-expenses/";

  const createBudget = () => {
    const monthlyIncome = userInfo.salary / 12;
    if (monthlyIncome <= 0) {
      return;
    }

    const medianBudget: [string, number][] = getMedianBudget(
      userInfo.location,
      monthlyIncome
    );

    setExpenses(medianBudget);
  };

  const confirmClickHandler = () => {
    createBudget();
    setModalState("");
  };

  const cancelClickHandler = () => {
    setModalState("");
  };

  const presetClickHandler = () => {
    setModalState("median");
  };
  const medianMsg = (
    <p>
      Apply the{" "}
      <a rel="noreferrer" target="_blank" href={readMoreLink}>
        <strong className={styles.budgetType}>
          Median Expenses for Location
        </strong>
      </a>{" "}
      budget preset?
      {warningMsg}
    </p>
  );

  return (
    <React.Fragment>
      {modalState === "median" && (
        <ModalTemplate>
          <div className={styles.modalDiv}>
            {medianMsg}
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
        Median Expenses
      </button>
    </React.Fragment>
  );
};

export default MedianPreset;
