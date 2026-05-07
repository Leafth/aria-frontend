import { Button, InputField, Modal } from "@/shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SelectField } from "@/shared/components/ui/select/SelectField";
import { AdditionalInformation } from "./additional_information/AdditionalInformation";
import { useCreateCow } from "../../hooks/useCreateCow";
import type { CowPhase } from "../../types/cow.types";
import { AxiosError } from "axios";
import {
  createCowSchema,
  type CreateCowFormData,
} from "../../schemas/createCow.schema";
import type {
  ApiErrorResponse,
  ModalFormProps,
} from "./types/modal-form.types";

export function ModalForm({ open, onClose }: ModalFormProps) {
  const { mutateAsync: createCow } = useCreateCow();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    setError,
  } = useForm<CreateCowFormData>({
    resolver: zodResolver(createCowSchema),
    defaultValues: {
      name: "",
      code: "",
      birthDate: "",
      breed: "",
      initialWeight: "",
      phase: "",
      stage: "",
    },
  });

  const stage = watch("stage");

  const onSubmit = async (data: CreateCowFormData) => {
    try {
      await createCow({
        name: data.name,
        ear_tag: data.code,
        birth_date: data.birthDate,
        breed: data.breed,
        weight: Number(data.initialWeight),
        phase: data.phase as CowPhase,
        active: true,
      });

      reset();
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      if (axiosError.response?.status === 422) {
        const apiErrors = axiosError.response.data.errors;

        if (apiErrors?.ear_tag) {
          setError("code", {
            type: "server",
            message: "Já existe um animal cadastrado com esse brinco",
          });

          return;
        }
      }

      console.error(error);
    }
  };

  return (
    <Modal
      className="max-w-2xl"
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title={"Cadastrar Animal"}
      footerContent={
        <Button
          className="w-full"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          Cadastrar
        </Button>
      }
    >
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
          {...register("code")}
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

        <InputField
          label="Peso Inicial (kg)"
          placeholder="ex: 120"
          {...register("initialWeight")}
          error={errors.initialWeight?.message}
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="flex justify-center items-center text-sm h-5 w-5 bg-black rounded-full text-white">
          3
        </span>
        <label>Fase e Etapa do Animal</label>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <SelectField
          label="Fase do Animal"
          value={watch("phase")}
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
          label="Etapa do Animal"
          options={[
            { label: "Padrão", value: "padrao" },
            { label: "Cio registrado", value: "cio_registrado" },
            { label: "Cobertura registrada", value: "cobertura_registrada" },
            { label: "Em Confirmar Cobertura", value: "confirmar_cobertura" },
            { label: "Confirmar Prenhez", value: "prenhez" },
            { label: "Parto registrado", value: "parto_registrado" },
          ]}
          value={watch("stage")}
          onChange={(value) => setValue("stage", value)}
        />
      </div>

      <AdditionalInformation stage={stage} />
    </Modal>
  );
}
