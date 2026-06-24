export type ReportIndicatorCode =
  | "insemination_success"
  | "heat_coverage"
  | "pregnancy_success";

export interface ReportIndicatorApi {
  indicator: ReportIndicatorCode | string;
  successes: number;
  failures: number;
  total: number;
  rate: number;
  variation: number | null;
}

export type ReportIndicatorsResponseApi = ReportIndicatorApi[];
