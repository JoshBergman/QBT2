import { useContext } from "react";

import styles from "./HeaderNavigation.module.css";
import { ThemeContext } from "../../../../Store/Theme/ThemeContext";
import { ILoggingInState } from "../Header";
import { AuthContext } from "../../../../Store/Auth/AuthContext";

const DefaultHeader = ({ loggingIn, setLoggingIn }: ILoggingInState) => {
  const themeCTX = useContext(ThemeContext).theme;
  const authCTX = useContext(AuthContext).auth;
  const authd = authCTX.isAuthenticated;

  const onLogin = () => {
    setLoggingIn(true);
  };

  return (
    <nav className={styles.navContainer}>
      <a
        className={styles.navLink}
        style={{ color: themeCTX.logoColor }}
        href={"#expenses"}
      >
        Expenses
      </a>
      <a
        className={styles.navLink}
        style={{ color: themeCTX.logoColor }}
        href={"#expenses"}
      >
        My Info
      </a>
      {authd ? (
        <a
          className={styles.navLink}
          style={{ color: themeCTX.logoColor }}
          href="#user"
        >
          Account
        </a>
      ) : (
        <a
          className={styles.navLink}
          style={{ color: themeCTX.logoColor }}
          onClick={onLogin}
          href="#graph"
        >
          Log In
        </a>
      )}
    </nav>
  );
};

export default DefaultHeader;
