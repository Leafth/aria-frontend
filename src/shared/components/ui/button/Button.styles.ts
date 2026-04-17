import type { ButtonVariant, ButtonSize } from "./Button.types";

export const baseStyles =
  "flex items-center justify-center gap-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

export const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-blue-900",
  danger: "bg-red text-white hover:bg-red-600",
  ghost: "bg-transparent text-blue-600 hover:bg-blue-50",
};

export const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-3",
  lg: "px-5 py-3 text-lg",
};
