import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Sections Render", () => {
  test("Graph Section Renders", () => {
    render(<App />);

    const sectionGraph = screen.getByTestId("graph");
    expect(sectionGraph).toBeInTheDocument();
    expect(sectionGraph).toHaveTextContent("Visualize");
  });

  test("Expenses Render", () => {
    render(<App />);

    const sectionExpenses = screen.getByTestId("expenses");
    expect(sectionExpenses).toBeInTheDocument();
    expect(sectionExpenses).toHaveTextContent("Expenses");
  });

  test("My Info Renders", () => {
    render(<App />);

    const sectionUser = screen.getByTestId("user");
    expect(sectionUser).toBeInTheDocument();
    expect(sectionUser).toHaveTextContent("My Info");
  });
});
