import React, { useState, useContext, useRef, FormEvent } from "react";

import styles from "../Login.module.css";
import { AuthContext } from "../../../../../Store/Auth/AuthContext";
import validateEmail from "../../AccountManage/Helpers/Errors/validateEmail";
import validatePassword from "../../AccountManage/Helpers/Errors/validatePassword";

import ErrorDiv from "../../../../UI/PageElements/ErrorDiv";
import signUp from "../API/signUp";
import { DataContext } from "../../../../../Store/Data/DataContext";
import SuccessDiv from "../../../../UI/PageElements/SuccessDiv";

interface INewUserProps {
  setLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewUser = ({ setLoggingIn }: INewUserProps) => {
  const authCTX = useContext(AuthContext).auth;
  const dataCTX = useContext(DataContext).userData;
  const [currEmail, setCurrEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [currConfirmPassword, setCurrConfirmPassword] = useState("");
  const [currError, setCurrError] = useState("");
  const [showingPasswords, setShowingPasswords] = useState(false);
  const [currSuccess, setCurrSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

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

  const confirmPasswordChangeHandler = () => {
    setCurrError("");

    if (confirmPasswordRef.current === null) {
      return;
    }
    const confirmPassword = confirmPasswordRef.current.value;
    setCurrConfirmPassword(confirmPassword);
  };

  const signUpHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    if (currPassword !== currConfirmPassword) {
      setCurrError("Error: Passwords do not match.");
      return;
    }

    const expensesKeys = Object.keys(dataCTX.expenses);
    const expenses: [string, number][] = expensesKeys.map((key) => [
      key,
      dataCTX.expenses[key][0],
    ]);

    setLoading(true);
    const response = await signUp(currEmail, currPassword, expenses);
    //response === [success: boolean, sessionID: null | string, msg: string]
    try {
      const status: boolean = response[0];
      const sessionID: string | null = response[1];
      const msg: string = response[2];

      //success case
      if (status) {
        if (sessionID !== null) {
          authCTX.actions.authenticate(sessionID, currEmail);
        }
        setCurrSuccess("Account Successfully Created! Redirecting in 1s.");
        setTimeout(() => {
          setLoggingIn(false);
        }, 2000);
      }

      //fail case
      if (!status) {
        setCurrError(msg);
      }
    } catch (err) {
      //super-fail case
      setCurrError("Server Error. Please try again later.");
    }
    setLoading(false);
  };

  const getInputValidity = () => {
    const validEmail = validateEmail(currEmail);
    const validPass = validatePassword(currPassword);
    const validConfirm = validatePassword(currConfirmPassword);

    if (validEmail && validPass && validConfirm) {
      return !true;
    }

    return !false;
  };

  const inputValidity = getInputValidity();
  const passwordType = showingPasswords ? "text" : "password";

  return (
    <React.Fragment>
      {currError !== "" && <ErrorDiv msg={currError} />}
      {currSuccess !== "" && <SuccessDiv msg={currSuccess} />}
      <label htmlFor="show-pass">Show Passwords:</label>
      <input id="show-pass" type="checkbox" onChange={toggleShowingPasswords} />
      <label htmlFor="email" className="label">
        Email:{" "}
      </label>
      <form className="form" onSubmit={signUpHandler}>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          ref={emailRef}
          autoComplete="off"
          placeholder="Email"
          className="input"
        />
        <label htmlFor="password" className="label">
          Password:{" "}
        </label>
        <input
          type={passwordType}
          id="password"
          onChange={passwordChangeHandler}
          ref={passwordRef}
          autoComplete="off"
          placeholder="Password"
          className="input"
        />
        <label htmlFor="confirm-password" className="label">
          Confirm Password:{" "}
        </label>
        <input
          type={passwordType}
          id="confirm-password"
          onChange={confirmPasswordChangeHandler}
          ref={confirmPasswordRef}
          autoComplete="off"
          placeholder="Confirm Password"
          className="input"
        />
        <button
          className={styles.btn}
          disabled={inputValidity}
          style={{ backgroundColor: inputValidity ? "gray" : "#5476dd" }}
          type="submit"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </React.Fragment>
  );
};

export default NewUser;
