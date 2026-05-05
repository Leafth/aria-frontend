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

  date: z.string().min(1, "Data é obrigatória"),
});

type EditWeightFormData = z.infer<typeof editWeightSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<EditWeightFormData> | null;
  onSubmit?: (data: EditWeightFormData) => void | Promise<void>;
}

export function EditWeightModal({
  open,
  onClose,
  initialData,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditWeightFormData>({
    resolver: zodResolver(editWeightSchema),
    defaultValues: {
      weight: initialData?.weight ?? "",
      date: initialData?.date ?? "",
    },
  });

  const handleFormSubmit = async (data: EditWeightFormData) => {
    await onSubmit?.(data);

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
          disabled={isSubmitting}
        >
          Cadastrar
        </Button>
      }
    >
      <div className="flex flex-col gap-5 mt-5">
        <InputField
          label="Peso (kg)"
          type="number"
          placeholder="ex: 120"
          {...register("weight")}
          error={errors.weight?.message}
        />

        <InputField
          label="Data da Pesagem"
          type="date"
          {...register("date")}
          error={errors.date?.message}
        />
      </div>
    </Modal>
  );
}
