import { useContext } from "react";

import styles from "./PercentOfIncome.module.css";
import { DataContext } from "../../../Store/Data/DataContext";
import { getSortedExpensesArray } from "./GraphingHelpers/getSortedExpensesArray";

const AsPercentOfIncome = () => {
  const dataCTX = useContext(DataContext).userData;
  const expenses = getSortedExpensesArray(dataCTX.expenses);
  const totalMonthlyIncome: number = Math.round(
    parseInt(dataCTX.user.salary + "") / 12
  );

  const getBars = () => {
    const bars = [];
    for (let i = 0; i < expenses.length; i++) {
      const thisLabel: string = expenses[i][0];
      const thisAmount: number = expenses[i][1];
      const thisColor: string = dataCTX.expenses[thisLabel][1];
      const thisLength =
        Math.round(2.5 * (thisAmount / totalMonthlyIncome) * 100) + "px";

      bars.unshift(
        <div
          className={styles.bar}
          key={thisLabel + "-percentofinc"}
          style={{
            width: thisLength,
            backgroundColor: thisColor,
            zIndex: i,
          }}
        >
          <label className={styles.barLabel}>
            {thisLabel}: ${thisAmount}
          </label>
        </div>
      );
    }

    return bars;
  };

  return (
    <div className={styles.container}>
      <div data-testid="chart-poi" className={styles.graphContainer}>
        {getBars()}
      </div>
      <div className={styles.legendContainer}>
        Total Monthly Income: $
        <strong className={styles.strong}>{totalMonthlyIncome}</strong>
      </div>
    </div>
  );
};

export default AsPercentOfIncome;
