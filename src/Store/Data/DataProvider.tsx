import { useState, useEffect } from "react";

import { DataContext, userDataDefault, IUserData } from "./DataContext";
import { colorSystem, initialColors } from "./DataManage/ColorSystem";

import { expenseMng, IExpenseArgs } from "./DataManage/ExpenseManagement";
import { IUserDataArgs, userDataMng } from "./DataManage/UserDataManage";
import populateExpenses from "./DataManage/getInitialExpenses";

interface IProviderProps {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: IProviderProps) => {
  const [currUserInfo, setCurrUserInfo] = useState<IUserData["user"]>(
    userDataDefault.user
  );
  const [currExpenses, setCurrExpenses] = useState<IUserData["expenses"]>(
    userDataDefault.expenses
  );
  const [colorList, setColorList] = useState(initialColors);

  const colorSystemArgs = {
    colorState: colorList,
    setColorState: setColorList,
  };

  const expenseArgs: IExpenseArgs = {
    setCurrExpenses: setCurrExpenses,
    currExpenses: currExpenses,
    colorSystemArgs: colorSystemArgs,
  };

  const userDataArgs: IUserDataArgs = {
    setCurrUserInfo: setCurrUserInfo,
    currUserInfo: currUserInfo,
  };

  useEffect(() => {
    populateExpenses().then((expensesNew) => {
      setCurrExpenses(expensesNew);
      const newBudgetLength = Object.keys(expensesNew).length;
      setColorList(colorSystem.getNewBudgetColors(newBudgetLength));
    });
  }, []);

  const setUserInfo = (newSalary: number, newLocation: string) => {
    userDataMng.setUserInfo(newSalary, newLocation, userDataArgs);
  };

  const newExpense = (newExpName: string, newExpAmount: number) => {
    expenseMng.newExpense(newExpName, newExpAmount, expenseArgs);
  };

  const remExpense = (expName: string) => {
    expenseMng.remExpense(expName, expenseArgs);
  };

  const setBudget = (newBudget: [string, number][]) => {
    expenseMng.setBudget(newBudget, expenseArgs);
  };

  const modifyExpense = (
    ogName: string,
    newName: string,
    newAmount: number
  ) => {
    expenseMng.modifyExpense(ogName, newName, newAmount, expenseArgs);
  };

  const finalUserData: IUserData = {
    user: currUserInfo,
    expenses: currExpenses,
    actions: {
      newExpense,
      remExpense,
      modifyExpense,
      setBudget,
      setUserInfo,
    },
  };

  return (
    <DataContext.Provider value={{ userData: finalUserData }}>
      {children}
    </DataContext.Provider>
  );
};
