import { useState, useContext, useRef, FormEvent } from "react";

import { AuthContext } from "../../../../Store/Auth/AuthContext";
import delAccountAPI from "./Helpers/API/deleteAccAPI";
import findErrors from "./Helpers/Errors/findErrors";
import { IDisplayState } from "./AccountManage";

import ModalTemplate from "../../../UI/PageElements/ModalTemplate";
import SuccessDiv from "../../../UI/PageElements/SuccessDiv";
import ErrorDiv from "../../../UI/PageElements/ErrorDiv";

const DeleteAccount = ({ toggleDisplaying }: IDisplayState) => {
  const [showingPasswords, setShowingPasswords] = useState(false);
  const [currError, setCurrError] = useState("");
  const [currSuccess, setCurrSuccess] = useState("");
  const [currLaoding, setCurrLoading] = useState(false);
  const authCTX = useContext(AuthContext).auth;

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const toggleShowingPasswords = () => {
    setShowingPasswords((prev) => !prev);
  };

  const cancelHandler = () => {
    toggleDisplaying();
  };

  const DeleteAccountHandler = async (event: FormEvent) => {
    event.preventDefault();
    setCurrLoading(true);
    setCurrError("");
    if (!emailRef.current || !passwordRef.current) {
      setCurrError("Check all fields for valid input.");
      setCurrLoading(false);
      return;
    }

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const errors = findErrors.findDelAccErrors(email, password);
    if (errors.length >= 1) {
      setCurrError("Input not valid.");
      setCurrLoading(false);
      return;
    }

    const delAccResponse = await delAccountAPI(email, password);
    if (delAccResponse) {
      authCTX.actions.deauthenticate();
      setCurrSuccess("Account Successfully Deleted - Redirecting In 1s...");
      setTimeout(() => {
        window.location.reload();
      }, 2500);
      return;
    } else {
      setCurrError("Server Error - Please try again later.");
      setCurrLoading(false);
    }
  };

  const inputChangeHandler = () => {
    setCurrError("");
  };

  const showingPasswordType = showingPasswords ? "text" : "password";

  return (
    <ModalTemplate>
      <div className="modalDiv">
        <h4 className="subHeader">Delete Account</h4>
        {currError !== "" && <ErrorDiv msg={currError} />}
        {currSuccess !== "" && <SuccessDiv msg={currSuccess} />}
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
          <button className="btn" type="submit" disabled={currLaoding}>
            {currLaoding ? "Loading..." : "DELETE ACCOUNT"}
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
