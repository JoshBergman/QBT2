import { useContext } from "react";

import { AuthContext } from "../../../../../Store/Auth/AuthContext";
import { DataContext } from "../../../../../Store/Data/DataContext";
import clearExpensesFromLocalStorage from "./Helpers/ClearExpensesFromLocalStorage";
import saveExpensesToLocalStorage from "./Helpers/SaveExpensesToLocalStorage";

import Slider from "../../../../UI/PageElements/Slider";

const ToggleUseLocalStorage = () => {
  const dataCTX = useContext(DataContext).userData;
  const expensesArray: [string, number][] = Object.keys(dataCTX.expenses).map(
    (key) => [key, dataCTX.expenses[key][0]]
  );
  const authCTX = useContext(AuthContext).auth;
  const prefernce = authCTX.prefersLocalStorage;

  const prefernceChangeHandler = () => {
    const newPref = !prefernce;
    authCTX.actions.setLocalStoragePreference(newPref);

    if (!newPref) {
      clearExpensesFromLocalStorage();
      localStorage.setItem("l", "n");
    } else {
      saveExpensesToLocalStorage(expensesArray);
      localStorage.setItem("l", "y");
    }
  };

  return <Slider initialValue={prefernce} onChange={prefernceChangeHandler} />;
};

export default ToggleUseLocalStorage;
