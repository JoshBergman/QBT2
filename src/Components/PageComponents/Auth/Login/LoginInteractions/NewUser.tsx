import React, { useState, useContext, useRef } from "react";

import styles from "../Login.module.css";

const NewUser = () => {
  const [currEmail, setCurrEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

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

  const confirmPasswordChangeHandler = () => {
    if (confirmPasswordRef.current === null) {
      return;
    }
    const confirmPassword = confirmPasswordRef.current.value;
    setConfirmPassword(confirmPassword);
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default NewUser;
