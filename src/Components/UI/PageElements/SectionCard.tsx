import styles from "./SectionCard.module.css";
interface ISectionCardProps {
  sectionID: string;
  children: React.ReactNode;
  title?: React.ReactNode;
}

const SectionCard = ({ sectionID, children, title }: ISectionCardProps) => {
  return (
    <section
      id={sectionID}
      data-testid={sectionID}
      style={{ backgroundColor: "#FFFFFB" }}
      className={styles.section}
    >
      {title && (
        <h3 style={{ color: "#5577dd" }} className={styles.sectionHeading}>
          {title}
        </h3>
      )}
      {children}
    </section>
  );
};

export default SectionCard;
