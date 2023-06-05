import ExpandArrowButton from "../../UI/Interactions/ExpandArrowButton";
import SectionCard from "../../UI/PageElements/SectionCard";
import PieChart from "./PieChart";

const ExpenseGraph = () => {
  return (
    <SectionCard sectionID="graph" title="Visualize">
      <PieChart />
      <ExpandArrowButton />
    </SectionCard>
  );
};

export default ExpenseGraph;
