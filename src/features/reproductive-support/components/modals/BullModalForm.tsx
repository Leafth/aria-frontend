import { Button, InputField, Modal } from "../../../../shared";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCompanies } from "../../hooks/companies/useCompanies";
import { bullSchema, type BullFormData } from "../../schemas/bull.schema";
import { useSaveBull } from "../../hooks/bulls/useSaveBull";
import { useEffect } from "react";
import type { BullDTO } from "../../types";
import { CircleX } from "lucide-react";
import { ToggleField } from "@/shared/components/ui/toggle/ToggleField";

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: BullDTO | null;
}

export function BullModalForm({ open, onClose, initialData }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<BullFormData>({
    resolver: zodResolver(bullSchema),
    defaultValues: {
      origin: "local",
    },
  });

  const { save } = useSaveBull(onClose);

  const origin = useWatch({
    control,
    name: "origin",
  });

  const { data: companiesResponse } = useCompanies(
    { page: 1, per_page: 100 },
    { enabled: origin === "company" },
  );

  const companies = companiesResponse?.data ?? [];

  const onSubmit = async (data: BullFormData) => {
    await save(data, initialData?.id);
    reset();
  };

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        breed: initialData.breed,
        origin: initialData.origin,
        ear_tag: initialData.ear_tag ?? undefined,
        company_id: initialData.company_id?.toString() ?? undefined,
      });
    } else {
      reset({
        origin: "local",
      });
    }
  }, [initialData, reset]);

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title={initialData ? "Editar Touro" : "Cadastrar Touro"}
      footerContent={
        <Button className="w-full" onClick={handleSubmit(onSubmit)}>
          {initialData ? "Editar" : "Cadastrar"}
        </Button>
      }
    >
      <ToggleField
        label="Origem:"
        value={origin}
        onChange={(val) => setValue("origin", val)}
        options={[
          { label: "Touro Próprio", value: "local" },
          { label: "Touro Empresa", value: "company" },
        ]}
      />
      <InputField
        label="Nome*"
        {...register("name")}
        error={errors.name?.message}
        placeholder="ex: Tauros"
      />
      <InputField
        label="Raça*"
        {...register("breed")}
        error={errors.breed?.message}
        placeholder="ex: Nelore"
      />
      {origin === "local" && (
        <InputField
          label="Brinco*"
          {...register("ear_tag")}
          error={errors.ear_tag?.message}
          placeholder="ex: #BRC-001"
        />
      )}
      {origin === "company" && (
        <div className="flex flex-col gap-1 relative">
          <label className="absolute left-4 top-2 text-xs pointer-events-none text-text-primary">
            Empresa*
          </label>

          <select
            {...register("company_id")}
            className="w-full pt-6 pb-1 px-3 rounded-lg border border-gray-400 bg-white text-sm outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-200"
          >
            <option value="">Selecione uma empresa</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>

          {errors.company_id && (
            <span className="flex items-center gap-1 text-red-500 text-xs font-medium">
              <CircleX className="w-5 h-5" />
              <p>{errors.company_id.message}</p>
            </span>
          )}
        </div>
      )}
    </Modal>
  );
}
