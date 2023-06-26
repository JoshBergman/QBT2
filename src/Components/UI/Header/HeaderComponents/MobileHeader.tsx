import { useContext } from "react";

import styles from "./HeaderNavigation.module.css";
import { ILoggingInState } from "../Header";
import { AuthContext } from "../../../../Store/Auth/AuthContext";

const MobileHeader = ({ loggingIn, setLoggingIn }: ILoggingInState) => {
  const authCTX = useContext(AuthContext).auth;
  const authd = authCTX.isAuthenticated;

  const onLogin = () => {
    setLoggingIn(true);
  };

  return (
    <nav className={styles.navContainer}>
      {authd ? (
        <a className={styles.navLink} href={"#user"}>
          Account
        </a>
      ) : (
        <a className={styles.navLink} href={"#graph"} onClick={onLogin}>
          Log In
        </a>
      )}
    </nav>
  );
};

export default MobileHeader;
