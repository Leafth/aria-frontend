export interface InfoCardItem {
  id: string;
  value: number;
  title: string;
  description?: string;
}

export interface AlertViewItem {
  id: string;
  title: string;
  cowId: string;
  cowName: string;
  earTag: string;
  bgColorClass: string;
  borderColorClass: string;
  iconColorClass: string;
}

export interface PhaseDistributionItem {
  id: string;
  label: string;
  count: number;
  totalCows: number;
  value: number;
  color: string;
}

export interface LastEventItem {
  id: string;
  event: string;
  cow: string;
}