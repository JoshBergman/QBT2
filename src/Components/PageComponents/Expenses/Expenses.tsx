import { useState, useRef } from "react";

import styles from "./RenderExpenses/ExpenseCard.module.css";
import SectionCard from "../../UI/PageElements/SectionCard";
import RenderExpenses from "./RenderExpenses/RenderExpenses";

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
      <RenderExpenses currSortMethod={currSortMethod} />
    </SectionCard>
  );
};

export default Expenses;
