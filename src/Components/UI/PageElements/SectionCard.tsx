import { useContext } from "react";

import styles from "./SectionCard.module.css";
import { ThemeContext } from "../../../Store/ThemeContext";

interface ISectionCardProps {
  sectionID: string;
  children: React.ReactNode;
}

const SectionCard = ({ sectionID, children }: ISectionCardProps) => {
  const themeCTX = useContext(ThemeContext).theme;

  return (
    <section
      id={sectionID}
      className={styles.section}
      style={{ backgroundColor: themeCTX.sectionColor }}
    >
      {children}
    </section>
  );
};

export default SectionCard;
