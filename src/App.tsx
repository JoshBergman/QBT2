import "./App.css";
import { addSiteView } from "./Components/UI/Interactions/InteractionHelpers/AddView";

import Header from "./Components/UI/Header/Header";
import ExpenseGraph from "./Components/PageComponents/MonthlyExpGraph/ExpensesGraph";
import Expenses from "./Components/PageComponents/Expenses/Expenses";
import UserInfo from "./Components/PageComponents/UserInfo/UserInfo";
import OnPageLoadMsg from "./Components/UI/Interactions/OnPageLoadMsg";

function App() {
  addSiteView();
  return (
    <div className="appControl">
      <Header />
      <OnPageLoadMsg />
      <ExpenseGraph />
      <Expenses />
      <UserInfo />
    </div>
  );
}

export default App;
