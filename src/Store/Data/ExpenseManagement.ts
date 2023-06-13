import { Dispatch, SetStateAction } from "react";
import { colorSystem, IColorState } from "./ColorSystem";
import { IUserData } from "./DataContext";

export interface IExpenseArgs {
  setCurrExpenses: Dispatch<
    SetStateAction<{ [index: string]: [number, string] }>
  >;
  currExpenses: IUserData["expenses"];
  colorSystemArgs: IColorState;
}

const newExpense = (
  newExpName: string,
  newExpAmount: number,
  { setCurrExpenses, currExpenses, colorSystemArgs }: IExpenseArgs
) => {
  const newExpenses = { ...currExpenses };
  const newExpenseColor = colorSystem.getNewColor(colorSystemArgs);

  newExpenses[newExpName] = [newExpAmount, newExpenseColor];
  setCurrExpenses(newExpenses);
};

const remExpense = (
  expName: string,
  { setCurrExpenses, currExpenses, colorSystemArgs }: IExpenseArgs
) => {
  const newExpenses = { ...currExpenses };
  const freeThisColor = newExpenses[expName][1];

  delete newExpenses[expName];
  colorSystem.freeColor(colorSystemArgs, freeThisColor);

  setCurrExpenses(newExpenses);
};

const modifyExpense = (
  ogExpName: string,
  newExpName: string,
  newExpAmount: number,
  { setCurrExpenses, currExpenses, colorSystemArgs }: IExpenseArgs
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

  const newerExpName = newExpName.trim();
  delete newExpenses[ogExpName];
  newExpenses[newerExpName] = [newExpAmount, useColor];

  setCurrExpenses(newExpenses);
};

const setBudget = (
  newBudget: [string, number][],
  { setCurrExpenses, currExpenses, colorSystemArgs }: IExpenseArgs
) => {
  //expects newBudget => [[expenseName, expenseAmount],...]
  if (newBudget.length <= 0) {
    return;
  }

  //free all colors
  colorSystem.freeAllColors(colorSystemArgs);

  //set new budget to expense state
  try {
    const newExpenses: IUserData["expenses"] = {};
    newBudget.forEach((expense) => {
      const thisColor: string = colorSystem.getNewColor(colorSystemArgs);
      const thisExpenseName: string = expense[0];
      const thisExpenseAmount: number = expense[1];

      newExpenses[thisExpenseName] = [thisExpenseAmount, thisColor];
    });

    setCurrExpenses(newExpenses);
  } catch (err) {
    console.error(err);
  }
};

export const expenseMng = {
  newExpense: newExpense,
  remExpense: remExpense,
  modifyExpense: modifyExpense,
  setBudget: setBudget,
};
