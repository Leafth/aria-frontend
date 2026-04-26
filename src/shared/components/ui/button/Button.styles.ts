import type { ButtonVariant, ButtonSize } from "./Button.types";

export const baseStyles =
  "flex items-center justify-center gap-2 transition-all rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

export const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-blue-900",
  danger: "bg-red text-white hover:bg-red-800",
  ghost: "bg-transparent border-1 border-black  hover:bg-gray-200",
};

export const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-3",
  lg: "px-5 py-3 text-lg",
};
