import React, { useState, useRef, useContext } from "react";

import styles from "../Login.module.css";
import ErrorDiv from "../../../../UI/PageElements/ErrorDiv";
import { AuthContext } from "../../../../../Store/Auth/AuthContext";

const ExistingUser = () => {
  const authCTX = useContext(AuthContext);
  const [currEmail, setCurrEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [currError, setCurrError] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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

  const signInHandler = () => {
    if (true) {
      setCurrError(
        "Sign-In Error: Check email and password are entered correctly."
      );
    }
    console.log("signedIn");
  };

  const getInputValidity = () => {
    if (emailRef.current == null || passwordRef.current == null) {
      return true;
    }
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.length < 5 || password.length < 5) {
      return true;
    }

    return false;
  };

  const inputValidity = getInputValidity();

  return (
    <React.Fragment>
      {currError !== "" && <ErrorDiv msg={currError} />}
      <label htmlFor="email" className={styles.label}>
        Email: {currEmail}{" "}
      </label>
      <input
        type="email"
        id="email"
        onChange={emailChangeHandler}
        ref={emailRef}
        autoComplete="on"
        placeholder="Email"
        className={styles.input}
      />
      <label htmlFor="password" className={styles.label}>
        Password: {currPassword}{" "}
      </label>
      <input
        type="text"
        id="password"
        onChange={passwordChangeHandler}
        ref={passwordRef}
        autoComplete="on"
        placeholder="Password"
        className={styles.input}
      />
      <button
        className={styles.btn}
        disabled={inputValidity}
        style={{ backgroundColor: inputValidity ? "gray" : "#5476dd" }}
        onClick={signInHandler}
      >
        Sign In
      </button>
    </React.Fragment>
  );
};

export default ExistingUser;
