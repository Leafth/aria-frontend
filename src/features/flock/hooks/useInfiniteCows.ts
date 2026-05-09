import { useInfiniteQuery } from "@tanstack/react-query";

import { getCows } from "../services/cow.service";
import type { CowFilters } from "../types/cow.types";

export function useInfiniteCows(params?: Omit<CowFilters, "page">) {
  return useInfiniteQuery({
    queryKey: ["cows", "infinite", params],

    queryFn: ({ pageParam = 1 }) =>
      getCows({
        ...params,
        page: pageParam,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      return lastPage.meta.next_page ?? undefined;
    },
  });
}
