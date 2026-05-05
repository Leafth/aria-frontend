import { AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/shared/components/ui/button";
import { Modal } from "@/shared/components/ui/modal";
import { ToggleField } from "@/shared/components/ui/toggle/ToggleField";
import { TextareaField } from "@/shared/components/ui/textarea/Textarea";

const inactiveCowSchema = z.object({
  reason: z.enum(["sale", "death"]),
  observation: z.string().optional(),
});

export type InactiveCowFormData = z.infer<typeof inactiveCowSchema>;

interface InactiveCowModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: InactiveCowFormData) => void | Promise<void>;
  isLoading?: boolean;
}

export function InactiveCowModal({
  open,
  onClose,
  onConfirm,
  isLoading = false,
}: InactiveCowModalProps) {
  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<InactiveCowFormData>({
    resolver: zodResolver(inactiveCowSchema),
    defaultValues: {
      reason: "sale",
      observation: "",
    },
  });

  const reason = watch("reason");
  const observation = watch("observation") ?? "";

  const handleClose = () => {
    reset({
      reason: "sale",
      observation: "",
    });

    onClose();
  };

  const handleFormSubmit = async (data: InactiveCowFormData) => {
    await onConfirm({
      reason: data.reason,
      observation: data.observation?.trim() || undefined,
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
          onClick={handleSubmit(handleFormSubmit)}
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? "Inativando..." : "Inativar"}
        </Button>
      }
    >
      <div className="flex flex-col gap-6">
        <ToggleField
          label="Motivo"
          value={reason}
          onChange={(value) =>
            setValue("reason", value as "sale" | "death", {
              shouldValidate: true,
            })
          }
          options={[
            { label: "Venda", value: "sale" },
            { label: "Morte", value: "death" },
          ]}
        />

        <TextareaField
          label="Observações (opcional)"
          placeholder="Adicione informações adicionais"
          maxLength={200}
          value={observation}
          onChange={(value) =>
            setValue("observation", value, {
              shouldValidate: true,
            })
          }
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
