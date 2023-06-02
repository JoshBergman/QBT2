import { useContext } from "react";

import styles from "./ExpenseCard.module.css";
import { ThemeContext } from "../../../../Store/Theme/ThemeContext";

const ExpenseLegendCard = () => {
  const themeCTX = useContext(ThemeContext).theme;

  const cardStyles = {
    backgroundColor: themeCTX.logoColor,
  };

  const legendTextStyles = {
    color: "white",
    fontSize: "16px",
  };

  return (
    <div className={styles.legendCard} style={cardStyles}>
      <h5 className={styles.legendtextItem} style={legendTextStyles}>
        Expense
      </h5>
      <h5 className={styles.legendtextItem} style={legendTextStyles}>
        $ / Month
      </h5>
    </div>
  );
};

export default ExpenseLegendCard;
