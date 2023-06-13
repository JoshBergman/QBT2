import { useContext, useState, useRef } from "react";

import styles from "./UserInfo.module.css";
import { states } from "./States";
import { DataContext } from "../../../Store/Data/DataContext";

import SectionCard from "../../UI/PageElements/SectionCard";
import ErrorDiv from "../../UI/PageElements/ErrorDiv";
import BudgetPresets from "./BudgetPresets";

const UserInfo = () => {
  const [currError, setCurrError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const dataCTX = useContext(DataContext).userData;

  const salary = dataCTX.user["salary"];
  const [currSalaryInput, setCurrSalaryInput] = useState(salary);
  const salaryInputRef = useRef<HTMLInputElement>(null);

  const location = dataCTX.user["location"];
  const [currLocationOption, setCurrLocationOption] = useState(location);
  const locationOptionRef = useRef<HTMLSelectElement>(null);

  const getStatesAsOptions = () => {
    const options = states.map((state) => (
      <option key={state + "-location"}>{state}</option>
    ));
    return options;
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const salaryChangeHandler = () => {
    setCurrError("");
    if (salaryInputRef.current === null) {
      return;
    }
    setCurrSalaryInput(salaryInputRef.current.value);
  };

  const locationChangeHandler = () => {
    setCurrError("");
    if (locationOptionRef.current === null) {
      return;
    }
    setCurrLocationOption(locationOptionRef.current.value);
  };

  const saveChangesHandler = () => {
    const thisSalary = parseInt(currSalaryInput + "");
    if (thisSalary < 0 || thisSalary > 9999999) {
      setCurrError(
        "Error: Yearly Net Income / Salary must be between $0 - $9,999,999"
      );
      return;
    }
    if (
      dataCTX.user["salary"] === thisSalary &&
      dataCTX.user["location"] === currLocationOption
    ) {
      toggleEditing();
      return;
    }
    dataCTX.actions.setUserInfo(thisSalary, currLocationOption);
    toggleEditing();
  };

  return (
    <SectionCard sectionID="user" title="My Info">
      {currError !== "" && <ErrorDiv msg={currError} />}
      <h5 className={styles.userDataItem}>
        Yearly Net-Income (Salary):{" "}
        {isEditing ? (
          <input
            type="number"
            ref={salaryInputRef}
            value={currSalaryInput}
            onChange={salaryChangeHandler}
            className={styles.input}
            min={0}
            max={9999999}
            step={1000}
          />
        ) : (
          <strong className={styles.strong}>{"$" + salary}</strong>
        )}
      </h5>
      <h5 className={styles.userDataItem}>
        Location:{" "}
        {isEditing ? (
          <select
            ref={locationOptionRef}
            onChange={locationChangeHandler}
            className={styles.input}
            defaultValue={currLocationOption}
          >
            {getStatesAsOptions()}
          </select>
        ) : (
          <strong className={styles.strong}>{location}</strong>
        )}
      </h5>
      <button className={styles.btn} onClick={toggleEditing}>
        {isEditing ? "Cancel" : "Edit My Info"}
      </button>
      {isEditing && (
        <button className={styles.btn} onClick={saveChangesHandler}>
          Save Changes
        </button>
      )}
      <BudgetPresets />
    </SectionCard>
  );
};

export default UserInfo;
