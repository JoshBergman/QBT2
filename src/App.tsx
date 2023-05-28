import "./App.css";
import Header from "./Components/UI/Header/Header";
import ExpenseGraph from "./Components/PageComponents/MonthlyExpGraph/ExpensesGraph";
import Expenses from "./Components/PageComponents/Expenses/Expenses";

function App() {
  return (
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
  );
}

export default App;
