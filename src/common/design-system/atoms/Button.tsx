import { MouseEventHandler, ReactNode, createElement } from "react";
import { IconComponent } from "./icons/icons.types";

interface ButtonProps {
  className?: string;
  size?: ButtonSize;
  circle?: boolean;
  color?: keyof typeof colorMap;

  icon?: IconComponent;
  children?: ReactNode;

  onClick?: MouseEventHandler;
}

type ButtonSize = "md" | "lg";

const colorMap = {
  blue: "bg-blue-600 text-white hover:bg-blue-500",
  red: "bg-red-600 text-white hover:bg-red-500",
  green: "bg-green-600 text-white hover:bg-green-500",
  yellow: "bg-yellow-600 text-white hover:bg-yellow-500",
};

export function Button({
  className = "",
  size = "md",
  circle = false,
  color = "blue",
  icon = undefined,
  children = undefined,
  onClick = undefined,
}: ButtonProps) {
  const sizeStyle = getButtonSize(size, circle);

  return (
    <div
      className={`flex shrink-0 items-center justify-center bg-slate-100 ${sizeStyle.base} ${className}`}
    >
      <button
        className={`relative flex w-full items-center justify-center gap-2 text-center active:shadow-none ${colorMap[color]} ${sizeStyle.button}`}
        type="button"
        onClick={onClick}
      >
        {icon && createElement(icon, { height: sizeStyle.icon, width: sizeStyle.icon })}
        {children}
      </button>
    </div>
  );
}

function getButtonSize(size: ButtonSize, circle: boolean) {
  switch (size) {
    case "lg": {
      const rounded = circle ? "rounded-full" : "rounded-xl";
      return {
        base: `px-2 pt-0 pb-3 shadow-[inset_0_-0.25rem_0_#00000022] ${rounded}`,
        button: `px-2.5 min-w-[6.5rem] pb-2 pt-0 h-[6.5rem] shadow-[inset_0_-0.5rem_0_#00000022] active:mt-2 active:pb-0 active:h-[6rem] ${rounded}`,
        icon: "3.5rem",
      };
    }
    case "md": {
      const rounded = circle ? "rounded-full" : "rounded-xl";
      return {
        base: `px-2 pt-0 pb-3 shadow-[inset_0_-0.25rem_0_#00000022] ${rounded}`,
        button: `px-2.5 min-w-[3.25rem] pb-2 pt-0 h-[3.25rem] shadow-[inset_0_-0.5rem_0_#00000022] active:mt-2 active:pb-0 active:h-[2.75rem] ${rounded}`,
        icon: "2rem",
      };
    }
  }
}
