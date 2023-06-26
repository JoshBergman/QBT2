import React, { useContext, useState, useEffect } from "react";

import { DataContext } from "../../../../../Store/Data/DataContext";
import { AuthContext } from "../../../../../Store/Auth/AuthContext";
import saveExpensesToLocalStorage from "./Helpers/SaveExpensesToLocalStorage";
import clearExpensesFromLocalStorage from "./Helpers/ClearExpensesFromLocalStorage";
import trimEXP from "./Helpers/TrimEXP";
import getExpensesFromLocalStorage from "./Helpers/GetExpensesFromLocalStorage";

const arraysAreEqual = (
  array1: [string, number][],
  array2: [string, number][]
): boolean => {
  if (array1.length !== array2.length) {
    return false;
  }

  const sortedArray1 = array1.slice().sort();
  const sortedArray2 = array2.slice().sort();

  for (let i = 0; i < sortedArray1.length; i++) {
    const [string1, number1] = sortedArray1[i];
    const [string2, number2] = sortedArray2[i];

    if (string1 !== string2 || number1 !== number2) {
      return false;
    }
  }

  return true;
};

const LocalStorageSave = () => {
  const [upToDate, setUpToDate] = useState(true);
  const dataCTX = useContext(DataContext).userData;
  const expensesObj = dataCTX.expenses;
  const expensesArray: [string, number][] = Object.keys(expensesObj).map(
    (key) => [key, expensesObj[key][0]]
  );

  const saveExpenses = () => {
    clearExpensesFromLocalStorage();
    saveExpensesToLocalStorage(expensesArray);
    setUpToDate(true);
  };

  const authCTX = useContext(AuthContext).auth;
  const prefernce = authCTX.prefersLocalStorage;

  useEffect(() => {
    if (prefernce) {
      const savedExpenses = trimEXP(getExpensesFromLocalStorage());
      const arraysHaveEquality = arraysAreEqual(expensesArray, savedExpenses);
      if (arraysHaveEquality) {
        if (!upToDate) {
          setUpToDate(true);
        }
      } else {
        if (upToDate) {
          setUpToDate(false);
        }
      }
    }
  }, [setUpToDate, upToDate, expensesArray, prefernce]);

  const btnStyle = {
    backgroundColor: upToDate ? "gray" : "#5476dd",
  };

  return (
    <React.Fragment>
      <button
        onClick={saveExpenses}
        className="btn"
        style={btnStyle}
        disabled={upToDate}
      >
        {upToDate ? "Expenses Already Saved" : "Save Expenses"}
      </button>
    </React.Fragment>
  );
};

export default LocalStorageSave;
