import { useQuery } from "@tanstack/react-query";
import { homeDashboardApi } from "../services/home.service";
import { mapPhaseSummaryToDistribution } from "../mappers/phase.mapper";

export function usePhaseSummaryQuery() {
  return useQuery({
    queryKey: ["home", "phase-summary"],
    queryFn: homeDashboardApi.getPhaseSummary,
    select: mapPhaseSummaryToDistribution,
    staleTime: 1000 * 60,
  });
}
