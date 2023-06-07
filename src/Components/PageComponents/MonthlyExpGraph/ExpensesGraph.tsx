import React, { useState } from "react";

import ExpandArrowButton from "../../UI/Interactions/ExpandArrowButton";
import SectionCard from "../../UI/PageElements/SectionCard";
import PieChart from "./PieChart";
import ShrinkButton from "../../UI/Interactions/ShrinkButton";
import BarGraph from "./BarGraph";
import AsPercentOfIncome from "./AsPercentOfIncome";

const ExpenseGraph = () => {
  const [showingExtended, setShowingExtended] = useState(false);

  const toggleExtended = () => {
    setShowingExtended((prev) => !prev);
  };

  return (
    <SectionCard sectionID="graph" title="Visualize">
      <h3>Expenses Overview</h3>
      <PieChart />
      {!showingExtended && (
        <ExpandArrowButton onClick={toggleExtended} label={"See More"} />
      )}
      {showingExtended && (
        <React.Fragment>
          <h4>As Bar Graph</h4>
          <BarGraph />
          <h4>As Percent Of Income</h4>
          <AsPercentOfIncome />
          <ShrinkButton onClick={toggleExtended} />
        </React.Fragment>
      )}
    </SectionCard>
  );
};

export default ExpenseGraph;
