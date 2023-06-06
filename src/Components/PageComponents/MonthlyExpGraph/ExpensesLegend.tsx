import { useContext } from "react";

import styles from "./ExpenseLegend.module.css";
import { DataContext } from "../../../Store/Data/DataContext";
import { getSortedExpensesArray } from "./GraphingHelpers/getSortedExpensesArray";

const ExpensesLegend = () => {
  const dataCTX = useContext(DataContext).userData;
  const sortedExpenses = getSortedExpensesArray(dataCTX.expenses);
  return (
    <div className={styles.container}>
      <label className={styles.legendLabel}>Expenses Legend</label>
      {sortedExpenses.map((expense) => (
        <div className={styles.expenseContainer} key={expense[0] + "-Legend"}>
          <div
            className={styles.colorKey}
            style={{ backgroundColor: dataCTX.expenses[expense[0]][1] }}
          />
          <label className={styles.expenseLabel}>
            {expense[0]}: ${expense[1]}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ExpensesLegend;
