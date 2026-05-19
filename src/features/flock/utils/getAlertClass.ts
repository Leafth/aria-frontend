type AlertLevel = "warning" | "danger";

export function getAlertClasses(level: AlertLevel) {
  const classes = {
    warning: "text-yellow-600",
    danger: "text-red-600",
  };

  return classes[level];
}
