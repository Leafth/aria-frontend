import { Button, InputField, Modal } from "@/shared";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  editCowSchema,
  type EditCowFormData,
} from "../../../schemas/editCow.schema";

import type { EditCowModalProps } from "./types/cow.types";
import { useUpdateCowForm } from "../../../hooks/useUpdateCow";
import { maskEarTag } from "@/utils/masks";
import { Combobox } from "@/shared/components/ui/combobox";
import { useBreeds } from "@/features/reproductive-support/hooks/useBreed";

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
    control,
  } = useForm<EditCowFormData>({
    resolver: zodResolver(editCowSchema),
    defaultValues: {
      name: "",
      code: "",
      birthDate: "",
      breed: {
        breed_id: undefined,
        breed_name: "",
      },
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

  const { data: breeds = [] } = useBreeds();

  return (
    <Modal
      className="max-w-2xl"
      open={open}
      onClose={() => {
        reset(initialData ?? undefined);
        onClose();
      }}
      title="Editar Dados da Matriz"
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

          <Controller
            name="breed"
            control={control}
            render={({ field }) => (
              <Combobox
              label="Raça"
                placeholder="Digite a raça"
                options={breeds}
                value={field.value}
                onChange={field.onChange}
                error={errors.breed?.message}
              />
            )}
          />
        </div>
      </div>
    </Modal>
  );
}
