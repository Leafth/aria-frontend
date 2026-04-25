import { api } from "@/lib/api";
import type { CompanyDTO } from "../types/reproductive-support.types";
import type { PaginatedResponse } from "../types/paginated";

export async function getCompanies(params: {
  page?: number;
  per_page?: number;
  q?: string;
}) {
  const res = await api.get<PaginatedResponse<CompanyDTO>>("/companies", {
    params,
  });

  return res.data;
}

export async function createCompany(data: Omit<CompanyDTO, "id">) {
  const response = await api.post("/companies", {
    company: data,
  });
  return response.data;
}

export async function updateCompany(id: number, data: CompanyDTO) {
  const response = await api.put(`/companies/${id}`, {
    company: data,
  });
  return response.data;
}

export async function deleteCompany(id: number) {
  await api.delete(`/companies/${id}`);
}
