import { Button, InputField, Modal } from "@/shared";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCowSchema,type EditCowFormData,} from "../../../schemas/editCow.schema";
interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: EditCowFormData | null;
  onSubmit?: (data: EditCowFormData) => void | Promise<void>;
}

export function EditCowModal({ open, onClose, initialData, onSubmit }: Props) {
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

  useEffect(() => {
    if (open && initialData) {
      reset(initialData);
    }
  }, [open, initialData, reset]);

  const handleFormSubmit = async (data: EditCowFormData) => {
    await onSubmit?.(data);

    reset();
    onClose();
  };

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
          onClick={handleSubmit(handleFormSubmit)}
          disabled={isSubmitting}
        >
          Salvar Alterações
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
        </div>
      </div>
    </Modal>
  );
}
