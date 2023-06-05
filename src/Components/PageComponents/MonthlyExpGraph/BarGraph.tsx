import React, { useContext } from "react";

import styles from "./Graphing.module.css";
import { getSortedExpensesArray } from "./GraphingHelpers/getSortedExpensesArray";
import { DataContext } from "../../../Store/Data/DataContext";

const BarGraph = () => {
  const ctxExpenses = useContext(DataContext).userData.expenses;

  const getBars = () => {
    const expenses = getSortedExpensesArray(ctxExpenses); //[label, amount]
    const tallest: number = expenses[0][1];

    const bars = expenses.map((expense) => {
      const label = expense[0];
      const color = ctxExpenses[label][1];
      const heightPercent = Math.floor((expense[1] / tallest) * 100);
      console.log(heightPercent);
      return (
        <div
          className={styles.bar}
          style={{ height: heightPercent + "%", backgroundColor: color }}
          key={label}
        >
          {label}
        </div>
      );
    });

    return bars;
  };

  return (
    <div className={styles.chartContainer}>
      <h3>More Ways To Analyze</h3>
      <div className={styles.barGraph}>{getBars()}</div>
    </div>
  );
};

export default BarGraph;
