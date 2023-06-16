import { Dispatch, SetStateAction } from "react";
import { IUserData } from "../DataContext";

export interface IUserDataArgs {
  setCurrUserInfo: Dispatch<SetStateAction<IUserData["user"]>>;
  currUserInfo: IUserData["user"];
}

const setUserInfo = (
  newSalary: number,
  newLocation: string,
  { setCurrUserInfo, currUserInfo }: IUserDataArgs
) => {
  setCurrUserInfo({
    salary: newSalary,
    location: newLocation,
  });
};

export const userDataMng = {
  setUserInfo: setUserInfo,
};
