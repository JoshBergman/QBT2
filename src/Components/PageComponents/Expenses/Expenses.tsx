import { useState, useRef } from "react";

import styles from "./RenderExpenses/ExpenseCard.module.css";
import SectionCard from "../../UI/PageElements/SectionCard";
import RenderExpenses from "./RenderExpenses/RenderExpenses";

const Expenses = () => {
  const [showingRemaining, setShowingRemaining] = useState(false);
  const [currSortMethod, setCurrSortMethod] = useState("Largest To Smallest");
  const sortSelectRef = useRef<HTMLSelectElement>(null);

  const sortSelectHandler = () => {
    if (sortSelectRef.current === null) {
      return;
    }
    setCurrSortMethod(sortSelectRef.current.value);
  };

  const checkBoxHandler = () => {
    setShowingRemaining((prev) => !prev);
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
      <div className={styles.labelDiv}>
        <input
          className={styles.selectInput}
          id="show"
          type="checkbox"
          onChange={checkBoxHandler}
        />
        <label className={styles.label} htmlFor="show">
          Show Remaining Income
        </label>
      </div>
      <RenderExpenses
        showingRemaining={showingRemaining}
        currSortMethod={currSortMethod}
      />
    </SectionCard>
  );
};

export default Expenses;
