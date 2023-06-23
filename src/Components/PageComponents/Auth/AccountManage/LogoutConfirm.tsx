import { useContext } from "react";

import { AuthContext } from "../../../../Store/Auth/AuthContext";
import { IDisplayState } from "./AccountManage";

import ModalTemplate from "../../../UI/PageElements/ModalTemplate";

interface IConfirmLogoutProps {
  toggleEditing: () => void;
  toggleDisplaying: IDisplayState["toggleDisplaying"];
}

const LogoutConfirm = ({
  toggleEditing,
  toggleDisplaying,
}: IConfirmLogoutProps) => {
  const authCTX = useContext(AuthContext).auth;

  const LogoutHandler = () => {
    authCTX.actions.deauthenticate();
    setTimeout(() => {
      toggleEditing();
    }, 1000);
    toggleDisplaying();
  };

  const cancelHandler = () => {
    toggleDisplaying();
  };

  return (
    <ModalTemplate>
      <div className="modalDiv">
        <h4 className="subHeader">Logout</h4>
        <p>Please confirm you would like to log out:</p>
        <button className="btn" onClick={LogoutHandler}>
          Confirm Logout
        </button>
        <button className="btn" onClick={cancelHandler}>
          Cancel
        </button>
      </div>
    </ModalTemplate>
  );
};

export default LogoutConfirm;
