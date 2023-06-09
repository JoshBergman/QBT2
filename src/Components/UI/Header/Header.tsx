import React, { useState, useLayoutEffect } from "react";

import styles from "./Header.module.css";

import DefaultHeader from "./HeaderComponents/DefaultHeader";
import MobileHeader from "./HeaderComponents/MobileHeader";
import Login from "../../PageComponents/Auth/Login/Login";

export interface ILoggingInState {
  setLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;
  loggingIn: boolean;
}

const Header = () => {
  const [size, setSize] = useState([0, 0]);
  const [loggingIn, setLoggingIn] = useState(false);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <React.Fragment>
      <header id="header" className={styles.header}>
        <h3 className={styles.logoText}>
          <a className="link" href="#graph">
            QBT
          </a>
        </h3>
        {size[0] > 470 && (
          <DefaultHeader setLoggingIn={setLoggingIn} loggingIn={loggingIn} />
        )}
        {size[0] <= 470 && (
          <MobileHeader setLoggingIn={setLoggingIn} loggingIn={loggingIn} />
        )}
      </header>
      {loggingIn && <Login setLoggingIn={setLoggingIn} loggingIn={loggingIn} />}
    </React.Fragment>
  );
};

export default Header;
