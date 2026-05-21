import { useQuery } from "@tanstack/react-query";
import { getCowHistory } from "../services/cow.service";
import type { CowHistoryFilters } from "../types/cow.types";

export function useCowHistory(cowId?: string, params?: CowHistoryFilters) {
  return useQuery({
    queryKey: ["cow-history", cowId, params],
    queryFn: () => getCowHistory(cowId!, params),
    enabled: Boolean(cowId),
  });
}
