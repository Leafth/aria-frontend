import type { CompanyDTO } from "../../types/reproductive-support.types";
import { CompanyModalForm } from "./CompanyModalForm";

type ModalType = "bull" | "company";

interface RenderModalProps {
  type: ModalType;
  open: boolean;
  onClose: () => void;
  editingCompany: CompanyDTO | null;
}

export function RenderModal({ type, open, onClose, editingCompany }: RenderModalProps) {
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

  //return <BullModalForm open={open} onClose={onClose} />;
}
