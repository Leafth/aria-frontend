import type { ReactNode } from "react";

type AlertLevel = "info" | "warning" | "danger";

interface AlertInfoProps {
  children: ReactNode;
  level?: AlertLevel;
}

const alertStyles: Record<AlertLevel, string> = {
  info: "bg-blue-100 text-blue-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger: "bg-red-100 text-red-700",
};

export function AlertInfo({ children, level = "warning" }: AlertInfoProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg p-4 text-sm ${alertStyles[level]}`}
    >
      {children}
    </div>
  );
}
