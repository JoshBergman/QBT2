import SectionCard from "../../UI/PageElements/SectionCard";
import PieChart from "./PieChart";

const ExpenseGraph = () => {
  return (
    <SectionCard sectionID="graph" title="Visualize">
      <PieChart />
    </SectionCard>
  );
};

export default ExpenseGraph;
