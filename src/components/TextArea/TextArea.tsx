import React from "react";
import clsx from "clsx";
import css from "./TextArea.module.css";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

// todo handle error state
export function TextArea({ label, error, className, ...props }: TextAreaProps) {
  return (
    <div className={css.wrapper}>
      {label && <label className={css.label}>{label}</label>}
      <textarea
        className={clsx(css.textarea, className, {
          //   [css.error]: error,
        })}
        {...props}
      />
      {/* {error && <span className={css.errorMessage}>{error}</span>} */}
    </div>
  );
}
