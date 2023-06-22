import validateEmail from "./validateEmail";
import validatePassword from "./validatePassword";

const findChangePasswordErrors = (
  email: string,
  existingPassword: string,
  newPassword: string,
  confirmNewPassword: string
) => {
  const errors: string[] = [];

  const validityCheck: boolean[] = [];
  validityCheck.push(validateEmail(email));
  validityCheck.push(validatePassword(existingPassword));
  validityCheck.push(validatePassword(newPassword));
  validityCheck.push(validatePassword(confirmNewPassword));

  if (validityCheck.includes(false)) {
    errors.push(
      "Invalid Email and/or Password(s). Passwords must include atleast 3 characters."
    );
  }

  if (newPassword !== confirmNewPassword) {
    errors.push("New passwords do not match.");
  }

  return errors;
};

export default findChangePasswordErrors;
