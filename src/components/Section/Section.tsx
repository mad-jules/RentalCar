import css from "./Section.module.css";

interface Props {
  children: React.ReactNode;
}

export default function Section({ children }: Props) {
  return <div className={css.section}>{children}</div>;
}
