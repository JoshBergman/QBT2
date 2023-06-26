import React, { useState } from "react";

import styles from "./Slider.module.css";

type ISliderProps = {
  initialValue: boolean;
  onChange: () => void;
};

const Slider = ({ initialValue, onChange }: ISliderProps) => {
  const [sliderValue, setSliderValue] = useState(initialValue);

  const handleSlide = () => {
    setSliderValue((prev) => !prev);
    onChange();
  };

  const sliderPosX1 = 20;
  const sliderPosX2 = -11;

  const sliderPosition = sliderValue ? sliderPosX1 + "px" : sliderPosX2 + "px";
  const buttonAnimationStyle = {
    transform: "translate(" + sliderPosition + ", -5.5px)",
  };

  return (
    <React.Fragment>
      <div className={styles.masterContainer}>
        <button className={styles.sliderContainer} onClick={handleSlide}>
          <div className={styles.sliderBtn} style={buttonAnimationStyle} />
        </button>
        <label className={styles.indicator}>{sliderValue ? "ON" : "OFF"}</label>
      </div>
      <div className={styles.titleContainer}>
        <label className={styles.sliderLabel}>
          Save Expenses In Browser Storage
        </label>
      </div>
    </React.Fragment>
  );
};

export default Slider;
