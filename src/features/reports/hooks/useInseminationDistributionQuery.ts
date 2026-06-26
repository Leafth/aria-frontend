import { useQuery } from "@tanstack/react-query";
import type { ReportPeriod } from "../components/period-filter/types";
import { reportsService } from "../services/reports.service";
import { mapInseminationDistributionToChartOptions } from "../mappers/insemination-distribution.mapper";

const SEARCH_DELAY_IN_MS = 800;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useInseminationDistributionQuery(period: ReportPeriod) {
  return useQuery({
    queryKey: ["reports", "insemination-distribution", period],
    queryFn: async () => {
      await wait(SEARCH_DELAY_IN_MS);

      return reportsService.getInseminationDistribution({ period });
    },
    select: mapInseminationDistributionToChartOptions,
    retry: false,
    staleTime: 0,
  });
}
