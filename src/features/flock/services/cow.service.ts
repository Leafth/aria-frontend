import { api } from "@/lib/api";

import type {
  Cow,
  CreateCowDTO,
  UpdateCowDTO,
  CowFilters,
  PaginatedCowsResponse,
  InactivateCowDTO,
  RegisterCowWeightDTO,
} from "../types/cow.types";

export async function getCows(params?: CowFilters) {
  const response = await api.get<PaginatedCowsResponse>("/cows", {
    params,
  });

  return response.data;
}

export async function getCowById(id: string) {
  const response = await api.get<Cow>(`/cows/${id}`);

  return response.data;
}

export async function createCow(data: CreateCowDTO) {
  const response = await api.post<Cow>("/cows", {
    cow: data,
  });

  return response.data;
}

export async function updateCow(id: string, data: UpdateCowDTO) {
  const response = await api.patch<Cow>(`/cows/${id}`, {
    cow: data,
  });

  return response.data;
}

export async function deleteCow(id: string) {
  await api.delete(`/cows/${id}`);
}

export async function inactivateCow(id: string, data: InactivateCowDTO) {
  const response = await api.post(`/cows/${id}/events`, {
    event: {
      event_type: "inactivation",
      data,
    },
  });

  return response.data;
}

export async function registerCowWeight(
  id: string,
  data: RegisterCowWeightDTO,
) {
  const response = await api.post(`/cows/${id}/events`, {
    event: {
      event_type: "weighing",
      occurred_at: data.occurred_at,
      data: {
        weight: data.weight,
      },
    },
  });

  return response.data;
}
