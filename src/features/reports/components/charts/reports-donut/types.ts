export interface DonutChartSlice {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface DonutChartLegendItem {
  id: string;
  label: string;
  color: string;
  value?: string | number;
  description?: string;
  subDescription?: string;
}

export interface DonutChartOption {
  value: string;
  label: string;
  centerValue: string | number;
  centerLabel: string;
  legendTitle: string;
  legendSubtitle?: string;
  slices: DonutChartSlice[];
  legendItems: DonutChartLegendItem[];
}
