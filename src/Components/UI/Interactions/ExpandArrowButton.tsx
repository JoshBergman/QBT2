import { useState } from "react";
import { BsChevronCompactDown } from "react-icons/bs";

import styles from "./ExpandArrowButton.module.css";

const ExpandArrowButton = () => {
  const [currAnimation, setCurrAnimation] = useState(0);
  const onMouseEnterHandler = () => {
    setCurrAnimation(15);
  };

  const onMouseLeaveHandler = () => {
    setCurrAnimation(0);
  };

  const animationStyle = {
    marginTop: currAnimation + "px",
  };

  return (
    <button
      className={styles.btnContainer}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <div className={styles.btnDiv} style={animationStyle}>
        <BsChevronCompactDown className={styles.btnIcon} />
      </div>
    </button>
  );
};

export default ExpandArrowButton;
