import { useState, useContext, useRef, FormEvent } from "react";

import { AuthContext } from "../../../../Store/Auth/AuthContext";
import findErrors from "./Helpers/Errors/findErrors";
import { IDisplayState } from "./AccountManage";

import ModalTemplate from "../../../UI/PageElements/ModalTemplate";
import ErrorDiv from "../../../UI/PageElements/ErrorDiv";
import SuccessDiv from "../../../UI/PageElements/SuccessDiv";
import changePassAPI from "./Helpers/API/changePassAPI";

const ChangePassword = ({ toggleDisplaying }: IDisplayState) => {
  const [showingPasswords, setShowingPasswords] = useState(false);
  const [currError, setCurrError] = useState("");
  const [currSuccess, setCurrSuccess] = useState("");
  const [currLoading, setCurrLoading] = useState(false);
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

  const changePasswordHandler = async (event: FormEvent) => {
    event.preventDefault();
    setCurrError("");
    if (
      !emailRef.current ||
      !existingPassRef.current ||
      !newPassRef.current ||
      !confirmNewPassRef.current
    ) {
      setCurrError("Check all fields for valid input.");
      return;
    }
    setCurrLoading(true);

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
    if (errors.length >= 1) {
      setCurrError("Error: Invalid input(s).");
      setCurrLoading(false);
      return;
    }

    const apiResponse = await changePassAPI(
      email,
      existingPassword,
      newPassword
    );
    if (Array.isArray(apiResponse)) {
      if (apiResponse[0]) {
        authCTX.actions.authenticate(apiResponse[1], email);
        setCurrSuccess("Password Changed. Redirecting 1s...");
        setTimeout(() => {
          toggleDisplaying();
        }, 2500);
        return;
      }
    }
    setCurrError("Server Error - Please try again later.");
    setCurrLoading(false);
  };

  const inputChangeHandler = () => {
    setCurrError("");
  };

  const showingPasswordType = showingPasswords ? "text" : "password";

  return (
    <ModalTemplate>
      <div className="modalDiv">
        <h4 className="subHeader">Change Password</h4>
        {currError !== "" && <ErrorDiv msg={currError} />}
        {currSuccess !== "" && <SuccessDiv msg={currSuccess} />}
        <label htmlFor="show-pass">Show Passwords:</label>
        <input
          id="show-pass"
          type="checkbox"
          onChange={toggleShowingPasswords}
        />
        <form onSubmit={changePasswordHandler} className="form">
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

          <label className="label" htmlFor="chpass-existing">
            Existing Password
          </label>
          <input
            className="input"
            ref={existingPassRef}
            id="chpass-existing"
            type={showingPasswordType}
            onChange={inputChangeHandler}
            autoComplete="password"
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
            autoComplete="new-password"
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
            autoComplete="new-password"
          />

          <button className="btn" type="submit" disabled={currLoading}>
            {currLoading ? "Loading..." : "Change Password"}
          </button>
          <button className="btn" onClick={cancelHandler}>
            Cancel
          </button>
        </form>
      </div>
    </ModalTemplate>
  );
};

export default ChangePassword;
