import { useState } from "react";
import type { BullDTO } from "../../types/reproductive-support.types";
import { useDeleteBull } from "./useDeleteBull";

export function useDeleteBullHandler() {
  const [selected, setSelected] = useState<BullDTO | null>(null);
  const { mutateAsync } = useDeleteBull();

  const handleDeleteClick = (bull: BullDTO) => {
    setSelected(bull);
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
