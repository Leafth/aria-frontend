import type { PaginationState } from "@tanstack/react-table";
import { useCompanies } from "./companies/useCompanies";
import { useBulls } from "./bulls/useBulls";

export function useReproductiveSupport(
  type: "bull" | "company",
  pagination: PaginationState,
) {
  const filters = {
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  };

  const companies = useCompanies(filters, {
    enabled: type === "company",
  });

  const bulls = useBulls(filters, {
    enabled: type === "bull",
  });

  const data =
    type === "company"
      ? (companies.data?.data ?? [])
      : (bulls.data?.data ?? []);

  const pageCount =
    type === "company"
      ? (companies.data?.meta?.total_pages ?? 0)
      : (bulls.data?.meta?.total_pages ?? 0);

  return { data, pageCount };
}
