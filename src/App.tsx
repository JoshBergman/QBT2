import "./App.css";
import Header from "./Components/UI/Header/Header";
import ExpenseGraph from "./Components/PageComponents/MonthlyExpGraph/ExpensesGraph";
import Expenses from "./Components/PageComponents/Expenses/Expenses";
import UserInfo from "./Components/PageComponents/UserInfo/UserInfo";

function App() {
  return (
    <div className="appControl">
      <Header />
      <ExpenseGraph />
      <Expenses />
      <UserInfo />
    </div>
  );
}

export default App;
