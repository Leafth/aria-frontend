import { Button } from "@/shared/components/ui/button";
import { Modal } from "@/shared/components/ui/modal";
import { ArrowRight } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  fromPhase: string;
  toPhase: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ChangeCowPhaseModal({
  open,
  onClose,
  fromPhase,
  toPhase,
  onConfirm,
  isLoading = false,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Mudar Fase"
      footerContent={
        <div className="flex flex-col justify-end gap-2">
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Alterando..." : "Sim, desejo mudar"}
          </Button>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
        </div>
      }
    >
      <div className="flex flex-col justify-center items-center gap-6 my-6">
        <p className="text-center text-gray-700">
          Tem certeza que mudar a fase da vaca?
        </p>

        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-gray-800">{fromPhase}</span>
          <ArrowRight size={24} className="text-gray-500" />
          <span className="text-2xl font-bold text-gray-800">{toPhase}</span>
        </div>
      </div>
    </Modal>
  );
}
