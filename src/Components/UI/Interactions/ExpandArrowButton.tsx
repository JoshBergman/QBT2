import { useState } from "react";
import { BsChevronCompactDown } from "react-icons/bs";

import styles from "./ExpandArrowButton.module.css";

interface IExpandBtnProps {
  onClick: () => void;
}

const ExpandArrowButton = ({ onClick }: IExpandBtnProps) => {
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
      onClick={onClick}
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
