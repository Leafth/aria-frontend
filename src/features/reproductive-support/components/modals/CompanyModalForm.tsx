import { Button, InputField, Modal } from "@/shared";
import { useSaveCompany } from "@/features/reproductive-support/hooks/companies";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  companySchema,
  type CompanyFormData,
} from "@/features/reproductive-support/schemas";

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: (CompanyFormData & { id?: number }) | null;
}

export function CompanyModalForm({ open, onClose, initialData }: Props) {
  const isEditing = !!initialData;

  const { save, isPending } = useSaveCompany(onClose);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  useEffect(() => {
    if (initialData) reset(initialData);
    else reset();
  }, [initialData, reset]);

  const onSubmit = async (data: CompanyFormData) => {
    await save(data, initialData?.id);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title={isEditing ? "Editar Empresa" : "Cadastrar Empresa"}
      footerContent={
        <Button
          className="w-full"
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isEditing ? "Editar" : "Cadastrar"}
        </Button>
      }
    >
      <InputField
        label="Nome da Empresa*"
        placeholder="ex: Taurus"
        {...register("name")}
        error={errors.name?.message}
        disabled={isPending}
      />

      <InputField
        label="Descrição"
        placeholder="ex: Empresa de Santa Catarina"
        {...register("description")}
        error={errors.description?.message}
        disabled={isPending}
      />
    </Modal>
  );
}
