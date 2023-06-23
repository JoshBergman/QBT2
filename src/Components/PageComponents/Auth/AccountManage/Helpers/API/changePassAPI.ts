import axios from "axios";
import endpoints from "../../../../../Private/Endpoints";

const changePassAPI = async (
  email: string,
  oldPass: string,
  newPass: string
) => {
  const changePassURL = endpoints.changePass;
  const body = {
    email,
    oldPassword: oldPass,
    newPassword: newPass,
  };

  try {
    const changePassResponse = await axios.patch(changePassURL, body);
    const error = changePassResponse.data.error;
    if (error === false) {
      //success case
      const sessionID = changePassResponse.data.sessionID;
      return [true, sessionID];
    } else {
      return [false, "Server Error - Please try again later."];
    }
  } catch (err) {
    console.error(err);
  }
};

export default changePassAPI;
