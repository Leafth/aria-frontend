import type { ReportPeriod } from "../components/period-filter/types";

export interface GetReproductiveIndicatorsParams {
  period: ReportPeriod;
}

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

export interface ReportFunnelApi {
  heat_detection: number;
  insemination: number;
  pregnancy_check: number;
  calving: number;
  pregnancy_interruption: number;
  total: number;
  pregnancy_check_positive: number;
  pregnancy_check_negative: number;
}

export interface ReportRatesEvolutionApi {
  month: string;
  insemination_success: number;
  heat_coverage: number;
  pregnancy_success: number;
}

export type ReportRatesEvolutionResponseApi = ReportRatesEvolutionApi[];
