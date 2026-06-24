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
  variation: number;
}

export interface ReportsIndicatorsTableProps {
  data: ReportIndicatorRow[];
}
