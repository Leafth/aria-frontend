import { useInfiniteQuery } from "@tanstack/react-query";
import { getCowHistory } from "../services/cow.service";
import type { CowHistoryFilters } from "../types/cow.types";

export function useInfiniteCowHistory(
  cowId: string,
  filters?: CowHistoryFilters,
) {
  return useInfiniteQuery({
    queryKey: ["cow-history", cowId, filters],

    queryFn: ({ pageParam = 1 }) =>
      getCowHistory(cowId, {
        ...filters,
        page: pageParam,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => lastPage.meta.next_page,
  });
}
