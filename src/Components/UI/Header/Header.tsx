import { useContext } from "react";

import styles from "./Header.module.css";
import { ThemeContext } from "../../../Store/Theme/ThemeContext";

import HeaderNavigation from "./HeaderComponents/HeaderNavigation";

const Header = () => {
  const themeCTX = useContext(ThemeContext).theme;

  return (
    <header id="header" className={styles.header}>
      <h3 className={styles.logoText} style={{ color: themeCTX.logoColor }}>
        <a className="link" href="#graph">
          QBT
        </a>
      </h3>
      <HeaderNavigation />
    </header>
  );
};

export default Header;
