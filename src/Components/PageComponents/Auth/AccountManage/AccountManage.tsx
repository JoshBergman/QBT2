import { useState, useContext } from "react";

import styles from "../../UserInfo/Presets.module.css";
import { AuthContext } from "../../../../Store/Auth/AuthContext";
import RemoveAccount from "./RemoveAccount";
import ChangePassword from "./ChangePassword";

export interface IDisplayState {
  toggleDisplaying: () => void;
}

//This component is only visible when authCTX.auth.isAuthenticated is true
const AccountManage = () => {
  const [currAction, setCurrAction] = useState("");
  const authCTX = useContext(AuthContext).auth;

  const toggleDisplaying = () => {
    setCurrAction("");
  };

  const startChangePassWordHandler = () => {
    setCurrAction("change-password");
  };

  const logOutHandler = () => {
    toggleDisplaying();
    authCTX.actions.deauthenticate();
  };

  const startRemoveAccountHandler = () => {
    setCurrAction("remove-account");
  };

  return (
    <div>
      {currAction === "change-password" && (
        <ChangePassword toggleDisplaying={toggleDisplaying} />
      )}
      {currAction === "remove-account" && <RemoveAccount />}
      <button className={styles.btn} onClick={startChangePassWordHandler}>
        Change Password
      </button>
      <button className={styles.btn} onClick={logOutHandler}>
        Log Out
      </button>
      <button className={styles.btn} onClick={startRemoveAccountHandler}>
        Delete Account
      </button>
      log out delete account
    </div>
  );
};

export default AccountManage;
