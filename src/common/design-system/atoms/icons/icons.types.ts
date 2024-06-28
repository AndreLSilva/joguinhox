import { SVGAttributes } from "react";

export type IconComponent = (
  props: SVGAttributes<SVGSVGElement>
) => JSX.Element;
