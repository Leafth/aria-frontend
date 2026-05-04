import { Button, InputField, Modal } from "@/shared";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { SelectField } from "@/shared/components/ui/select/SelectField";
import { AdditionalInformation } from "./additional_information/AdditionalInformation";

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

  stage: z.string().optional(),
});

type FlockFormData = z.infer<typeof flockSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: (FlockFormData & { id?: number }) | null;
}

export function ModalForm({ open, onClose, initialData }: Props) {
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<FlockFormData>({
    resolver: zodResolver(flockSchema),
  });

  useEffect(() => {
    if (initialData) reset(initialData);
    else reset();
  }, [initialData, reset]);

  const onSubmit = async (data: FlockFormData) => {
    console.log(data);
    onClose();
  };

  const stage = watch("stage");

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
          label="Nome"
          placeholder="ex: Princesa"
          {...register("name")}
          error={errors.name?.message}
        />

        <InputField
          label="Código"
          placeholder="ex: BR-044"
          {...register("code")}
          error={errors.code?.message}
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
          options={[
            { label: "Bezerra", value: "bezerra" },
            { label: "Garrota", value: "garrota" },
            { label: "Novilha", value: "novilha" },
            { label: "Primípara", value: "primípara" },
            { label: "Multiparta", value: "Multiparta" },
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
