import { useContext } from "react";

import { getTotal } from "./ExpenseTotal";
import { DataContext } from "../../../../Store/Data/DataContext";
import ExpenseCard from "./ExpenseCard";

const RemainingIncome = () => {
  const dataCTX = useContext(DataContext).userData;

  const expenses = dataCTX.expenses;
  const totalCosts = getTotal(Object.keys(expenses), expenses);

  const monthlyIncome: number = Math.floor(
    parseInt(dataCTX.user["salary"] + "") / 12
  );
  const remainingIncome = Math.floor(monthlyIncome - totalCosts);

  return (
    <ExpenseCard
      label={"Remaining"}
      amount={remainingIncome}
      actions={{ remove: () => {}, modify: () => {} }}
      btnsOff={true}
      color={"black"}
    />
  );
};

export default RemainingIncome;
