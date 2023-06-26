import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ExpenseGraph from "../ExpensesGraph";
import PieChart from "../PieChart";

describe("All primary functions of 'visualize' section", () => {
  test("Expenses Sections Renders", () => {
    render(<ExpenseGraph />);

    const headingText = screen.getByText("Expenses Overview");
    expect(headingText).toBeInTheDocument();
  });

  test("Pie Chart Renders", () => {
    render(<PieChart />);

    const sectionGraph = screen.getByTestId("chart-pie");
    expect(sectionGraph).toBeInTheDocument();
    expect(sectionGraph).toHaveStyle({ background: /conci-gradient/i });
  });

  test("Bar Graph & Percent of Income Graph Render on Expanded Graphs View", async () => {
    const user = userEvent.setup();
    render(<ExpenseGraph />);

    //expand graph sections to check for additional info graphs.
    const expandButton = screen.getByTestId("btn-seemore"); // the "see more" button
    await act(async () => {
      await user.click(expandButton);
    });

    //check for bar graph
    const barGraphHeading = screen.getByText(/As Bar Graph/i);
    const barGraph = screen.getByTestId("chart-bar");
    expect(barGraphHeading).toBeInTheDocument();
    expect(barGraph).toBeInTheDocument();

    //check for as percent of income graph
    const poiHeading = screen.getByText("As Percent Of Income");
    const poiGraph = screen.getByTestId("chart-poi");
    expect(poiHeading).toBeInTheDocument();
    expect(poiGraph).toBeInTheDocument();
  });
});
