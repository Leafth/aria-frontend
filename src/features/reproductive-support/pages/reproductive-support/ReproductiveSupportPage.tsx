import { InvoicesTable } from "@/shared/components/ui/invoices-table";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button, Header } from "@/shared";
import {
  getBullColumns,
  getCompanyColumns,
} from "@/features/reproductive-support/components/columns";
import {
  ConfirmDeleteModal,
  RenderModal,
} from "@/features/reproductive-support/components/modals";
import {
  useReproductiveSupport,
  useDeleteCompanyHandler,
} from "@/features/reproductive-support/hooks";
import type { CompanyDTO } from "@/features/reproductive-support/types";
import { useDeleteBullHandler } from "@/features/reproductive-support/hooks/bulls/useDeleteBullHandler";
import type { BullDTO } from "@/features/reproductive-support/types";

export default function ReproductiveSupportPage() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"bull" | "company">("bull");
  const [editingCompany, setEditingCompany] = useState<CompanyDTO | null>(null);
  const [editingBull, setEditingBull] = useState<BullDTO | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, pageCount } = useReproductiveSupport(type, pagination);

  const { selected, setSelected, handleDeleteClick, handleConfirmDelete } =
    useDeleteCompanyHandler();

  const {
    selected: selectedBull,
    setSelected: setSelectedBull,
    handleDeleteClick: handleDeleteBullClick,
    handleConfirmDelete: handleConfirmDeleteBull,
  } = useDeleteBullHandler();

  const handleEditClick = (item: CompanyDTO | BullDTO) => {
    if (type === "company") {
      setEditingCompany(item as CompanyDTO);
    } else {
      setEditingBull(item as BullDTO);
    }

    setOpen(true);
  };

  const columns =
    type === "company"
      ? getCompanyColumns(handleDeleteClick, handleEditClick)
      : getBullColumns(handleDeleteBullClick, handleEditClick);

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
            className={`px-3 py-1.5 rounded-lg text-sm cursor-pointer ${
              type === "bull" ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            Touro
          </button>

          <button
            onClick={() => setType("company")}
            className={`px-3 py-1.5 rounded-lg text-sm cursor-pointer ${
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
          setEditingBull(null);
        }}
        editingCompany={editingCompany}
        editingBull={editingBull}
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
        open={type === "company" ? !!selected : !!selectedBull}
        onClose={() =>
          type === "company" ? setSelected(null) : setSelectedBull(null)
        }
        onConfirm={
          type === "company" ? handleConfirmDelete : handleConfirmDeleteBull
        }
        itemName={type === "company" ? selected?.name : selectedBull?.name}
      />
    </div>
  );
}
