import { Button, InputField, Modal } from "@/shared";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

// depois você pode criar um schema de verdade
import { z } from "zod";

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
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      }
    >
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

      <InputField
        label="Raça*"
        placeholder="ex: Nelore"
        {...register("breed")}
        error={errors.breed?.message}
      />
    </Modal>
  );
}
