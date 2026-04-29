import { Button, InputField, Modal } from "@/shared";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { SelectField } from "@/shared/components/ui/select/SelectField";

const flockSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  code: z.string().min(1, "Código é obrigatório"),
  breed: z.string().min(1, "Raça é obrigatória"),
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
          label="Nome*"
          placeholder="ex: Matuê"
          {...register("name")}
          error={errors.name?.message}
        />

        <InputField
          label="Código*"
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
          label="Raça*"
          placeholder="ex: Nelore"
          {...register("breed")}
          error={errors.breed?.message}
        />
        <InputField
          label="Raça*"
          placeholder="ex: Nelore"
          {...register("breed")}
          error={errors.breed?.message}
        />
        <InputField
          label="Raça*"
          placeholder="ex: Nelore"
          {...register("breed")}
          error={errors.breed?.message}
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
          label="Selecione a raça"
          options={[
            { label: "Nelore", value: "nelore" },
            { label: "Angus", value: "angus" },
          ]}
        />
        <SelectField
          label="Selecione a raça"
          options={[
            { label: "Nelore", value: "nelore" },
            { label: "Angus", value: "angus" },
          ]}
        />
      </div>
    </Modal>
  );
}
