import { useContext } from "react";

import styles from "./SectionCard.module.css";
import { ThemeContext } from "../../../Store/Theme/ThemeContext";

interface ISectionCardProps {
  sectionID: string;
  children: React.ReactNode;
  title?: React.ReactNode;
}

const SectionCard = ({ sectionID, children, title }: ISectionCardProps) => {
  const themeCTX = useContext(ThemeContext).theme;

  return (
    <section
      id={sectionID}
      data-testid={sectionID}
      className={styles.section}
      style={{ backgroundColor: themeCTX.sectionColor }}
    >
      {title && (
        <h3
          className={styles.sectionHeading}
          style={{ color: themeCTX.logoColor }}
        >
          {title}
        </h3>
      )}
      {children}
    </section>
  );
};

export default SectionCard;
