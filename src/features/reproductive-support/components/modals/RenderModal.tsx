import type { BullDTO, CompanyDTO } from "@/features/reproductive-support/types";
import { CompanyModalForm } from "./CompanyModalForm";
import { BullModalForm } from "./BullModalForm";

type ModalType = "bull" | "company";

interface RenderModalProps {
  type: ModalType;
  open: boolean;
  onClose: () => void;
  editingCompany: CompanyDTO | null;
  editingBull: BullDTO | null;
}

export function RenderModal({
  type,
  open,
  onClose,
  editingCompany,
  editingBull,
}: RenderModalProps) {
  if (!open) return null;

  if (type === "company") {
    return (
      <CompanyModalForm
        open={open}
        onClose={onClose}
        initialData={editingCompany}
      />
    );
  }

  return (
    <BullModalForm open={open} onClose={onClose} initialData={editingBull} />
  );
}
