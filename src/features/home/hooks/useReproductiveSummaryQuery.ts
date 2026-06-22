import { useQuery } from "@tanstack/react-query";
import { homeDashboardApi } from "../services/home.service";
import { mapReproductiveSummaryToInfoCards } from "../mappers/reproductive.mapper";

export function useReproductiveSummaryQuery() {
  return useQuery({
    queryKey: ["home", "reproductive-summary"],
    queryFn: homeDashboardApi.getReproductiveSummary,
    select: mapReproductiveSummaryToInfoCards,
    staleTime: 1000 * 60,
  });
}
