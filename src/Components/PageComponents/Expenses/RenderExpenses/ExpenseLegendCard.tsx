import styles from "./ExpenseCard.module.css";

const ExpenseLegendCard = () => {
  const cardStyles = {
    backgroundColor: "#5476DD",
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
