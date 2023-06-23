import { useState, useContext, useRef, FormEvent } from "react";

import { AuthContext } from "../../../../Store/Auth/AuthContext";
import findErrors from "./Helpers/Errors/findErrors";
import { IDisplayState } from "./AccountManage";

import ModalTemplate from "../../../UI/PageElements/ModalTemplate";
import ErrorDiv from "../../../UI/PageElements/ErrorDiv";

const DeleteAccount = ({ toggleDisplaying }: IDisplayState) => {
  const [showingPasswords, setShowingPasswords] = useState(false);
  const [currErrors, setCurrErrors] = useState<string[]>([]);
  const authCTX = useContext(AuthContext).auth;

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const toggleShowingPasswords = () => {
    setShowingPasswords((prev) => !prev);
  };

  const cancelHandler = () => {
    toggleDisplaying();
  };

  const DeleteAccountHandler = (event: FormEvent) => {
    event.preventDefault();
    if (!emailRef.current || !passwordRef.current) {
      setCurrErrors(["Check all fields for valid input."]);
      return;
    }

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const errors = findErrors.findDelAccErrors(email, password);
    setCurrErrors(errors);

    if (errors.length >= 1) {
      return;
    }

    //add API call to change password here. If successful close display after success div for a few seconds
    // or if api call fails create error div.

    // also on success dont forget to update session ID
    toggleDisplaying();
  };

  const renderErrors = () => {
    if (currErrors.length <= 0) {
      return;
    }
    const errs = currErrors.map((error) => (
      <ErrorDiv msg={error} key={"delacc-" + error} />
    ));
    return errs;
  };

  const inputChangeHandler = () => {
    setCurrErrors([]);
  };

  const showingPasswordType = showingPasswords ? "text" : "password";

  return (
    <ModalTemplate>
      <div className="modalDiv">
        <h4 className="subHeader">Delete Account</h4>
        {renderErrors()}
        <label htmlFor="show-pass">Show Passwords:</label>
        <input
          id="show-pass"
          type="checkbox"
          onChange={toggleShowingPasswords}
        />
        <form onSubmit={DeleteAccountHandler} className="form">
          <label className="label" htmlFor="chpass-email">
            Email:{" "}
          </label>
          <input
            className="input"
            ref={emailRef}
            id="chpass-email"
            type="text"
            onChange={inputChangeHandler}
            autoComplete="email"
          />

          <label className="label" htmlFor="delacc-password">
            Confirm Password
          </label>
          <input
            className="input"
            ref={passwordRef}
            id="delacc-password"
            type={showingPasswordType}
            onChange={inputChangeHandler}
            autoComplete="password"
          />
          <button className="btn" type="submit">
            DELETE ACCOUNT
          </button>
          <button className="btn" onClick={cancelHandler}>
            Cancel
          </button>
        </form>
      </div>
    </ModalTemplate>
  );
};

export default DeleteAccount;
