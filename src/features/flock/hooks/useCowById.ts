import { useQuery } from "@tanstack/react-query";

import { getCowById } from "../services/cow.service";

export function useCowById(id?: string) {
  return useQuery({
    queryKey: ["cows", id],
    queryFn: () => getCowById(id as string),
    enabled: !!id,
  });
}
