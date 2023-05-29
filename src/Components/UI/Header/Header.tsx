import { useContext } from "react";

import styles from "./Header.module.css";
import HeaderNavigation from "./HeaderComponents/HeaderNavigation";
import { ThemeContext } from "../../../Store/Theme/ThemeContext";

const Header = () => {
  const themeCTX = useContext(ThemeContext).theme;

  return (
    <header id="header" className={styles.header}>
      <h3 className={styles.logoText} style={{ color: themeCTX.logoColor }}>
        <a className="link" href="#header">
          QBT
        </a>
      </h3>
      <HeaderNavigation />
    </header>
  );
};

export default Header;
