import { api } from "@/lib/api";
import type { PaginatedResponse } from "../types/paginated";
import type { BullDTO, BullParams } from "../types/reproductive-support.types";

export async function getBulls(params: BullParams) {
  const res = await api.get<PaginatedResponse<BullDTO>>("/bulls", { params });
  return res.data;
}
