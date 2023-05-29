import { useContext } from "react";

import SectionCard from "../../UI/PageElements/SectionCard";
import { DataContext } from "../../../Store/Data/DataContext";
import RenderExpenses from "./RenderExpenses/RenderExpenses";

const Expenses = () => {
  const dCTX = useContext(DataContext).userData;
  const dataCTX = dCTX.expenses;

  const handleNewExp = () => {
    dCTX.actions.remExpense("Car");
  };

  return (
    <SectionCard sectionID="expenses" title="Expenses">
      Expenses section here should allow you to edit, remove, and add expenses
      and they will all save to cloud when edited or save to local storage Data
      Context ={">"} Expenses || Car: {dataCTX.Car} || Dog: {dataCTX.Dog}
      <button onClick={handleNewExp}>New</button>
      <button
        onClick={() => {
          console.log(dataCTX);
        }}
      >
        Log
      </button>
      <RenderExpenses />
    </SectionCard>
  );
};

export default Expenses;
