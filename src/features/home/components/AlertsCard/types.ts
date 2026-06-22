import type { AlertViewItem } from "../../types";

export interface AlertsCardProps {
  data: AlertViewItem[];
}

export interface AlertItemProps {
  title: string;
  bgColorClass: string;
  borderColorClass: string;
  iconColorClass: string;
  onGoToCowRecord: () => void;
}