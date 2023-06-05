import { IUserData } from "../../../../Store/Data/DataContext";
import { sortExpenses } from "../../Expenses/RenderExpenses/SortExpenses";

export const getSortedExpensesArray = (
  expensesFromContext: IUserData["expenses"]
) => {
  const expensesObj: { [index: string]: [number, string] } = {
    ...expensesFromContext,
  };
  const keys: string[] = Object.keys(expensesObj);

  const expensesArray: [string, number][] = keys.map((key) => [
    key,
    expensesObj[key][0],
  ]);
  const sortedExpenses = sortExpenses("Largest To Smallest", expensesArray);

  return sortedExpenses;
};
