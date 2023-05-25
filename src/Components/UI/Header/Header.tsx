import React from "react";
import HeaderNavigation from "./HeaderComponents/HeaderNavigation";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h3 className={styles.logoText}>QBT</h3>
      <HeaderNavigation />
    </header>
  );
}
