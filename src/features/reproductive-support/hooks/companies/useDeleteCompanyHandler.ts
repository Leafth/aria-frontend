import { useState } from "react";

import type { CompanyDTO } from "@/features/reproductive-support/types";
import { useDeleteCompany } from "./useDeleteCompany";

export function useDeleteCompanyHandler() {
  const [selected, setSelected] = useState<CompanyDTO | null>(null);
  const { mutateAsync } = useDeleteCompany();

  const handleDeleteClick = (company: CompanyDTO) => {
    setSelected(company);
  };

  const handleConfirmDelete = async () => {
    if (!selected) return;

    try {
      await mutateAsync(selected.id);
    } finally {
      setSelected(null);
    }
  };

  return {
    selected,
    setSelected,
    handleDeleteClick,
    handleConfirmDelete,
  };
}
