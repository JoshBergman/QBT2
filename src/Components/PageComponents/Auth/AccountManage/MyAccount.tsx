import { useState, useContext } from "react";

import styles from "../../UserInfo/Presets.module.css";
import { AuthContext } from "../../../../Store/Auth/AuthContext";
import AccountManage from "./AccountManage";

const MyAccount = () => {
  const [showingEdit, setShowingEdit] = useState(false);
  const authCTX = useContext(AuthContext).auth;
  const loggedIn = authCTX.isAuthenticated;

  const toggleEditingAccountHandler = () => {
    setShowingEdit((prev) => !prev);
  };

  return (
    <div>
      <h3 className={styles.title}>My Account:</h3>
      <h5 className={styles.subtitle}>
        {loggedIn
          ? "Manage my account settings and information"
          : "Log in to edit account and settings."}
      </h5>
      {showingEdit && (
        <AccountManage toggleEditing={toggleEditingAccountHandler} />
      )}
      <button
        disabled={!loggedIn}
        className={styles.btn}
        onClick={toggleEditingAccountHandler}
        style={{
          backgroundColor: loggedIn ? "#5476dd" : "gray",
          marginTop: showingEdit ? "20px" : "-15px",
        }}
      >
        {showingEdit ? "Stop Editing My Account" : "Edit My Account"}
      </button>
    </div>
  );
};

export default MyAccount;
