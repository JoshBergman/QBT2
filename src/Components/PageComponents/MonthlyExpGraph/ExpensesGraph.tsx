import React, { useState } from "react";

import SectionCard from "../../UI/PageElements/SectionCard";
import PieChart from "./PieChart";
import BarGraph from "./BarGraph";
import AsPercentOfIncome from "./AsPercentOfIncome";

import ExpandArrowButton from "../../UI/Interactions/ExpandArrowButton";
import ShrinkButton from "../../UI/Interactions/ShrinkButton";
import ExpenseErrors from "../Expenses/RenderExpenses/ExpenseErrors";

const ExpenseGraph = () => {
  const [showingExtended, setShowingExtended] = useState(false);

  const toggleExtended = () => {
    setShowingExtended((prev) => !prev);
  };

  const headRoom = {
    marginTop: "50px",
  };

  return (
    <SectionCard sectionID="graph" title="Visualize">
      <h3>Expenses Overview</h3>
      <PieChart />
      <ExpenseErrors />
      {!showingExtended && (
        <ExpandArrowButton onClick={toggleExtended} label={"See More"} />
      )}
      {showingExtended && (
        <React.Fragment>
          <h4 style={headRoom}>As Bar Graph</h4>
          <BarGraph />
          <h4 style={headRoom}>As Percent Of Income</h4>
          <AsPercentOfIncome />
          <ShrinkButton onClick={toggleExtended} />
        </React.Fragment>
      )}
    </SectionCard>
  );
};

export default ExpenseGraph;
