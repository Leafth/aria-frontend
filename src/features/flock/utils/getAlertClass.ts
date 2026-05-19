type AlertLevel = "info" | "warning" | "danger";

export function getAlertClasses(level: AlertLevel) {
  const classes = {
    info: "text-blue-400",
    warning: "text-yellow-400",
    danger: "text-red-500",
  };

  return classes[level];
}
