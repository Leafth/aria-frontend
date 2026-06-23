import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../services";
import { mapPhaseSummaryToDistribution } from "../mappers";

export function usePhaseSummaryQuery() {
  return useQuery({
    queryKey: ["home", "phase-summary"],
    queryFn: homeApi.getPhaseSummary,
    select: mapPhaseSummaryToDistribution,
  });
}
