import { api } from "@/lib/api";
import type { CompanyDTO } from "../types/reproductive-support.types";

export async function getCompanies() {
  const response = await api.get("/companies");
  return response.data;
}

export async function createCompany(data: CompanyDTO) {
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
