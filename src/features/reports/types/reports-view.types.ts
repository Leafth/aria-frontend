export interface ReportTableMetric {
  value: number;
  label: string;
}

export interface ReportIndicatorRow {
  id: string;
  indicator: string;
  successes: ReportTableMetric;
  failures: ReportTableMetric;
  total: ReportTableMetric;
  rate: number;
  variation: number | null;
}

export interface SuccessPieOption {
  value: string;
  label: string;
  confirmedLabel: string;
  deniedLabel: string;
  confirmedValue: number;
  deniedValue: number;
}

export interface ReportIndicatorsView {
  table: ReportIndicatorRow[];
  pieOptions: SuccessPieOption[];
}
