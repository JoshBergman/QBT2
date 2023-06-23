import validateEmail from "./validateEmail";
import validatePassword from "./validatePassword";

const findDelAccErrors = (email: string, password: string) => {
  const errors: string[] = [];

  const validityCheck: boolean[] = [];
  validityCheck.push(validateEmail(email));
  validityCheck.push(validatePassword(password));

  if (validityCheck.includes(false)) {
    errors.push(
      "Invalid Email and/or Password(s). Passwords must include atleast 3 characters."
    );
  }

  return errors;
};

export default findDelAccErrors;
