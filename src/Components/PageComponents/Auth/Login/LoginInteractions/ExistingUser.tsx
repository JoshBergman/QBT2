import React, { useState, useRef, useContext, FormEvent } from "react";

import styles from "../Login.module.css";
import { AuthContext } from "../../../../../Store/Auth/AuthContext";
import loginAPI from "../API/login";
import validateEmail from "../../AccountManage/Helpers/Errors/validateEmail";
import validatePassword from "../../AccountManage/Helpers/Errors/validatePassword";

import ErrorDiv from "../../../../UI/PageElements/ErrorDiv";
import SuccessDiv from "../../../../UI/PageElements/SuccessDiv";

interface IExistingUserProps {
  setLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExistingUser = ({ setLoggingIn }: IExistingUserProps) => {
  const authCTX = useContext(AuthContext);
  const [currEmail, setCurrEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [showingPasswords, setShowingPasswords] = useState(false);
  const [currError, setCurrError] = useState("");
  const [currSuccess, setCurrSuccess] = useState("");
  const [currLoading, setCurrLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const toggleShowingPasswords = () => {
    setShowingPasswords((prev) => !prev);
  };

  const emailChangeHandler = () => {
    setCurrError("");

    if (emailRef.current === null) {
      return;
    }
    const email = emailRef.current.value;
    setCurrEmail(email);
  };

  const passwordChangeHandler = () => {
    setCurrError("");

    if (passwordRef.current === null) {
      return;
    }
    const password = passwordRef.current.value;
    setCurrPassword(password);
  };

  const signInHandler = async (event: FormEvent) => {
    event.preventDefault();
    setCurrLoading(true);
    const loginResponse = await loginAPI(currEmail, currPassword);
    //returns [success:boolean, sessionID: string | null, expenses | errormsg]
    if (Array.isArray(loginResponse)) {
      const successCase = loginResponse[0];
      const sessID = loginResponse[1];
      const expensesOrMsg = loginResponse[2];

      if (successCase === false) {
        setCurrError(expensesOrMsg);
      }
      if (successCase) {
        authCTX.auth.actions.authenticate(sessID, currEmail);
        setCurrSuccess("Successfully logged in. Redirecting in 1s...");
        setTimeout(() => {
          setLoggingIn(false);
        }, 2500);
      }
    } else {
      setCurrError("Server Error - Please try again later.");
    }
    setCurrLoading(false);
  };

  const getInputValidity = () => {
    if (emailRef.current == null || passwordRef.current == null) {
      return true;
    }
    const emailValidity = validateEmail(emailRef.current.value);
    const passwordValidity = validatePassword(passwordRef.current.value);

    if (!emailValidity) {
      return true;
    }

    if (!passwordValidity) {
      return true;
    }

    return false;
  };

  const inputValidity = getInputValidity();
  const passwordType = showingPasswords ? "text" : "password";

  return (
    <React.Fragment>
      {currError !== "" && <ErrorDiv msg={currError} />}
      {currSuccess !== "" && <SuccessDiv msg={currSuccess} />}
      <label htmlFor="show-pass">Show Passwords:</label>
      <input id="show-pass" type="checkbox" onChange={toggleShowingPasswords} />
      <form onSubmit={signInHandler} className="form">
        <label htmlFor="email" className="label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          ref={emailRef}
          autoComplete="on"
          placeholder="Email"
          className="input"
        />
        <label htmlFor="password" className="label">
          Password:
        </label>
        <input
          type={passwordType}
          id="password"
          onChange={passwordChangeHandler}
          ref={passwordRef}
          autoComplete="on"
          placeholder="Password"
          className="input"
        />
        <button
          className={styles.btn}
          disabled={inputValidity || currLoading}
          style={{ backgroundColor: inputValidity ? "gray" : "#5476dd" }}
          type="submit"
        >
          {currLoading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </React.Fragment>
  );
};

export default ExistingUser;
