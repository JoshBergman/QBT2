import { useState, useContext } from "react";

import styles from "./Presets.module.css";
import { DataContext } from "../../../Store/Data/DataContext";

import FiftyThirtyTwentyPreset from "./Presets/FiftyThirty";

export interface IPresetArgs {
  presetArgs: {
    modalState: React.ReactNode;
    setModalState: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    warningMsg: React.ReactNode;
    setExpenses: (newBudget: [string, number][]) => void;
    userInfo: {
      location: string;
      salary: number;
    };
  };
}

const BudgetPresets = () => {
  const [modalState, setModalState] = useState<React.ReactNode>("");
  const dataCTX = useContext(DataContext).userData;

  const { location, salary } = dataCTX.user;

  const warningMsg = (
    <strong className={styles.warningText}>
      Applying this budget preset will overwrite any existing budget.
    </strong>
  );

  const setExpenses = (newBudget: [string, number][]) => {
    dataCTX.actions.setBudget(newBudget);
  };

  const presetArgs: IPresetArgs = {
    presetArgs: {
      modalState: modalState,
      setModalState: setModalState,
      warningMsg: warningMsg,
      setExpenses: setExpenses,
      userInfo: {
        location: location + "",
        salary: parseInt(salary + ""),
      },
    },
  };

  return (
    <div>
      <h3 className={styles.title}>Budget Presets:</h3>
      <h5 className={styles.subtitle}>
        Click preset to apply budget to your settings.
      </h5>
      <div className={styles.budgetsContainer}>
        <FiftyThirtyTwentyPreset presetArgs={presetArgs.presetArgs} />
        <FiftyThirtyTwentyPreset presetArgs={presetArgs.presetArgs} />
        <FiftyThirtyTwentyPreset presetArgs={presetArgs.presetArgs} />
      </div>
    </div>
  );
};

export default BudgetPresets;
