import React from "react";

export interface IUserData {
  user: { [index: string]: string | number };
  expenses: { [index: string]: [number, string] };
  actions: { [index: string]: Function };
}

export const userDataDefault: IUserData = {
  user: {
    salary: 50000,
    location: "Tennesse",
  },
  expenses: {
    Car: [20, "#3366ff"],
    Dog: [60, "#99b3ff"],
  },
  actions: {
    newExpense: () => {},
    remExpense: () => {},
    modifyExpense: () => {},
  },
};

const userData = { ...userDataDefault };

export const DataContext = React.createContext({
  userData,
});
