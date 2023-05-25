import React, { useContext } from "react";

import styles from "./HeaderNavigation.module.css";
import { ThemeContext } from "../../../../Store/ThemeContext";

export default function HeaderNavigation() {
  const themeCTX = useContext(ThemeContext).theme;
  const links = [
    ["Link Name", "Link"],
    ["Second Link", "Link"],
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
}
