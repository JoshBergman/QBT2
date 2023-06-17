import { useState } from "react";

import styles from "./Login.module.css";

import { ILoggingInState } from "../../../UI/Header/Header";
import ModalTemplate from "../../../UI/PageElements/ModalTemplate";
import ExistingUser from "./LoginInteractions/ExistingUser";
import NewUser from "./LoginInteractions/NewUser";

const Login = ({ setLoggingIn }: ILoggingInState) => {
  const [isExistingUser, setIsExistingUser] = useState(true);

  const toggleExistingUser = () => {
    setIsExistingUser((prev) => !prev);
  };

  const cancelLoggingIn = () => {
    setLoggingIn(false);
  };

  return (
    <ModalTemplate>
      <div className={styles.modalDiv}>
        <h2 className={styles.title}>
          {isExistingUser ? "Sign In" : "Sign Up"}
        </h2>
        <div className={styles.center}>
          {isExistingUser && <ExistingUser />}
          {!isExistingUser && <NewUser />}
          <button onClick={toggleExistingUser} className={styles.altStatusBtn}>
            {isExistingUser
              ? "New User? Sign Up Here"
              : "Already Have An Account? Sign In Here"}
          </button>
        </div>
        <button onClick={cancelLoggingIn} className={styles.guestBtn}>
          Continue as guest
        </button>
      </div>
    </ModalTemplate>
  );
};

export default Login;
