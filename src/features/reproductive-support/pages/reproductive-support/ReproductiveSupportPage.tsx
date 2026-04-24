import { InvoicesTable } from "@/shared/components/ui/invoices-table";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button, Header } from "../../../../shared";
import { bullColumns } from "../../components/columns/bull-columns";
import { companyColumns } from "../../components/columns/company-columns";
import { ModalForm } from "../../components/ModalForm";
import { useBulls } from "../../hooks/useBulls";
import { useCompanies } from "../../hooks/useCompanies";

export default function ReproductiveSupportPage() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"bull" | "company">("bull");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const filters = {
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  };

  const { data: companiesResponse } = useCompanies(filters, {
    enabled: type === "company",
  });

  const { data: bullsResponse } = useBulls(filters, {
    enabled: type === "bull",
  });

  const tableData = type === "company"
    ? (companiesResponse?.data ?? [])
    : (bullsResponse?.data ?? []);

  const pageCount = type === "company"
    ? (companiesResponse?.meta?.total_pages ?? 0)
    : (bullsResponse?.meta?.total_pages ?? 0);

  const columns = type === "company" ? companyColumns : bullColumns;

  return (
    <div className="flex flex-col gap-6 p-4 w-full">
      <Header
        title="Apoio Reprodutivo"
        description="Touros e empresas fornecedoras de sêmen"
      />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <span className="text-sm text-text-primary">Tipo:</span>

          <div className="flex gap-3">
            <button
              onClick={() => setType("bull")}
              className={`px-4 py-2 rounded-lg cursor-pointer text-sm ${
                type === "bull" ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              Touro
            </button>

            <button
              onClick={() => setType("company")}
              className={`px-4 py-2 rounded-lg text-sm cursor-pointer ${
                type === "company" ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              Empresa
            </button>
          </div>
        </div>
        <Button
          className="w-full flex items-center justify-center gap-2 lg:w-auto"
          onClick={() => setOpen(true)}
        >
          <Plus size={18} />
          {type === "bull" ? "Cadastrar Touro" : "Cadastrar Empresa"}
        </Button>
      </div>
      {open && (
        <ModalForm open={open} onClose={() => setOpen(false)} type={type} />
      )}

      <InvoicesTable
        data={tableData}
        columns={columns as ColumnDef<typeof tableData[0], any>[]}
        pageCount={pageCount}
        pagination={pagination}
        onPaginationChange={setPagination}
        searchColumn="name"
      />
    </div>
  );
}
