import React, { useState, useContext, useRef } from "react";

import styles from "../Login.module.css";
import ErrorDiv from "../../../../UI/PageElements/ErrorDiv";
import { AuthContext } from "../../../../../Store/Auth/AuthContext";

const NewUser = () => {
  const authCTX = useContext(AuthContext);
  const [currEmail, setCurrEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currError, setCurrError] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

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
    setConfirmPassword(confirmPassword);
  };

  const signUpHandler = () => {
    if (currPassword !== confirmPassword) {
      setCurrError("Error: Passwords do not match.");
    }
    console.log("signedIn");
  };

  const getInputValidity = () => {
    if (
      currEmail.length < 5 ||
      currPassword.length < 5 ||
      confirmPassword.length < 5
    ) {
      return true;
    }

    return false;
  };

  const inputValidity = getInputValidity();

  return (
    <React.Fragment>
      {currError !== "" && <ErrorDiv msg={currError} />}
      <label htmlFor="email" className={styles.label}>
        Email:{" "}
      </label>
      <input
        type="email"
        id="email"
        onChange={emailChangeHandler}
        ref={emailRef}
        autoComplete="off"
        placeholder="Email"
        className={styles.input}
      />
      <label htmlFor="password" className={styles.label}>
        Password:{" "}
      </label>
      <input
        type="text"
        id="password"
        onChange={passwordChangeHandler}
        ref={passwordRef}
        autoComplete="off"
        placeholder="Password"
        className={styles.input}
      />
      <label htmlFor="confirm-password" className={styles.label}>
        Confirm Password:{" "}
      </label>
      <input
        type="text"
        id="confirm-password"
        onChange={confirmPasswordChangeHandler}
        ref={confirmPasswordRef}
        autoComplete="off"
        placeholder="Confirm Password"
        className={styles.input}
      />
      <button
        className={styles.btn}
        disabled={inputValidity}
        style={{ backgroundColor: inputValidity ? "gray" : "#5476dd" }}
        onClick={signUpHandler}
      >
        Sign Up
      </button>
    </React.Fragment>
  );
};

export default NewUser;
