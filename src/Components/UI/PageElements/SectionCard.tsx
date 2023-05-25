interface ISectionCardProps {
  sectionID: string;
  children: React.ReactNode;
}

const SectionCard = ({ sectionID, children }: ISectionCardProps) => {
  return (
    <section id={sectionID}>
      <div>{children}</div>
    </section>
  );
};

export default SectionCard;
