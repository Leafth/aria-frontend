import { Button, InputField, Modal } from "@/shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const editWeightSchema = z.object({
  weight: z
    .string()
    .min(1, "Peso é obrigatório")
    .refine((value) => !isNaN(Number(value)), {
      message: "Peso deve ser um número",
    })
    .refine((value) => Number(value) > 0, {
      message: "Peso deve ser maior que zero",
    }),
  occurred_at: z.string().min(1, "Data é obrigatória"),
});

export type EditWeightFormData = z.infer<typeof editWeightSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EditWeightFormData) => void | Promise<void>;
  isLoading?: boolean;
}

export function EditWeightModal({
  open,
  onClose,
  onSubmit,
  isLoading = false,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditWeightFormData>({
    resolver: zodResolver(editWeightSchema),
    defaultValues: {
      weight: "",
      occurred_at: "",
    },
  });

  const handleFormSubmit = async (data: EditWeightFormData) => {
    await onSubmit(data);

    reset();
    onClose();
  };

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
          onClick={handleSubmit(handleFormSubmit)}
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? "Salvando..." : "Salvar Peso"}
        </Button>
      }
    >
      <div className="flex flex-col gap-5">
        <InputField
          label="Peso"
          type="number"
          placeholder="ex: 180"
          {...register("weight")}
          error={errors.weight?.message}
        />

        <InputField
          label="Data da Pesagem"
          type="date"
          {...register("occurred_at")}
          error={errors.occurred_at?.message}
        />
      </div>
    </Modal>
  );
}
