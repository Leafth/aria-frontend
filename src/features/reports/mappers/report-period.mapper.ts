import type { ReportPeriod } from "../components/period-filter/types";

type ReportPeriodApi = "week" | "month" | "year";

const REPORT_PERIOD_API_BY_VIEW: Record<
  Exclude<ReportPeriod, "all">,
  ReportPeriodApi
> = {
  "7d": "week",

  "30d": "month",

  "1y": "year",
};

export function mapReportPeriodToParams(period: ReportPeriod) {
  if (period === "all") {
    return {};
  }

  return {
    period: REPORT_PERIOD_API_BY_VIEW[period],
  };
}
