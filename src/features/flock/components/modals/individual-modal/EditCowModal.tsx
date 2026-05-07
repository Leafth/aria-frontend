import { Button, InputField, Modal } from "@/shared";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  editCowSchema,
  type EditCowFormData,
} from "../../../schemas/editCow.schema";

import type { EditCowModalProps } from "./types/cow.types";
import { useUpdateCowForm } from "../../../hooks/useUpdateCow";
import { maskEarTag } from "@/utils/masks";

export function EditCowModal({
  open,
  onClose,
  cowId,
  initialData,
}: EditCowModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditCowFormData>({
    resolver: zodResolver(editCowSchema),
    defaultValues: {
      name: "",
      code: "",
      birthDate: "",
      breed: "",
    },
  });

  const { onSubmit, isPending } = useUpdateCowForm({
    id: cowId,
    reset,
    onClose,
  });

  useEffect(() => {
    if (open && initialData) {
      reset(initialData);
    }
  }, [open, initialData, reset]);

  return (
    <Modal
      className="max-w-2xl"
      open={open}
      onClose={() => {
        reset(initialData ?? undefined);
        onClose();
      }}
      title="Editar Dados do Animal"
      footerContent={
        <Button
          className="w-full"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting || isPending}
        >
          {isSubmitting || isPending ? "Salvando..." : "Editar"}
        </Button>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="flex justify-center items-center text-sm h-5 w-5 bg-black rounded-full text-white">
            1
          </span>
          <label>Identificação*</label>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <InputField
            label="Número do Brinco"
            placeholder="ex: 044"
            inputMode="numeric"
            {...register("code", {
              onChange: (e) => {
                e.target.value = maskEarTag(e.target.value);
              },
            })}
            onBeforeInput={(e) => {
              const inputEvent = e.nativeEvent as InputEvent;

              if (inputEvent.data && !/^\d+$/.test(inputEvent.data)) {
                e.preventDefault();
              }
            }}
            error={errors.code?.message}
          />

          <InputField
            label="Nome"
            placeholder="ex: Princesa"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="flex justify-center items-center text-sm h-5 w-5 bg-black rounded-full text-white">
            2
          </span>
          <label>Dados Básicos*</label>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <InputField
            label="Data Nascimento"
            type="date"
            {...register("birthDate")}
            error={errors.birthDate?.message}
          />

          <InputField
            label="Raça"
            placeholder="ex: Holandesa"
            {...register("breed")}
            error={errors.breed?.message}
          />
        </div>
      </div>
    </Modal>
  );
}
