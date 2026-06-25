import { useQuery } from "@tanstack/react-query";
import type { ReportPeriod } from "../components/period-filter/types";
import { reportsService } from "../services/reports.service";
import { mapReportIndicators } from "../mappers/report-indicators.mapper";

const SEARCH_DELAY_IN_MS = 800;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useReportIndicatorsQuery(period: ReportPeriod) {
  return useQuery({
    queryKey: ["reports", "reproductive-indicators", period],
    queryFn: async () => {
      await wait(SEARCH_DELAY_IN_MS);

      return reportsService.getReproductiveIndicators({ period });
    },
    select: mapReportIndicators,
    retry: false,
  });
}
