import { useContext } from "react";

import styles from "./HeaderNavigation.module.css";
import { ThemeContext } from "../../../../Store/Theme/ThemeContext";
import { ILoggingInState } from "../Header";
import { AuthContext } from "../../../../Store/Auth/AuthContext";

const MobileHeader = ({ loggingIn, setLoggingIn }: ILoggingInState) => {
  const themeCTX = useContext(ThemeContext).theme;
  const authCTX = useContext(AuthContext).auth;
  const authd = authCTX.isAuthenticated;

  const onLogin = () => {
    setLoggingIn(true);
  };

  return (
    <nav className={styles.navContainer}>
      {authd ? (
        <a
          className={styles.navLink}
          style={{ color: themeCTX.logoColor }}
          href={"#user"}
        >
          Account
        </a>
      ) : (
        <a
          className={styles.navLink}
          style={{ color: themeCTX.logoColor }}
          href={"#graph"}
          onClick={onLogin}
        >
          Log In
        </a>
      )}
    </nav>
  );
};

export default MobileHeader;
