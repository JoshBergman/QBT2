import { useContext } from "react";

import { DataContext } from "../../../Store/Data/DataContext";
import { sortExpenses } from "../Expenses/RenderExpenses/SortExpenses";
import { getColor } from "./ChartColors";

const PieChart = () => {
  const dataCTX = useContext(DataContext).userData;

  const getExpensesArray = () => {
    const keys = Object.keys(dataCTX.expenses);
    const expensesArray: [string, number][] = keys.map((key) => [
      key,
      dataCTX.expenses[key],
    ]);

    const sortedExpenses = sortExpenses("Largest To Smallest", expensesArray);
    return sortedExpenses;
  };

  const getConicGradString = (sortedExpenses: [string, number][]) => {
    const expenses = sortedExpenses.concat([]);
    let expensesTotal = 0;
    expenses.forEach((expense) => (expensesTotal += expense[1]));

    let gradString = "conic-gradient(";
    let lastExpensePercent = "0%";
    for (let i = 0; i < expenses.length; i++) {
      // + "color fistX%, color lastX%, "
      const currColor = getColor(i);

      const fractionOfTotal = expenses[i][1] / expensesTotal;
      const thisPercentOfTotal = Math.floor(fractionOfTotal * 100);

      const firstX = lastExpensePercent;
      const lastX = parseInt(firstX) + thisPercentOfTotal + "%";

      lastExpensePercent = lastX;
      gradString += `${currColor} ${firstX}, ${currColor} ${lastX}, `;
    }
    gradString = gradString.slice(0, gradString.length - 2) + ")";
    console.log(gradString);
    return gradString;
  };

  const pieChartStyle = {
    backgroundImage: getConicGradString(getExpensesArray()),
    height: "300px",
    width: "300px",
    borderRadius: "100%",
    transform: "rotate(0deg)",
  };

  return (
    <div>
      <div style={pieChartStyle} />
    </div>
  );
};

export default PieChart;
