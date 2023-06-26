import axios from "axios";
import endpoints from "../../../../Private/Endpoints";
import pseudo from "../../../../../Store/Auth/PsuedoEncrypt";

const saveExpensesAPI = async (expenses: [string, number][]) => {
  const setExpURL = endpoints.setExpenses;
  const storedEmail = localStorage.getItem("m");
  const storedSessionID = localStorage.getItem("s");
  if (storedEmail == null || storedSessionID == null) {
    return false;
  }
  const email = pseudo.decrypt(storedEmail, 10);
  const sessionID = pseudo.decrypt(storedSessionID, 10);

  const body = {
    email,
    sessionID,
    expenses,
  };
  try {
    const response = await axios.post(setExpURL, body);
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
