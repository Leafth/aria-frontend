import type { ButtonProps } from "./Button.types";
import { baseStyles, variants, sizes } from "./Button.styles";

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  loading,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        icon && <span>{icon}</span>
      )}
      {children}
    </button>
  );
}
