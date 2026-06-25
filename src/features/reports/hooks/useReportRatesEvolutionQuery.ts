import { useQuery } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";
import { mapReportRatesEvolution } from "../mappers/report-rates-evolution.mapper";


const SEARCH_DELAY_IN_MS = 800;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useReportRatesEvolutionQuery() {
  return useQuery({
    queryKey: ["reports", "reproductive-rates-evolution"],
    queryFn: async () => {
      await wait(SEARCH_DELAY_IN_MS);

      return reportsService.getReproductiveRatesEvolution();
    },
    select: mapReportRatesEvolution,
    retry: false,
    staleTime: 0,
  });
}
