import { useQuery } from "@tanstack/react-query";
import { getBulls } from "../../services/bull.service";
import type { BullParams } from "../../types/reproductive-support.types";

export function useBulls(params: BullParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["bulls", params],
    queryFn: () => getBulls(params),
    enabled: options?.enabled,
  });
}
