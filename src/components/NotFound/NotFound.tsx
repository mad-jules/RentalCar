import type React from "react";
import css from "./NotFound.module.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface Props {
  styles?: React.CSSProperties;
}

export function NotFound({ styles }: Props) {
  return (
    <div className={css.lottie_wrapper} style={styles}>
      <DotLottieReact src="/no-data-found.lottie" loop autoplay />
    </div>
  );
}
