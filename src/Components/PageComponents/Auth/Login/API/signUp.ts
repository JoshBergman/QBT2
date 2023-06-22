import axios from "axios";
import endpoints from "../../../../Private/Endpoints";

const signUp = async (
  email: string,
  password: string,
  expenses: [string, number][]
) => {
  const url = endpoints.signUp;

  try {
    console.log(email, password, expenses);
    const response = await axios.post(url, {
      email: email,
      password: password,
      expenses: expenses,
    });
    if (response.data.error) {
      // Fail Case
      return [false, null, response.data.msg];
    } else if (!response.data.error) {
      // Success Case
      return [true, response.data.sessionID, "Account Successfully Created"];
    }
  } catch (err) {
    console.error(err);
  }

  // Double-Fail Case
  return [false, null, "Error: Please try again later."];
};

export default signUp;
