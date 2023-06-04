import { useState } from "react";

import { DataContext, userDataDefault, IUserData } from "./DataContext";
import { initialColors } from "./ColorSystem";
import { expenseMng, IExpenseArgs } from "./ExpenseManagement";

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

  const newExpense = (newExpName: string, newExpAmount: number) => {
    expenseMng.newExpense(newExpName, newExpAmount, expenseArgs);
  };

  const remExpense = (expName: string) => {
    expenseMng.remExpense(expName, expenseArgs);
  };

  const modifyExpense = (
    ogName: string,
    newName: string,
    newAmount: number
  ) => {
    expenseMng.modifyExpense(ogName, newName, newAmount, expenseArgs);
  };

  //todo remove this once user info is handled. Also delete export reference of it
  const shutupeslint = () => {
    setCurrUserInfo({});
  };

  const finalUserData: IUserData = {
    user: currUserInfo,
    expenses: currExpenses,
    actions: {
      newExpense: newExpense,
      remExpense: remExpense,
      modifyExpense: modifyExpense,
      deleteme: shutupeslint,
    },
  };

  return (
    <DataContext.Provider value={{ userData: finalUserData }}>
      {children}
    </DataContext.Provider>
  );
};
