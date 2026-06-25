import type { ReportPeriod } from "../components/period-filter/types";

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export function mapReportPeriodToParams(period: ReportPeriod) {
  if (period === "all") {
    return {};
  }

  const endDate = new Date();
  const startDate = new Date();

  if (period === "7d") {
    startDate.setDate(endDate.getDate() - 7);
  }

  if (period === "30d") {
    startDate.setDate(endDate.getDate() - 30);
  }

  if (period === "1y") {
    startDate.setFullYear(endDate.getFullYear() - 1);
  }

  return {
    start_date: formatDate(startDate),
    end_date: formatDate(endDate),
  };
}
