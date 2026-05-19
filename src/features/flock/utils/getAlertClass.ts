type AlertLevel = "warning" | "danger";

export function getAlertClasses(level: AlertLevel) {
  const classes = {
    warning: "text-yellow-400",
    danger: "text-red-500",
  };

  return classes[level];
}
