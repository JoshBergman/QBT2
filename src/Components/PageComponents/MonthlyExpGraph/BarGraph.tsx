import React, { useContext } from "react";

import styles from "./Graphing.module.css";
import { getSortedExpensesArray } from "./GraphingHelpers/getSortedExpensesArray";
import { DataContext } from "../../../Store/Data/DataContext";

const BarGraph = () => {
  const ctxExpenses = useContext(DataContext).userData.expenses;

  const getBars = () => {
    try {
      const expenses = getSortedExpensesArray(ctxExpenses); //[label, amount]
      const tallest: number = expenses[0][1];
      const half: number = Math.floor(tallest / 2);

      const bars = expenses.map((expense) => {
        const label = expense[0];
        const color = ctxExpenses[label][1];
        const amount = expense[1];
        const heightPercent = Math.floor((amount / tallest) * 100);
        return (
          <div
            className={styles.bar}
            style={{ height: heightPercent + "%", backgroundColor: color }}
            key={label + "-bar"}
          >
            <label className={styles.barText}>
              {label}: ${amount}
            </label>
          </div>
        );
      });
      return [bars, tallest, half];
    } catch (er) {
      const bars = (
        <div
          className={styles.bar}
          style={{ height: "50%", backgroundColor: "red" }}
          key={"x-bar"}
        >
          <label className={styles.barText}>Error.</label>
        </div>
      );
      const tallest = 100;
      const half = 50;
      return [bars, tallest, half];
    }
  };

  const [bars, tallest, half] = getBars();

  return (
    <div className={styles.chartContainer}>
      <div className={styles.barLegendGraph}>
        <div className={styles.barLegend}>
          <p style={{ marginTop: "-10px" }}>{tallest}</p>
          <p style={{ marginTop: "100px" }}>{half}</p>
          <p style={{ marginTop: "110px" }}>0</p>
        </div>
        <div className={styles.barGraph}>{bars}</div>
      </div>
    </div>
  );
};

export default BarGraph;
