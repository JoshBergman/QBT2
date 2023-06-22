const validateEmail = (email: string) => {
  const regexCompare = !!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  if (!regexCompare) {
    return false;
  }

  return true;
};

export default validateEmail;
