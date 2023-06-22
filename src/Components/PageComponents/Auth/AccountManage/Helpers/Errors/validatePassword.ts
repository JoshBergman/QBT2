const validatePassword = (password: string) => {
  const trimmedPassword = password.trim();

  if (trimmedPassword.length < 3) {
    return false;
  }

  return true;
};

export default validatePassword;
