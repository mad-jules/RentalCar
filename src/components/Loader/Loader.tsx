import type React from "react";
import { ClipLoader } from "react-spinners";
import css from "./Loader.module.css";
import clsx from "clsx";

interface Props {
  styles?: React.CSSProperties;
  isFixedCenter?: boolean;
}
export function Loader({ styles, isFixedCenter }: Props) {
  return (
    <div
      className={clsx(css.loader_wrapper, { [css.center]: isFixedCenter })}
      style={styles}
    >
      <ClipLoader />
    </div>
  );
}
