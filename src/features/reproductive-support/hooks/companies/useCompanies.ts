import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../../services/company.service";

export function useCompanies(
  params: { page: number; per_page: number; q?: string },
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["companies", params],
    queryFn: () => getCompanies(params),
    enabled: options?.enabled,
  });
}