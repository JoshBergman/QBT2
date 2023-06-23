import axios from "axios";
import endpoints from "../../../../../Private/Endpoints";

const delAccountAPI = async (email: string, password: string) => {
  const remAccountURL = endpoints.remAccount;

  const body = {
    email,
    password,
  };
  try {
    const response = await axios.post(remAccountURL, body);
    const error = response.data.error;
    if (error === false) {
      //success case
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

export default delAccountAPI;
