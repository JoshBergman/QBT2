import React, { useContext } from "react";

import { getTotal } from "./ExpenseTotal";
import { DataContext } from "../../../../Store/Data/DataContext";
import ErrorDiv from "../../../UI/PageElements/ErrorDiv";

const ExpenseErrors = () => {
  const dataCTX = useContext(DataContext).userData;
  const expenses = dataCTX.expenses;
  const keys = Object.keys(expenses);

  const userMonthlyIncome: number = Math.round(
    parseInt(dataCTX.user["salary"] + "") / 12
  );
  const totalExpensesCost: number = getTotal(keys, expenses);

  const overBudget = () => {
    if (userMonthlyIncome <= totalExpensesCost) {
      return true;
    }
    return false;
  };

  const noExpenses = () => {
    if (keys.length <= 0) {
      return true;
    }
    return false;
  };

  return (
    <div>
      {overBudget() && (
        <ErrorDiv msg={"Over Budget: Expenses larger than income."} />
      )}
      {noExpenses() && (
        <ErrorDiv msg={"No Expenses: Add expense(s) to get started."} />
      )}
    </div>
  );
};

export default ExpenseErrors;
