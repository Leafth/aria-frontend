import { Button, InputField, Modal } from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectField } from "@/shared/components/ui/select/SelectField";
import { Controller, useForm, useWatch } from "react-hook-form";

import { AdditionalInformation } from "./additional_information/AdditionalInformation";

import {
  createCowSchema,
  type CreateCowFormData,
} from "../../schemas/createCow.schema";

import type { ModalFormProps } from "./types/modal-form.types";
import { useCreateCowForm } from "../../hooks/useCreateCow";
import { maskEarTag, maskWeight } from "@/utils/masks";
import { Combobox } from "@/shared/components/ui/combobox";
import { useBreeds } from "@/features/reproductive-support/hooks/useBreed";

export function ModalForm({ open, onClose }: ModalFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    setValue,
    setError,
  } = useForm<CreateCowFormData>({
    resolver: zodResolver(createCowSchema),
    defaultValues: {
      name: "",
      code: "",
      birthDate: "",
      breed: {
        breed_id: undefined,
        breed_name: "",
      },
      initialWeight: "",
      phase: "",
      stage: "",
    },
  });

  const { onSubmit, isPending } = useCreateCowForm({
    setError,
    reset,
    onClose,
  });

  const phase = useWatch({
    control,
    name: "phase",
  });

  const stage = useWatch({
    control,
    name: "stage",
  });

  const { data: breeds = [] } = useBreeds();

  function handleClose() {
    reset({
      name: "",
      code: "",
      birthDate: "",
      breed: {
        breed_id: undefined,
        breed_name: "",
      },
      initialWeight: "",
      phase: "",
      stage: "",
    });

    onClose();
  }

  return (
    <Modal
      className="max-w-2xl"
      open={open}
      onClose={handleClose}
      title="Cadastrar Matriz"
      footerContent={
        <Button
          className="w-full"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting || isPending}
        >
          {isSubmitting || isPending ? "Cadastrando..." : "Cadastrar"}
        </Button>
      }
    >
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-sm text-white">
              1
            </span>
            <label>Identificação*</label>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-sm text-white">
              2
            </span>
            <label>Dados Básicos*</label>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

            <InputField
              label="Peso Inicial (kg)"
              placeholder="ex: 120"
              inputMode="decimal"
              {...register("initialWeight", {
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
              error={errors.initialWeight?.message}
            />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-sm text-white">
              3
            </span>
            <label>Fase e Etapa da Matriz</label>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <SelectField
              label="Fase da Matriz"
              value={phase}
              onChange={(value) =>
                setValue("phase", value, { shouldValidate: true })
              }
              error={errors.phase?.message}
              options={[
                { label: "Bezerra", value: "calf" },
                { label: "Garrota", value: "heifer" },
                { label: "Novilha", value: "young" },
                { label: "Primípara", value: "primiparous" },
                { label: "Multípara", value: "multiparous" },
              ]}
            />

            <SelectField
              label="Etapa da Matriz"
              value={stage}
              onChange={(value) => setValue("stage", value)}
              options={[
                { label: "Padrão", value: "padrao" },
                { label: "Registrar Cio", value: "cio_registrado" },
                { label: "Registrar Cobertura", value: "cobertura_registrada" },
                { label: "Confirmar Prenhez", value: "prenhez" },
                { label: "Registrar Parto", value: "parto_registrado" },
              ]}
            />
          </div>
        </section>

        <AdditionalInformation stage={stage} />
      </div>
    </Modal>
  );
}
