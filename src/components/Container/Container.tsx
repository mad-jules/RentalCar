import css from "./Container.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...rest }: Props) {
  return (
    <div className={`${css.container} ${className || ""}`} {...rest}>
      {children}
    </div>
  );
}
