import type { AlertViewItem, AlertApi } from "../types";

const ALERT_LEVEL_STYLES = {
  warning: {
    bgColorClass: "bg-yellow-100",
    borderColorClass: "border-yellow-500",
    iconColorClass: "text-yellow-600",
  },
  danger: {
    bgColorClass: "bg-red-100",
    borderColorClass: "border-red-500",
    iconColorClass: "text-red-600",
  },
} as const;

export function mapAlertsToView(alerts: AlertApi[]): AlertViewItem[] {
  return alerts.map((alert) => {
    const styles = ALERT_LEVEL_STYLES[alert.level];

    return {
      id: `${alert.code}-${alert.cow_id}`,
      title: alert.message,
      cowId: alert.cow_id,
      cowName: alert.cow_name,
      earTag: alert.ear_tag,
      bgColorClass: styles.bgColorClass,
      borderColorClass: styles.borderColorClass,
      iconColorClass: styles.iconColorClass,
    };
  });
}
