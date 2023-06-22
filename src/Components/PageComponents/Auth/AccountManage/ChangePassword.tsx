import { useState, useContext, useRef } from "react";

import styles from "./Mng.module.css";
import ModalTemplate from "../../../UI/PageElements/ModalTemplate";
import findErrors from "./Helpers/Errors/findErrors";
import { IDisplayState } from "./AccountManage";
import { AuthContext } from "../../../../Store/Auth/AuthContext";
import ErrorDiv from "../../../UI/PageElements/ErrorDiv";

const ChangePassword = ({ toggleDisplaying }: IDisplayState) => {
  const [showingPasswords, setShowingPasswords] = useState(false);
  const [currErrors, setCurrErrors] = useState<string[]>([]);
  const authCTX = useContext(AuthContext).auth;

  const emailRef = useRef<HTMLInputElement>(null);
  const existingPassRef = useRef<HTMLInputElement>(null);
  const newPassRef = useRef<HTMLInputElement>(null);
  const confirmNewPassRef = useRef<HTMLInputElement>(null);

  const toggleShowingPasswords = () => {
    setShowingPasswords((prev) => !prev);
  };

  const cancelHandler = () => {
    toggleDisplaying();
  };

  const changePasswordHandler = () => {
    if (
      !emailRef.current ||
      !existingPassRef.current ||
      !newPassRef.current ||
      !confirmNewPassRef.current
    ) {
      setCurrErrors(["Check all fields for valid input."]);
      return;
    }

    const email = emailRef.current.value;
    const existingPassword = existingPassRef.current.value;
    const newPassword = newPassRef.current.value;
    const confirmNewPassword = confirmNewPassRef.current.value;

    const errors = findErrors.findChangePasswordErrors(
      email,
      existingPassword,
      newPassword,
      confirmNewPassword
    );
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
      <ErrorDiv msg={error} key={"chngpass-" + error} />
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
        <h4 className="subHeader">Change Password</h4>
        {renderErrors()}
        <label htmlFor="show-pass">Show Passwords:</label>
        <input
          id="show-pass"
          type="checkbox"
          onChange={toggleShowingPasswords}
        />

        <label className="label" htmlFor="chpass-email">
          Email:{" "}
        </label>
        <input
          className="input"
          ref={emailRef}
          id="chpass-email"
          type="text"
          onChange={inputChangeHandler}
        />

        <label className="label" htmlFor="chpass-existing">
          Existing Password
        </label>
        <input
          className="input"
          ref={existingPassRef}
          id="chpass-existing"
          type={showingPasswordType}
          onChange={inputChangeHandler}
        />

        <label className="label" htmlFor="chpass-new">
          New Password
        </label>
        <input
          className="input"
          ref={newPassRef}
          id="chpass-new"
          type={showingPasswordType}
          onChange={inputChangeHandler}
        />

        <label className="label" htmlFor="chpass-confirm-new">
          Confirm New Password
        </label>
        <input
          className="input"
          ref={confirmNewPassRef}
          id="chpass-confirm-new"
          type={showingPasswordType}
          onChange={inputChangeHandler}
        />

        <button className="btn" onClick={changePasswordHandler}>
          Change Password
        </button>
        <button className="btn" onClick={cancelHandler}>
          Cancel
        </button>
      </div>
    </ModalTemplate>
  );
};

export default ChangePassword;
