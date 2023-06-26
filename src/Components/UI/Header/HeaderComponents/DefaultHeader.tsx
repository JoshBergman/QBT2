import { useContext } from "react";

import styles from "./HeaderNavigation.module.css";
import { ILoggingInState } from "../Header";
import { AuthContext } from "../../../../Store/Auth/AuthContext";

const DefaultHeader = ({ loggingIn, setLoggingIn }: ILoggingInState) => {
  const authCTX = useContext(AuthContext).auth;
  const authd = authCTX.isAuthenticated;

  const onLogin = () => {
    setLoggingIn(true);
  };

  return (
    <nav className={styles.navContainer}>
      <a className={styles.navLink} href={"#expenses"}>
        Expenses
      </a>
      <a className={styles.navLink} href={"#expenses"}>
        My Info
      </a>
      {authd ? (
        <a className={styles.navLink} href="#user">
          Account
        </a>
      ) : (
        <a className={styles.navLink} onClick={onLogin} href="#graph">
          Log In
        </a>
      )}
    </nav>
  );
};

export default DefaultHeader;
