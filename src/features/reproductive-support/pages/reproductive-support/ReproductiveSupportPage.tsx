import { InvoicesTable } from "@/shared/components/ui/invoices-table";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button, Header } from "../../../../shared";
import { bullColumns } from "../../components/columns/bull-columns";
import { getCompanyColumns } from "../../components/columns/company-columns";
import { ModalForm } from "../../components/ModalForm";
import { ConfirmDeleteModal } from "../../components/ConfirmDeleteModal";
import { useBulls } from "../../hooks/useBulls";
import { useCompanies } from "../../hooks/useCompanies";
import type { CompanyDTO } from "../../types/reproductive-support.types";
import { useDeleteCompany } from "../../hooks/useDeleteCompany";

export default function ReproductiveSupportPage() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"bull" | "company">("bull");

  const [selectedCompany, setSelectedCompany] = useState<CompanyDTO | null>(
    null,
  );

  const [editingCompany, setEditingCompany] = useState<CompanyDTO | null>(null);

  const { mutateAsync: deleteCompanyFn } = useDeleteCompany();

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

  const tableData =
    type === "company"
      ? (companiesResponse?.data ?? [])
      : (bullsResponse?.data ?? []);

  const pageCount =
    type === "company"
      ? (companiesResponse?.meta?.total_pages ?? 0)
      : (bullsResponse?.meta?.total_pages ?? 0);

  const handleDeleteClick = (company: CompanyDTO) => {
    setSelectedCompany(company);
  };

  const handleEditClick = (company: CompanyDTO) => {
    setEditingCompany(company);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCompany) return;

    try {
      await deleteCompanyFn(selectedCompany.id);
      setSelectedCompany(null);
    } catch (err) {
      console.error(err);
    }
  };

  const columns =
    type === "company"
      ? getCompanyColumns(handleDeleteClick, handleEditClick)
      : bullColumns;

  return (
    <div className="flex flex-col gap-6 p-4 w-full">
      <Header
        title="Apoio Reprodutivo"
        description="Touros e empresas fornecedoras de sêmen"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setType("bull")}
            className={`px-3 py-1.5 rounded-lg cursor-pointer text-sm ${
              type === "bull" ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            Touro
          </button>

          <button
            onClick={() => setType("company")}
            className={`px-3 py-1.5 rounded-lg cursor-pointer text-sm ${
              type === "company" ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            Empresa
          </button>
        </div>

        <Button
          className="flex items-center gap-2 w-full sm:w-auto"
          onClick={() => {
            setEditingCompany(null);
            setOpen(true);
          }}
        >
          <Plus size={16} />
          {type === "bull" ? "Cadastrar Touro" : "Cadastrar Empresa"}
        </Button>
      </div>

      {open && (
        <ModalForm
          open={open}
          onClose={() => {
            setOpen(false);
            setEditingCompany(null);
          }}
          type={type}
          initialData={editingCompany}
        />
      )}

      <InvoicesTable
        data={tableData}
        columns={columns as ColumnDef<any>[]}
        pageCount={pageCount}
        pagination={pagination}
        onPaginationChange={setPagination}
        searchColumn="name"
      />

      <ConfirmDeleteModal
        open={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
        onConfirm={handleConfirmDelete}
        itemName={selectedCompany?.name}
      />
    </div>
  );
}
