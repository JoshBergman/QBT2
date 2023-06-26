import React, { useContext, useState } from "react";

import styles from "./ExpenseCard.module.css";
import { DataContext } from "../../../../Store/Data/DataContext";
import { sortExpenses } from "./SortExpenses";

import ExpenseErrors from "./ExpenseErrors";
import ExpenseLegendCard from "./ExpenseLegendCard";
import ExpenseTotal from "./ExpenseTotal";
import ExpenseCard from "./ExpenseCard";
import NewExpense from "../NewExpense/NewExpense";
import RemainingIncome from "./RemainingIncome";
import { AuthContext } from "../../../../Store/Auth/AuthContext";
import SuccessDiv from "../../../UI/PageElements/SuccessDiv";
import ErrorDiv from "../../../UI/PageElements/ErrorDiv";
import saveExpensesAPI from "./API/saveExpensesAPI";
import LocalStorageSave from "./LocalStorage/LocalStorageSave";
import ToggleUseLocalStorage from "./LocalStorage/ToggleUseLocalStorage";
interface IRenderExpensesProps {
  currSortMethod: string;
  showingRemaining: boolean;
}

const RenderExpenses = ({
  currSortMethod,
  showingRemaining,
}: IRenderExpensesProps) => {
  const [editMode, setEditMode] = useState(false);
  const [currSaveState, setCurrSaveState] = useState("");
  const [loading, setLoading] = useState(false);
  const dataCTX = useContext(DataContext).userData;
  const authCTX = useContext(AuthContext).auth;
  const expenses = dataCTX.expenses; //returns object of expenses ex: {groceries: 20, etc}

  const removeHandler = (label: string) => {
    dataCTX.actions.remExpense(label);
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const modifyHandler = (
    oldLabel: string,
    newLabel: string,
    newAmount: number
  ) => {
    dataCTX.actions.modifyExpense(oldLabel, newLabel, newAmount);
  };

  const returnExpenseCards = () => {
    const expenseKeys = Object.keys(expenses);
    const expenseArray: [string, number][] = expenseKeys.map((key) => [
      key,
      expenses[key][0],
    ]);

    const sortedExpenses = sortExpenses(currSortMethod, expenseArray);
    const cards: React.ReactNode[] = [];

    sortedExpenses.forEach((expense) => {
      cards.push(
        <ExpenseCard
          actions={{ remove: removeHandler, modify: modifyHandler }}
          label={expense[0]}
          amount={expense[1]}
          key={expense[0]}
          color={expenses[expense[0]][1]}
          btnsOff={!editMode}
        />
      );
    });
    return cards;
  };

  const saveExpHandler = async () => {
    setLoading(true);
    const expenseKeys = Object.keys(expenses);
    const expenseArray: [string, number][] = expenseKeys.map((key) => [
      key,
      expenses[key][0],
    ]);

    const saveResponse = await saveExpensesAPI(expenseArray);
    if (saveResponse) {
      setCurrSaveState("success");
    } else {
      setCurrSaveState("error");
    }
    setTimeout(() => {
      setCurrSaveState("");
    }, 6000);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <ExpenseErrors />
      <ExpenseLegendCard />
      {showingRemaining && <RemainingIncome />}
      <ExpenseTotal />
      {returnExpenseCards()}
      <NewExpense />
      {editMode ? (
        <button onClick={toggleEditMode} className="btn">
          Finish Editing
        </button>
      ) : (
        <button onClick={toggleEditMode} className="btn">
          Edit Expenses
        </button>
      )}
      {authCTX.prefersLocalStorage && <LocalStorageSave />}
      {authCTX.isAuthenticated && !authCTX.prefersLocalStorage && (
        <React.Fragment>
          {!editMode && (
            <button onClick={saveExpHandler} disabled={loading} className="btn">
              {loading ? "Loading..." : "Save Expenses To Account"}
            </button>
          )}
          {currSaveState === "success" && (
            <SuccessDiv msg={"Expenses Successfully Saved to Account"} />
          )}
          {currSaveState === "error" && (
            <ErrorDiv
              msg={
                "Server Error - Expenses not saved. Please try again in one minute."
              }
            />
          )}
        </React.Fragment>
      )}
      <ToggleUseLocalStorage />
    </div>
  );
};

export default RenderExpenses;
