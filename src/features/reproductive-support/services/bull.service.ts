import { api } from "@/lib/api";
import type { PaginatedResponse } from "../types/paginated";
import type { BullDTO, BullParams } from "../types/reproductive-support.types";

export async function getBulls(params: BullParams) {
  const res = await api.get<PaginatedResponse<BullDTO>>("/bulls", { params });
  return res.data;
}

export async function createBull(data: Omit<BullDTO, "id" | "company">) {
  const response = await api.post("/bulls", { bull: data });
  return response.data;
}
