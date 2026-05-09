import { InvoicesTable } from "@/shared/components/ui/invoices-table";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { CirclePlus, Search } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

export default function ReproductiveSupportPage() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"bull" | "company">("bull");
  const [editingCompany, setEditingCompany] = useState<CompanyDTO | null>(null);
  const [editingBull, setEditingBull] = useState<BullDTO | null>(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 600);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });

  const handleTypeChange = (newType: "bull" | "company") => {
    setType(newType);
    setSearch("");

    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);

    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  };

  const { data, pageCount, isLoading, isError } = useReproductiveSupport(
    type,
    pagination,
    debouncedSearch,
  );

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

  const handleOpenCreateModal = () => {
    setEditingCompany(null);
    setEditingBull(null);
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
        <div className="flex items-center gap-4">
          <p>Tipo:</p>

          <button
            onClick={() => handleTypeChange("bull")}
            className={`px-3 py-1.5 rounded-lg text-sm cursor-pointer ${
              type === "bull" ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            Touro
          </button>

          <button
            onClick={() => handleTypeChange("company")}
            className={`px-3 py-1.5 rounded-lg text-sm cursor-pointer ${
              type === "company" ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            Empresa
          </button>
        </div>

        <Button
          className="flex items-center gap-2 w-full sm:w-auto"
          onClick={handleOpenCreateModal}
        >
          <CirclePlus size={20} />
          {type === "bull" ? "Cadastrar Touro" : "Cadastrar Empresa"}
        </Button>
      </div>

      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

        <Input
          placeholder={
            type === "bull"
              ? "Buscar por nome, raça ou brinco..."
              : "Buscar por nome da empresa..."
          }
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading && (
        <p className="text-sm text-gray-500">Carregando registros...</p>
      )}

      {isError && (
        <p className="text-sm text-red-500">Erro ao carregar registros.</p>
      )}

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
