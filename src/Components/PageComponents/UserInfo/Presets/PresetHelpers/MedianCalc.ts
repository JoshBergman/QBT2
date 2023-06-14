import { costOfLivingIndex } from "./CostOfLivingIndex";
import { medianExpenses } from "./MedianExpenses";

const getPercentOfIncome = (monthlyIncome: number, percent: number) => {
  return Math.floor(monthlyIncome * (percent * 0.01));
};

export const getMedianBudget = (state: string, monthlyIncome: number) => {
  //get cost of living index for the location
  let colIndex: number;
  const tempCOL = costOfLivingIndex[state];
  if (typeof tempCOL === "string") {
    colIndex = tempCOL;
  } else {
    colIndex = 100;
  }

  //apply cost of living to median expenses
  const medExpenses: [string, number, boolean][] = medianExpenses.concat([]);
  const returnExpenses: [string, number][] = [];
  medExpenses.forEach((expense) => {
    const label = expense[0];
    const percentOfIncome = expense[1];
    const applyCOL = expense[2];

    //take expense from percent of income then apply COL if applicable
    let expenseAmount = getPercentOfIncome(monthlyIncome, percentOfIncome);
    if (applyCOL) {
      expenseAmount = Math.floor(expenseAmount * (colIndex / 100));
    }

    returnExpenses.push([label, expenseAmount]);
  });
  return returnExpenses;
};
