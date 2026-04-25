import { Button } from "@/components/ui/button";
import { Modal } from "@/shared/components/ui/modal";

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
      title="Confirmar exclusão"
      footerContent={
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} className="cursor-pointer">
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="cursor-pointer">
            Excluir
          </Button>
        </div>
      }
    >
      <p>
        Tem certeza que deseja excluir{" "}
        <strong>{itemName ?? "este item"}</strong>?
      </p>
    </Modal>
  );
}
