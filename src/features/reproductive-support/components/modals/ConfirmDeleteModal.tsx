import { Button } from "@/shared/components/ui/button";
import { Modal } from "@/shared/components/ui/modal";
import { Trash } from "lucide-react";

type ConfirmDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
};

export function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  itemName,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Excluir"
      footerContent={
        <div className="flex flex-col justify-end gap-2">
          <Button variant="danger" onClick={onConfirm}>
            Excluir
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      }
    >
      <div className="flex flex-col justify-center items-center gap-6 my-6">
        <div className="flex justify-center items-center rounded-full bg-red-50 h-15 w-15 text-red">
          <Trash />
        </div>
        <p className="text-center font-semibold text-gray-800">
          Tem certeza que deseja
          <br />
          excluir <strong>{itemName}</strong>?
        </p>
      </div>
    </Modal>
  );
}
