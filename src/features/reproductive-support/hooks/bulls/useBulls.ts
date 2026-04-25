import { useQuery } from "@tanstack/react-query";
import { getBulls } from "@/features/reproductive-support/services";
import type { BullParams } from "@/features/reproductive-support/types";

export function useBulls(params: BullParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["bulls", params],
    queryFn: () => getBulls(params),
    enabled: options?.enabled,
  });
}
