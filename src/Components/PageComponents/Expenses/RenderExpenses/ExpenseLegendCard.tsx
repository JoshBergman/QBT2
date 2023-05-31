import { useContext } from "react";

import styles from "./ExpenseCard.module.css";
import { ThemeContext } from "../../../../Store/Theme/ThemeContext";

const ExpenseLegendCard = () => {
  const themeCTX = useContext(ThemeContext).theme;

  const cardStyles = {
    backgroundColor: themeCTX.logoColor,
    color: "white",
    borderColor: "white",
  };
  return (
    <div className={styles.legendCard} style={cardStyles}>
      <h5 className={styles.textItem}>Label</h5>
      <h5 className={styles.textItem}>Amount $</h5>
    </div>
  );
};

export default ExpenseLegendCard;
