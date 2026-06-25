import { useQuery } from "@tanstack/react-query";
import type { ReportPeriod } from "../components/period-filter/types";
import { reportsService } from "../services/reports.service";
import { mapReportFunnel } from "../mappers/report-funnel.mapper";

const SEARCH_DELAY_IN_MS = 800;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useReportFunnelQuery(period: ReportPeriod) {
  return useQuery({
    queryKey: ["reports", "reproductive-funnel", period],
    queryFn: async () => {
      await wait(SEARCH_DELAY_IN_MS);

      return reportsService.getReproductiveFunnel({ period });
    },
    select: mapReportFunnel,
    retry: false,
    staleTime: 0,
  });
}
