import { Button, InputField, Modal } from "@/shared";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { SelectField } from "@/shared/components/ui/select/SelectField";
import { AdditionalInformation } from "./additional_information/AdditionalInformation";
import { useCreateCow } from "../../hooks/useCreateCow";
import type { CowPhase } from "../../types/cow.types";
import { AxiosError } from "axios";

const flockSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  code: z.string().min(1, "Código é obrigatório"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  breed: z.string().min(1, "Raça é obrigatória"),
  initialWeight: z
    .string()
    .min(1, "Peso inicial é obrigatório")
    .refine((val) => !isNaN(Number(val)), {
      message: "Peso deve ser um número",
    }),
  phase: z.string().min(1, "Fase é obrigatória"),
  stage: z.string().optional(),
});

type FlockFormData = z.infer<typeof flockSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: (FlockFormData & { id?: number }) | null;
}

type ApiErrorResponse = {
  errors?: {
    ear_tag?: string[];
    name?: string[];
    birth_date?: string[];
    breed?: string[];
    weight?: string[];
    phase?: string[];
    active?: string[];
  };
};

export function ModalForm({ open, onClose, initialData }: Props) {
  const isEditing = !!initialData;

  const { mutateAsync: createCow } = useCreateCow();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    setError,
  } = useForm<FlockFormData>({
    resolver: zodResolver(flockSchema),
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

  useEffect(() => {
    if (initialData) reset(initialData);
    else reset();
  }, [initialData, reset]);

  const stage = watch("stage");

  const onSubmit = async (data: FlockFormData) => {
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
      title={isEditing ? "Editar Animal" : "Cadastrar Animal"}
      footerContent={
        <Button
          className="w-full"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isEditing ? "Editar" : "Cadastrar"}
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
          placeholder="ex: BR-044"
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
