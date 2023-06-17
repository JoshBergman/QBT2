import React, { useState, useRef, useContext } from "react";

import styles from "../Login.module.css";

const ExistingUser = () => {
  const [currEmail, setCurrEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const emailChangeHandler = () => {
    if (emailRef.current === null) {
      return;
    }
    const email = emailRef.current.value;
    setCurrEmail(email);
  };

  const passwordChangeHandler = () => {
    if (passwordRef.current === null) {
      return;
    }
    const password = passwordRef.current.value;
    setCurrPassword(password);
  };

  const signInHandler = () => {
    console.log("signedIn");
  };

  const getInputValidity = () => {
    return false;
  };

  return (
    <React.Fragment>
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
        disabled={getInputValidity()}
        onClick={signInHandler}
      >
        Sign In
      </button>
    </React.Fragment>
  );
};

export default ExistingUser;
