import { AiOutlineCheckCircle } from "react-icons/ai";

import styles from "./ErrorDiv.module.css";

interface ISuccessProps {
  msg: string;
}
const SuccessDiv = ({ msg }: ISuccessProps) => {
  return (
    <div className={styles.successContainer}>
      <label className={styles.warn}>
        <AiOutlineCheckCircle />
      </label>
      <p className={styles.msgText}>{msg}</p>
    </div>
  );
};

export default SuccessDiv;
