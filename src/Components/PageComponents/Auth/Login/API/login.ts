import axios from "axios";
import endpoints from "../../../../Private/Endpoints";

const loginAPI = async (email: string, password: string) => {
  const loginEndpoint = endpoints.login;
  const body = {
    email,
    password,
  };
  try {
    const response = await axios.post(loginEndpoint, body);
    const error = response.data.error;
    if (error) {
      return [false, null, response.data.msg];
    }

    const sessionID = response.data.sessionID;
    const expenses = response.data.expenses;

    if (typeof sessionID === "string" && Array.isArray(expenses)) {
      return [true, sessionID, expenses];
    }
    throw new Error();
  } catch (err) {
    return [false, null, "Data Error - Please try again later."];
  }
};

export default loginAPI;
