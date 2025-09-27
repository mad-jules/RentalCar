import React from "react";
import css from "./InputGroup.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function InputGroup({ children, ...props }: Props) {
  return (
    <div className={css.input_group} {...props}>
      {children}
    </div>
  );
}
