import React from "react";

export enum ICON_NAMES {
  LOGO = "logo",
  HEART = "heart",
  CHEVRON_DOWN = "chevron-down",
  CHEVRON_UP = "chevron-up",
  LOCATION = "location",
  CALENDAR = "calendar",
  FUEL_PUMP = "fuel-pump",
  GEAR = "gear",
  CHECK_CIRCLE = "check-circle",
}

export type IconName = `${ICON_NAMES}`;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  color?: string;
  width?: string | number;
  height?: string | number;
  size?: string | number;
}

export function Icon({
  name,
  color = "black",
  height = "16px",
  width = "16px",
  size,
  ...rest
}: IconProps) {
  return (
    <svg
      height={size ? size : height}
      width={size ? size : width}
      color={color}
      {...rest}
    >
      {React.createElement("use", {
        href: `/SymbolDefs.svg#${name}`,
        xlinkHref: `/SymbolDefs.svg#${name}`,
      })}
    </svg>
  );
}
