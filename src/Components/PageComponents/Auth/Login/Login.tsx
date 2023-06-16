import styles from "./Login.module.css";

import { ILoggingInState } from "../../../UI/Header/Header";
import ModalTemplate from "../../../UI/PageElements/ModalTemplate";

const Login = ({ setLoggingIn }: ILoggingInState) => {
  const cancelLoggingIn = () => {
    setLoggingIn(false);
  };

  return (
    <ModalTemplate>
      <div className={styles.modalDiv}>
        Login Div
        <button onClick={cancelLoggingIn}>Continue as guest</button>
      </div>
    </ModalTemplate>
  );
};

export default Login;
