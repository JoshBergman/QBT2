import SectionCard from "../../UI/PageElements/SectionCard";
import PieChart from "./PieChart";

const ExpenseGraph = () => {
  return (
    <SectionCard sectionID="graph" title="Visualize">
      Graph Section Here Should include an always visible pie graph, and an
      expandle view with additional information
      <PieChart />
    </SectionCard>
  );
};

export default ExpenseGraph;
