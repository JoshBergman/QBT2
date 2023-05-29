import { useState } from "react";

import { DataContext, userDataDefault, IUserData } from "./DataContext";

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

  //todo remove this once user info is handled. Also delete export reference of it
  const shutupeslint = () => {
    setCurrUserInfo({});
  };

  const newExpense = (newExpName: string, newExpAmount: number) => {
    const newExpenses = { ...currExpenses };
    newExpenses[newExpName] = newExpAmount;
    setCurrExpenses(newExpenses);
  };

  const remExpense = (expName: string) => {
    const newExpenses = { ...currExpenses };
    delete newExpenses[expName];
    setCurrExpenses(newExpenses);
  };

  const modifyExpense = (
    ogExpName: string,
    newExpName: string,
    newExpAmount: number
  ) => {
    const newExpenses = { ...currExpenses };

    delete newExpenses[ogExpName];
    newExpenses[newExpName] = newExpAmount;
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
