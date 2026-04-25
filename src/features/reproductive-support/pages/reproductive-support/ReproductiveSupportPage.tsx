import { InvoicesTable } from "@/shared/components/ui/invoices-table";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button, Header } from "../../../../shared";
import { bullColumns } from "../../components/columns/bull-columns";
import { getCompanyColumns } from "../../components/columns/company-columns";
import { ConfirmDeleteModal } from "../../components/modals/ConfirmDeleteModal";
import { RenderModal } from "../../components/modals/RenderModal";
import { useReproductiveSupport } from "../../hooks/useReproductiveSupport";
import { useDeleteCompanyHandler } from "../../hooks/companies/useDeleteCompanyHandler";
import type { CompanyDTO } from "../../types/reproductive-support.types";

export default function ReproductiveSupportPage() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"bull" | "company">("bull");
  const [editingCompany, setEditingCompany] = useState<CompanyDTO | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, pageCount } = useReproductiveSupport(type, pagination);

  const { selected, setSelected, handleDeleteClick, handleConfirmDelete } =
    useDeleteCompanyHandler();

  const handleEditClick = (company: CompanyDTO) => {
    setEditingCompany(company);
    setOpen(true);
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
            className={`px-3 py-1.5 rounded-lg text-sm ${
              type === "bull" ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            Touro
          </button>

          <button
            onClick={() => setType("company")}
            className={`px-3 py-1.5 rounded-lg text-sm ${
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

      <RenderModal
        type={type}
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingCompany(null);
        }}
        editingCompany={editingCompany}
      />

      <InvoicesTable
        data={data}
        columns={columns as ColumnDef<any>[]}
        pageCount={pageCount}
        pagination={pagination}
        onPaginationChange={setPagination}
        searchColumn={type === "bull" ? "breed" : "name"}
      />

      <ConfirmDeleteModal
        open={!!selected}
        onClose={() => setSelected(null)}
        onConfirm={handleConfirmDelete}
        itemName={selected?.name}
      />
    </div>
  );
}
