import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../services";
import { mapReproductiveSummaryToInfoCards } from "../mappers";

export function useReproductiveSummaryQuery() {
  return useQuery({
    queryKey: ["home", "reproductive-summary"],
    queryFn: homeApi.getReproductiveSummary,
    select: mapReproductiveSummaryToInfoCards,
  });
}
