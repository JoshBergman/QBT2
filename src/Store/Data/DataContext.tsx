import React from "react";

export interface IUserData {
  user: { [index: string]: string | number };
  expenses: { [index: string]: [number, string] };
  actions: { [index: string]: Function };
}

export const userDataDefault: IUserData = {
  user: {
    salary: 50000,
    location: "Tennessee",
  },
  expenses: {
    "Welcome To QBT": [100, "#3366ff"],
    "Choose A Preset To Get Started": [60, "#99b3ff"],
  },
  actions: {
    newExpense: () => {},
    remExpense: () => {},
    modifyExpense: () => {},
    setBudget: () => {},
    setUserInfo: () => {},
  },
};

const userData = { ...userDataDefault };

export const DataContext = React.createContext({
  userData,
});
