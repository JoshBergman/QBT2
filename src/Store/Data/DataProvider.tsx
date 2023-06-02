import { useState } from "react";

import { DataContext, userDataDefault, IUserData } from "./DataContext";
import { colorSystem, initialColors } from "./ColorSystem";

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

  //todo remove this once user info is handled. Also delete export reference of it
  const shutupeslint = () => {
    setCurrUserInfo({});
  };

  const newExpense = (newExpName: string, newExpAmount: number) => {
    const newExpenses = { ...currExpenses };
    const newExpenseColor = colorSystem.getNewColor(colorSystemArgs);

    newExpenses[newExpName] = [newExpAmount, newExpenseColor];
    setCurrExpenses(newExpenses);
  };

  const remExpense = (expName: string) => {
    const newExpenses = { ...currExpenses };
    const freeThisColor = newExpenses[expName][1];

    delete newExpenses[expName];
    colorSystem.freeColor(colorSystemArgs, freeThisColor);

    setCurrExpenses(newExpenses);
  };

  const modifyExpense = (
    ogExpName: string,
    newExpName: string,
    newExpAmount: number
  ) => {
    const newExpenses = { ...currExpenses };
    const savedColor = newExpenses[ogExpName];

    let useColor = "gray";
    if (savedColor === undefined) {
      useColor = colorSystem.getNewColor(colorSystemArgs);
    } else {
      try {
        useColor = savedColor[1];
      } catch (e) {
        useColor = "gray";
      }
    }

    delete newExpenses[ogExpName];
    newExpenses[newExpName] = [newExpAmount, useColor];

    setCurrExpenses(newExpenses);
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
