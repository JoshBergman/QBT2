import React, { useState } from "react";

import ExpandArrowButton from "../../UI/Interactions/ExpandArrowButton";
import SectionCard from "../../UI/PageElements/SectionCard";
import PieChart from "./PieChart";
import ShrinkButton from "../../UI/Interactions/ShrinkButton";
import BarGraph from "./BarGraph";

const ExpenseGraph = () => {
  const [showingExtended, setShowingExtended] = useState(false);

  const toggleExtended = () => {
    setShowingExtended((prev) => !prev);
  };

  return (
    <SectionCard sectionID="graph" title="Visualize">
      <PieChart />
      {!showingExtended && <ExpandArrowButton onClick={toggleExtended} />}
      {showingExtended && (
        <React.Fragment>
          <BarGraph />
          <ShrinkButton onClick={toggleExtended} />
        </React.Fragment>
      )}
    </SectionCard>
  );
};

export default ExpenseGraph;
