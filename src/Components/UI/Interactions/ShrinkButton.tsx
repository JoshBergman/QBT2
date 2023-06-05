import { useState } from "react";
import { BsChevronCompactUp } from "react-icons/bs";

import styles from "./ExpandArrowButton.module.css";

interface IShrinkBtnProps {
  onClick: () => void;
}

const ShrinkButton = ({ onClick }: IShrinkBtnProps) => {
  const [currAnimation, setCurrAnimation] = useState(0);
  const onMouseEnterHandler = () => {
    setCurrAnimation(15);
  };

  const onMouseLeaveHandler = () => {
    setCurrAnimation(0);
  };

  const animationStyle = {
    marginBottom: currAnimation + "px",
  };

  return (
    <button
      onClick={onClick}
      className={styles.btnContainer}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <div className={styles.btnDiv} style={animationStyle}>
        <BsChevronCompactUp className={styles.btnIcon} />
      </div>
    </button>
  );
};

export default ShrinkButton;
