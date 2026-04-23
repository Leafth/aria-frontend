import { Button, InputField, Modal } from "../../../shared";
import { useCreateCompany } from "../hooks/useCreateCompany";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema, type CompanyFormData } from "../schemas/company.schema";

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  type: "bull" | "company";
}

export function ModalForm({ open, onClose, type }: ModalFormProps) {
  const isCompany = type === "company";

  const { mutateAsync, isPending } = useCreateCompany(onClose);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  const onSubmit = async (data: CompanyFormData) => {
    if (!isCompany) return;

    await mutateAsync(data);
    reset();
  };

  const title = isCompany ? "Cadastrar Empresa" : "Cadastrar Touro";
  const buttonLabel = isCompany ? "Cadastrar Empresa" : "Cadastrar Touro";

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title={title}
      footerContent={
        <Button
          className="w-full"
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? "Salvando..." : buttonLabel}
        </Button>
      }
    >
      {isCompany ? (
        <>
          <InputField
            label="Nome da Empresa*"
            placeholder="ex: Strong Taurus"
            {...register("name")}
            error={errors.name?.message}
          />

          <InputField
            label="Descrição"
            placeholder="ex: Empresa da Santa Catarina"
            {...register("description")}
            error={errors.description?.message}
          />
        </>
      ) : (
        <>
          <InputField label="Número do Brinco*" />
          <InputField label="Nome do Touro*" />
          <InputField label="Raça*" />
        </>
      )}
    </Modal>
  );
}
