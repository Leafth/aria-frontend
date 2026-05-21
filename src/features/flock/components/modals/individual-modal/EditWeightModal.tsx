import { Button, InputField, Modal } from "@/shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  editWeightSchema,
  type EditWeightFormData,
} from "@/features/flock/schemas/editWeight.schema";

import type { EditWeightModalProps } from "./types/cow.types";
import { useRegisterCowWeightForm } from "@/features/flock/hooks/useRegisterCowWeight";
import { maskWeight } from "@/utils/masks";
import { getCurrentDateTimeLocal } from "@/utils/dateTime";

export function EditWeightModal({
  open,
  onClose,
  cowId,
}: EditWeightModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditWeightFormData>({
    resolver: zodResolver(editWeightSchema),
    defaultValues: {
      weight: "",
      occurred_at: getCurrentDateTimeLocal(),
    },
  });

  const { onSubmit, isPending } = useRegisterCowWeightForm({
    id: cowId,
    reset,
    onClose,
  });

  return (
    <Modal
      className="max-w-md"
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title="Registrar Peso"
      footerContent={
        <Button
          className="w-full"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting || isPending}
        >
          {isSubmitting || isPending ? "Salvando..." : "Salvar Peso"}
        </Button>
      }
    >
      <div className="flex flex-col gap-5">
        <InputField
          label="Peso"
          type="text"
          inputMode="decimal"
          placeholder="ex: 180"
          {...register("weight", {
            onChange: (e) => {
              e.target.value = maskWeight(e.target.value);
            },
          })}
          onBeforeInput={(e) => {
            const inputEvent = e.nativeEvent as InputEvent;

            if (inputEvent.data && !/^[0-9.,]+$/.test(inputEvent.data)) {
              e.preventDefault();
            }
          }}
          error={errors.weight?.message}
        />

        <InputField
          label="Data e horário da pesagem"
          type="datetime-local"
          {...register("occurred_at")}
          error={errors.occurred_at?.message}
        />
      </div>
    </Modal>
  );
}
