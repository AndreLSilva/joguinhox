import { MouseEventHandler, ReactNode, createElement } from "react";
import { IconComponent } from "./icons/icons.types";

interface ButtonProps {
  className?: string;
  size?: ButtonSize;
  circle?: boolean;
  color?: ButtonColor;

  disabled?: boolean;

  icon?: IconComponent;
  children?: ReactNode;

  onClick?: MouseEventHandler;
}

type ButtonSize = "md" | "lg";
type ButtonColor = "blue" | "red" | "green" | "yellow";

export function Button({
  className = "",
  size = "md",
  circle = false,
  color = "blue",
  disabled = false,
  icon = undefined,
  children = undefined,
  onClick = undefined,
}: ButtonProps) {
  const sizeStyle = getButtonSize(size, disabled, circle);
  const buttonColor = getButtonColor(color, disabled);

  return (
    <div
      className={`flex shrink-0 items-center justify-center bg-slate-100 ${sizeStyle.base} ${className}`}
    >
      <button
        className={`relative flex w-full items-center justify-center gap-2 text-center enabled:active:shadow-none ${buttonColor} ${
          sizeStyle.button
        } ${disabled ? "cursor-not-allowed" : ""}`}
        type="button"
        disabled={disabled}
        onClick={onClick}
      >
        {icon && createElement(icon, { height: sizeStyle.icon, width: sizeStyle.icon })}
        {children}
      </button>
    </div>
  );
}

function getButtonSize(size: ButtonSize, disabled: boolean, circle: boolean) {
  switch (size) {
    case "lg": {
      const rounded = circle ? "rounded-full" : "rounded-xl";
      return {
        base: `px-2 pt-0 pb-3 shadow-[inset_0_-0.25rem_0_#00000022] ${rounded}`,
        button: `px-2.5 min-w-[6.5rem] pt-0 ${
          disabled
            ? "h-[6rem] mt-2 pb-0"
            : "pb-2 h-[6.5rem] shadow-[inset_0_-0.5rem_0_#00000022] active:mt-2 active:pb-0 active:h-[6rem]"
        } ${rounded}`,
        icon: "3.5rem",
      };
    }
    case "md": {
      const rounded = circle ? "rounded-full" : "rounded-xl";
      return {
        base: `px-2 pt-0 pb-3 shadow-[inset_0_-0.25rem_0_#00000022] ${rounded}`,
        button: `px-2.5 min-w-[3.25rem] pb-2 pt-0 h-[3.25rem] shadow-[inset_0_-0.5rem_0_#00000022] ${
          disabled ? "" : "active:mt-2 active:pb-0 active:h-[2.75rem]"
        } ${rounded}`,
        icon: "2rem",
      };
    }
  }
}

function getButtonColor(color: ButtonColor, disabled: boolean) {
  switch (color) {
    case "blue":
      return `bg-blue-600 text-white ${disabled ? "brightness-75" : "hover:bg-blue-500"}`;
    case "red":
      return `bg-red-600 text-white ${disabled ? "brightness-75" : "hover:bg-red-500"}`;
    case "green":
      return `bg-green-600 text-white ${disabled ? "brightness-75" : "hover:bg-green-500"}`;
    case "yellow":
      return `bg-yellow-600 text-white ${disabled ? "brightness-75" : "hover:bg-yellow-500"}`;
  }
}
