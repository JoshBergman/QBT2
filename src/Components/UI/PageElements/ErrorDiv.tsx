import { BiError } from "react-icons/bi";

import styles from "./ErrorDiv.module.css";

interface IErrorProps {
  msg: string;
}

const ErrorDiv = ({ msg }: IErrorProps) => {
  return (
    <div className={styles.errorContainer}>
      <label className={styles.warn}>
        <BiError />
      </label>
      <p className={styles.msgText}>{msg}</p>
    </div>
  );
};

export default ErrorDiv;
