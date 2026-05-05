import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Modal } from "@/shared/components/ui/modal";
import { ToggleField } from "@/shared/components/ui/toggle/ToggleField";
import { TextareaField } from "@/shared/components/ui/textarea/Textarea";

type InactiveReason = "sale" | "death";

interface InactiveCowModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: {
    reason: InactiveReason;
    observation?: string;
  }) => void | Promise<void>;
}

export function InactiveCowModal({
  open,
  onClose,
  onConfirm,
}: InactiveCowModalProps) {
  const [reason, setReason] = useState<InactiveReason>("sale");
  const [observation, setObservation] = useState("");

  const handleClose = () => {
    setReason("sale");
    setObservation("");
    onClose();
  };

  const handleConfirm = async () => {
    await onConfirm({
      reason,
      observation: observation.trim() || undefined,
    });

    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Inativar Animal"
      className="max-w-xl"
      footerContent={
        <Button
          variant="danger"
          className="w-full h-14 rounded-2xl"
          onClick={handleConfirm}
        >
          Inativar
        </Button>
      }
    >
      <div className="flex flex-col gap-6">
        <ToggleField
          label="Motivo"
          value={reason}
          onChange={(value) => setReason(value as InactiveReason)}
          options={[
            { label: "Venda", value: "sale" },
            { label: "Morte", value: "death" },
          ]}
        />

        <TextareaField
          label="Observações (opcional)"
          placeholder="Adicione informações adicionais"
          maxLength={200}
          onChange={(e) => setObservation(e.target.value)}
        />

        <div className="flex items-center gap-3 rounded-lg bg-orange-100 text-orange-700 p-4">
          <AlertTriangle size={22} />

          <p className="text-sm">
            Atenção: Tem certeza que deseja inativar o animal? Essa ação é
            irreversível.
          </p>
        </div>
      </div>
    </Modal>
  );
}
