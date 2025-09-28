import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./DatePicker.module.css";

interface Props {
  selected: Date | null;
  onChange: (name: string, date: Date | null) => void;
  label?: string;
  placeholderText?: string;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  name: string;
}

export function DatePicker({
  selected,
  onChange,
  label,
  name,
  ...props
}: Props) {
  return (
    <div className={css.wrapper}>
      {label && <label className={css.label}>{label}</label>}
      <ReactDatePicker
        selected={selected}
        onChange={(date: Date | Date[] | null) => {
          if (Array.isArray(date)) {
            return;
          }
          onChange(name, date);
        }}
        className={css.input}
        showTimeSelect
        timeIntervals={15}
        {...props}
      />
    </div>
  );
}
