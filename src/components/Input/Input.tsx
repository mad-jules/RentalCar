import type React from "react";
import css from "./Input.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperStyle?: React.CSSProperties;
}

export function Input({ label, wrapperStyle, ...props }: Props) {
  return (
    <div className={css.wrapper} style={wrapperStyle}>
      {label && <label htmlFor={props.name}>{label}</label>}
      <input className={css.input} id={props.name} {...props} />
    </div>
  );
}
