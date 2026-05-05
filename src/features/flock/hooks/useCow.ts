import { useQuery } from "@tanstack/react-query";

import { getCows } from "../services/cow.service";
import type { CowFilters } from "../types/cow.types";

export function useCows(params?: CowFilters) {
  return useQuery({
    queryKey: ["cows", params],
    queryFn: () => getCows(params),
  });
}
