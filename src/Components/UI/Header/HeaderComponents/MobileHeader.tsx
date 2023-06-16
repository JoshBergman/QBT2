import { useContext } from "react";

import styles from "./HeaderNavigation.module.css";
import { ThemeContext } from "../../../../Store/Theme/ThemeContext";
import { ILoggingInState } from "../Header";

const MobileHeader = ({ loggingIn, setLoggingIn }: ILoggingInState) => {
  const themeCTX = useContext(ThemeContext).theme;

  const onLogin = () => {
    setLoggingIn(true);
  };

  return (
    <nav className={styles.navContainer}>
      {false && (
        <a
          className={styles.navLink}
          style={{ color: themeCTX.logoColor }}
          href={"#user"}
        >
          My Info
        </a>
      )}
      <a
        className={styles.navLink}
        style={{ color: themeCTX.logoColor }}
        href={"#graph"}
        onClick={onLogin}
      >
        Log In
      </a>
    </nav>
  );
};

export default MobileHeader;
