import { useState, useContext } from "react";

import { AuthContext } from "../../../../Store/Auth/AuthContext";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import LogoutConfirm from "./LogoutConfirm";

export interface IDisplayState {
  toggleDisplaying: () => void;
}

interface IAccountManageProps {
  toggleEditing: () => void;
}

//This component is only visible when authCTX.auth.isAuthenticated is true
const AccountManage = ({ toggleEditing }: IAccountManageProps) => {
  const [currAction, setCurrAction] = useState("");
  const authCTX = useContext(AuthContext).auth;

  const toggleDisplaying = () => {
    setCurrAction("");
  };

  const startChangePassWordHandler = () => {
    setCurrAction("change-password");
  };

  const logOutHandler = () => {
    setCurrAction("confirm-logout");
  };

  const startRemoveAccountHandler = () => {
    setCurrAction("remove-account");
  };

  const giveRed = {
    color: "#fe415bce",
  };

  return (
    <div>
      {currAction === "change-password" && (
        <ChangePassword toggleDisplaying={toggleDisplaying} />
      )}
      {currAction === "remove-account" && (
        <DeleteAccount toggleDisplaying={toggleDisplaying} />
      )}
      {currAction === "confirm-logout" && (
        <LogoutConfirm
          toggleDisplaying={toggleDisplaying}
          toggleEditing={toggleEditing}
        />
      )}
      <label htmlFor="log-out" className="label">
        Log Out:{" "}
      </label>
      <button id="log-out" className="btn" onClick={logOutHandler}>
        Log Out
      </button>
      <label htmlFor="chng-pass" className="label">
        Change Password:{" "}
      </label>
      <button
        id="chng-pass"
        className="btn"
        onClick={startChangePassWordHandler}
      >
        Change Password
      </button>
      <label htmlFor="del-acc" className="label" style={giveRed}>
        Delete Account:{" "}
      </label>
      <button id="del-acc" className="btn" onClick={startRemoveAccountHandler}>
        Delete Account
      </button>
    </div>
  );
};

export default AccountManage;
