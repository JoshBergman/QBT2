import axios from "axios";
import endpoints from "../../../../Private/Endpoints";

const getExpensesAPI = async (email: string, sessionID: string) => {
  const getExpURL = endpoints.getExpenses;
  const body = {
    email,
    sessionID,
  };
  try {
    const response = await axios.post(getExpURL, body);
    const error = response.data.error;
    if (error === false) {
      const expenses = response.data.expenses;
      return [true, expenses];
    }

    return [false, []];
  } catch (err) {
    console.error(err);
  }
};

export default getExpensesAPI;
