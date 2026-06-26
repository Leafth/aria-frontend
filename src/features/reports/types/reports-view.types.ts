import type { DonutChartOption } from "../components/charts/reports-donut/types";

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

export interface FunnelItem {
  label: string;
  value: number;
  barWidth: string;
  color: string;
}

export interface RatesEvolutionChartItem {
  month: string;
  inseminacao: number;
  cobertura: number;
  prenhez: number;
}

export interface ReportIndicatorsView {
  table: ReportIndicatorRow[];
  successRateOptions: DonutChartOption[];
}
