import React, { useState } from "react";
import { BsChevronCompactDown } from "react-icons/bs";

import styles from "./ExpandArrowButton.module.css";

interface IExpandBtnProps {
  onClick: () => void;
  label?: string;
}

const ExpandArrowButton = ({ onClick, label }: IExpandBtnProps) => {
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
    <React.Fragment>
      {label && <label className={styles.label}>{label}</label>}
      <button
        data-testid="btn-seemore"
        onClick={onClick}
        className={styles.btnContainer}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <div className={styles.btnDiv} style={animationStyle}>
          <BsChevronCompactDown className={styles.btnIcon} />
        </div>
      </button>
    </React.Fragment>
  );
};

export default ExpandArrowButton;
