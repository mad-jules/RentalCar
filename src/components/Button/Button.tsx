import { useNavigate } from "react-router-dom";
import type React from "react";
import css from "./Button.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
}

export function Button({ children, className, to, ...props }: Props) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (to) {
      navigate(to);
    }
    if (props.onClick) props.onClick(e);
  };

  return (
    <button
      className={`${className ? className : ""} ${css.baseButton} `}
      {...props}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
