// components/ModalForm.tsx
import { Button, InputField, Modal } from "../../../shared";
import { useCreateCompany } from "../hooks/useCreateCompany";
import { useUpdateCompany } from "../hooks/useUpdateCompany";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { companySchema, type CompanyFormData } from "../schemas/company.schema";

interface Props {
  open: boolean;
  onClose: () => void;
  type: "bull" | "company";
  initialData?: (CompanyFormData & { id?: number }) | null;
}

export function ModalForm({ open, onClose, type, initialData }: Props) {
  const isCompany = type === "company";
  const isEditing = !!initialData;

  const { mutateAsync: createFn, isPending: creating } =
    useCreateCompany(onClose);

  const { mutateAsync: updateFn, isPending: updating } =
    useUpdateCompany(onClose);

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
  }, [initialData]);

  const onSubmit = async (data: CompanyFormData) => {
    if (!isCompany) return;

    if (isEditing && initialData?.id) {
      await updateFn({ id: initialData.id, data });
    } else {
      await createFn(data);
    }

    reset();
  };

  const isPending = creating || updating;

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
          {isPending ? "Salvando..." : "Salvar"}
        </Button>
      }
    >
      {isCompany && (
        <>
          <InputField
            label="Nome da Empresa*"
            placeholder="ex: Taurus"
            {...register("name")}
            error={errors.name?.message}
          />
          <InputField
            label="Descrição"
            placeholder="ex: Empresa de Santa Catarina"
            {...register("description")}
            error={errors.description?.message}
          />
        </>
      )}
    </Modal>
  );
}
