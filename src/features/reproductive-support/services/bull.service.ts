import { api } from "@/lib/api";
import type { PaginatedResponse } from "../types/paginated";
import type {
  BullDTO,
  BullParams,
  CreateBullDTO,
  UpdateBullDTO,
} from "../types/reproductive-support.types";

export async function getBulls(params: BullParams) {
  const res = await api.get<PaginatedResponse<BullDTO>>("/bulls", { params });
  return res.data;
}

export async function createBull(data: CreateBullDTO) {
  const response = await api.post("/bulls", { bull: data });
  return response.data;
}

export async function updateBull(id: string, data: UpdateBullDTO) {
  const response = await api.put(`/bulls/${id}`, { bull: data });
  return response.data;
}

export async function deleteBull(id: string) {
  await api.delete(`/bulls/${id}`);
}
