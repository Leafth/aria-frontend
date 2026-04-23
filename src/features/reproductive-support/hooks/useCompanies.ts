import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../services/company.service";

export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
}
