import type { ToastContentProps } from "./ToastContent.types";
import { container, description, variantStyles } from "./ToastContent.styles";

export function ToastContent({
  title,
  description: desc,
  variant = "success",
}: ToastContentProps) {
  return (
    <div className={container}>
      <span className={`font-semibold ${variantStyles[variant]}`}>{title}</span>

      {desc && <span className={description}>{desc}</span>}
    </div>
  );
}
