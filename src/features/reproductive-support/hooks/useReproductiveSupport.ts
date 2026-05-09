import type { PaginationState } from "@tanstack/react-table";
import { useCompanies } from "@/features/reproductive-support/hooks/companies";
import { useBulls } from "@/features/reproductive-support/hooks/bulls";

export function useReproductiveSupport(
  type: "bull" | "company",
  pagination: PaginationState,
  search?: string,
) {
  const filters = {
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    q: search || undefined,
  };

  const companies = useCompanies(filters, {
    enabled: type === "company",
  });

  const bulls = useBulls(filters, {
    enabled: type === "bull",
  });

  const currentQuery = type === "company" ? companies : bulls;

  const data =
    type === "company"
      ? (companies.data?.data ?? [])
      : (bulls.data?.data ?? []);

  const pageCount =
    type === "company"
      ? (companies.data?.meta?.total_pages ?? 0)
      : (bulls.data?.meta?.total_pages ?? 0);

  return {
    data,
    pageCount,
    isLoading: currentQuery.isLoading,
    isError: currentQuery.isError,
  };
}
