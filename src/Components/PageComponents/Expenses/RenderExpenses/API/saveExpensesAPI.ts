import axios from "axios";
import endpoints from "../../../../Private/Endpoints";

const saveExpensesAPI = async (
  email: string,
  sessionID: string,
  expenses: [string, number][]
) => {
  const setExpURL = endpoints.setExpenses;
  const body = {
    email,
    sessionID,
    expenses,
  };
  console.log(body);
  try {
    const response = await axios.post(setExpURL, body);
    console.log(response.data);
    const error = response.data.error;
    if (error === false) {
      return true;
    }

    return false;
  } catch (err) {
    console.error(err);
  }
};

export default saveExpensesAPI;
