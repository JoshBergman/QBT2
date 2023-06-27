import { render, screen } from "@testing-library/react";

import UserInfo from "../UserInfo";

describe("My Info section initializes correctly", () => {
  test("Base info initializes correctly", () => {
    render(<UserInfo />);
    //Editable info
    const salary = screen.getByText(/Yearly Net-Income \(Salary\)/i);
    const location = screen.getByText(/Location/i);

    expect(salary).toBeInTheDocument();
    expect(location).toBeInTheDocument();

    //Presets
    const budgetPresets = screen.getByText(/Budget Presets:/i);
    expect(budgetPresets).toBeInTheDocument();

    //Account exits & is not editable
    const myAccHeading = screen.getByText(/My Account:/i);
    expect(myAccHeading).toBeInTheDocument();

    //Find button & check to ensure it is disabled as an unauth'd user.
    const editAccBtn = screen.getByRole("button", { name: /Edit My Account/i });
    expect(editAccBtn).toBeInTheDocument();
    expect(editAccBtn).toBeDisabled();
  });
});
