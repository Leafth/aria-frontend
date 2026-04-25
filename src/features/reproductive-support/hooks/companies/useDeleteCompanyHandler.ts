import { useState } from "react";
import type { CompanyDTO } from "../../types/reproductive-support.types";
import { useDeleteCompany } from "./useDeleteCompany";

export function useDeleteCompanyHandler() {
  const [selected, setSelected] = useState<CompanyDTO | null>(null);
  const { mutateAsync } = useDeleteCompany();

  const handleDeleteClick = (company: CompanyDTO) => {
    setSelected(company);
  };

  const handleConfirmDelete = async () => {
    if (!selected) return;

    await mutateAsync(selected.id);
    setSelected(null);
  };

  return {
    selected,
    setSelected,
    handleDeleteClick,
    handleConfirmDelete,
  };
}
