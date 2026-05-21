import { useInfiniteQuery } from "@tanstack/react-query";
import { getCowHistory } from "../services/cow.service";
import type { CowHistoryFilters } from "../types/cow.types";

export function useInfiniteCowHistory(
  cowId?: string,
  params?: Omit<CowHistoryFilters, "page">,
) {
  return useInfiniteQuery({
    queryKey: ["cow-history", cowId, params],

    queryFn: ({ pageParam }) =>
      getCowHistory(cowId!, {
        ...params,
        page: pageParam,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => lastPage.meta.next_page,

    enabled: Boolean(cowId),
  });
}
