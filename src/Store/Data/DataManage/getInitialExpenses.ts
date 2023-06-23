import getExpensesAPI from "../../../Components/PageComponents/Expenses/RenderExpenses/API/getExpensesAPI";
import pseudo from "../../Auth/PsuedoEncrypt";
import { initialColors } from "./ColorSystem";

import { IUserData } from "../DataContext";

const defaultExpenses: [string, number][] = [
  ["Welcome To QBT", 1000],
  ["Choose a preset to get started", 900],
  ["Housing", 800],
  ["Vehicle", 350],
  ["Groceries", 300],
];

const populateExpenses = async () => {
  const arrayToObj = (array: [string, number][]) => {
    const clrs = initialColors.new.concat([]);
    const returnObj: IUserData["expenses"] = {};
    for (let i = 0; i < array.length; i++) {
      const key = array[i][0];
      const amount = array[i][1];
      const preColor = clrs.shift();
      const nextColor = preColor === undefined ? "gray" : preColor;
      returnObj[key] = [amount, nextColor];
    }

    return returnObj;
  };

  //get required info if user has account, if not return defaults.
  const s = localStorage.getItem("s");
  const m = localStorage.getItem("m");
  let email = "";
  let sessionID = "";
  if (typeof m === "string" && typeof s === "string") {
    sessionID = pseudo.decrypt(s, 10);
    email = pseudo.decrypt(m, 10);
  } else {
    return arrayToObj(defaultExpenses);
  }

  //if user has account
  const getExpensesReponse = await getExpensesAPI(email, sessionID);
  if (Array.isArray(getExpensesReponse)) {
    const responseSuccess = getExpensesReponse[0];
    if (responseSuccess) {
      const expenses = getExpensesReponse[1];
      return arrayToObj(expenses);
    }
  }
  return arrayToObj([
    ["Server Error", 404],
    ["Failed to populate expenses", 500],
    ["Please try again later", 418],
  ]);
};

export default populateExpenses;
