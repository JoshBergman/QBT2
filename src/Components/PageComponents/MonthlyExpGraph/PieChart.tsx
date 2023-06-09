import { useContext } from "react";

import styles from "./Graphing.module.css";
import { DataContext } from "../../../Store/Data/DataContext";
import { getSortedExpensesArray } from "./GraphingHelpers/getSortedExpensesArray";

import ExpensesLegend from "./ExpensesLegend";

const PieChart = () => {
  const dataCTX = useContext(DataContext).userData;

  const getConicGradString = (sortedExpenses: [string, number][]) => {
    const expenses = sortedExpenses.concat([]);
    let expensesTotal = 0;
    expenses.forEach((expense) => (expensesTotal += expense[1]));

    let gradString = "conic-gradient(";
    let lastExpensePercent = "0%";
    for (let i = 0; i < expenses.length; i++) {
      // + "color fistX%, color lastX%, "
      const currColor = dataCTX.expenses[expenses[i][0]][1];

      const fractionOfTotal = expenses[i][1] / expensesTotal;
      const thisPercentOfTotal = Math.floor(fractionOfTotal * 100);

      const firstX = lastExpensePercent;
      const lastX = parseInt(firstX) + thisPercentOfTotal + "%";

      lastExpensePercent = lastX;
      gradString += `${currColor} ${firstX}, ${currColor} ${lastX}, `;
    }
    gradString = gradString.slice(0, gradString.length - 2) + ")";
    return gradString;
  };

  const pieChartStyle = {
    backgroundImage: getConicGradString(
      getSortedExpensesArray(dataCTX.expenses)
    ),
  };

  return (
    <div className={styles.chartContainer}>
      <div
        style={pieChartStyle}
        className={styles.pieChart}
        data-testid="chart-pie"
      >
        <div className={styles.shader} />
      </div>
      <ExpensesLegend />
    </div>
  );
};

export default PieChart;
