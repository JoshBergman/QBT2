import { useContext } from "react";

import styles from "./HeaderNavigation.module.css";
import { ThemeContext } from "../../../../Store/Theme/ThemeContext";

const HeaderNavigation = () => {
  const themeCTX = useContext(ThemeContext).theme;
  const links = [
    ["Expenses", "#expenses"],
    ["My Info", "#user"],
  ];
  return (
    <nav className={styles.navContainer}>
      {links.map((link) => (
        <a
          className={styles.navLink}
          style={{ color: themeCTX.logoColor }}
          key={link[0]}
          href={link[1]}
        >
          {link[0]}
        </a>
      ))}
    </nav>
  );
};

export default HeaderNavigation;
