import React, { useContext } from "react";
import "./App.css";
import Header from "./Components/UI/Header/Header";
import ExpenseGraph from "./Components/PageComponents/MonthlyExpGraph/ExpensesGraph";
import { ThemeContext } from "./Store/ThemeContext";
import Expenses from "./Components/PageComponents/Expenses/Expenses";

function App() {
  const themeCTX = useContext(ThemeContext).theme;

  const background = {
    background:
      "linear-gradient(to top right," + themeCTX.pageColor + ", #F9FAFC)",
  };

  return (
    <div className="page" style={background}>
      <div className="appControl">
        <Header />
        <ExpenseGraph />
        <Expenses />

        <ExpenseGraph />
        <Expenses />

        <ExpenseGraph />
        <Expenses />

        <ExpenseGraph />
        <Expenses />
      </div>
    </div>
  );
}

export default App;
