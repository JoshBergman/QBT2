import { useState, useRef } from "react";

import styles from "./RenderExpenses/ExpenseCard.module.css";
import SectionCard from "../../UI/PageElements/SectionCard";
import RenderExpenses from "./RenderExpenses/RenderExpenses";
import NewExpense from "./NewExpense/NewExpense";

const Expenses = () => {
  const [currSortMethod, setCurrSortMethod] = useState("Largest To Smallest");

  const sortSelectRef = useRef<HTMLSelectElement>(null);
  const sortSelectHandler = () => {
    if (sortSelectRef.current === null) {
      return;
    }
    setCurrSortMethod(sortSelectRef.current.value);
  };

  return (
    <SectionCard sectionID="expenses" title="Expenses">
      <select
        className={styles.selectInput}
        onChange={sortSelectHandler}
        ref={sortSelectRef}
      >
        <option>Largest To Smallest</option>
        <option>Smallest To Largest</option>
      </select>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <RenderExpenses currSortMethod={currSortMethod} />
        <NewExpense />
      </div>
    </SectionCard>
  );
};

export default Expenses;
