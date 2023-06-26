import React, { useContext } from "react";

import { DataContext } from "../../../../../Store/Data/DataContext";
import saveExpensesToLocalStorage from "./Helpers/SaveExpensesToLocalStorage";
import clearExpensesFromLocalStorage from "./Helpers/ClearExpensesFromLocalStorage";

const LocalStorageSave = () => {
  const dataCTX = useContext(DataContext).userData;
  const expensesObj = dataCTX.expenses;
  const expensesArray: [string, number][] = Object.keys(expensesObj).map(
    (key) => [key, expensesObj[key][0]]
  );

  const saveExpenses = () => {
    clearExpensesFromLocalStorage();
    saveExpensesToLocalStorage(expensesArray);
  };

  return (
    <React.Fragment>
      <button onClick={saveExpenses} className="btn">
        Save Expenses
      </button>
    </React.Fragment>
  );
};

export default LocalStorageSave;
