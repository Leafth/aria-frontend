import type { ReportPeriod } from "../components/period-filter/types";

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
export interface GetReproductiveIndicatorsParams {
  period: ReportPeriod;
}

export type ReportIndicatorsResponseApi = ReportIndicatorApi[];
