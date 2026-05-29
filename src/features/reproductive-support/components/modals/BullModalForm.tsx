import { Button, Modal } from "../../../../shared";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCompanies } from "../../hooks/companies/useCompanies";
import { bullSchema, type BullFormData } from "../../schemas/bull.schema";
import { useSaveBull } from "../../hooks/bulls/useSaveBull";
import { useEffect } from "react";
import type { BullDTO } from "../../types";
import { CircleX } from "lucide-react";
import { ToggleField } from "@/shared/components/ui/toggle/ToggleField";
import { maskEarTag } from "@/utils/masks";
import { InputField } from "@/shared";
import { Combobox } from "@/shared/components/ui/combobox";
import { useBreeds } from "../../hooks/useBreed";

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
      name: "",
      breed: {
        breed_id: undefined,
        breed_name: "",
      },
      origin: "local",
      ear_tag: "",
      company_id: "",
    },
  });

  const { save, isPending } = useSaveBull(onClose);

  const origin = useWatch({
    control,
    name: "origin",
  });

  const { data: breeds = [] } = useBreeds();

  const { data: companiesResponse } = useCompanies(
    { page: 1, per_page: 100 },
    { enabled: origin === "company" },
  );

  const companies = companiesResponse?.data ?? [];

  const onSubmit = async (data: BullFormData) => {
    await save(data, initialData?.id);

    reset({
      name: "",
      breed: {
        breed_id: undefined,
        breed_name: "",
      },
      origin: "local",
      ear_tag: "",
      company_id: "",
    });
  };

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        breed: {
          breed_id: initialData.breed?.id ?? initialData.breed_id,
          breed_name: initialData.breed?.name ?? initialData.breed_name ?? "",
        },
        origin: initialData.origin,
        ear_tag: initialData.ear_tag ?? "",
        company_id: initialData.company_id?.toString() ?? "",
      });

      return;
    }

    reset({
      name: "",
      breed: {
        breed_id: undefined,
        breed_name: "",
      },
      origin: "local",
      ear_tag: "",
      company_id: "",
    });
  }, [initialData, reset]);

  return (
    <Modal
      open={open}
      onClose={() => {
        reset({
          name: "",
          breed: {
            breed_id: undefined,
            breed_name: "",
          },
          origin: "local",
          ear_tag: "",
          company_id: "",
        });
        onClose();
      }}
      title={initialData ? "Editar Touro" : "Cadastrar Touro"}
      footerContent={
        <Button
          className="w-full"
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? "Salvando..." : initialData ? "Editar" : "Cadastrar"}
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
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

        <Controller
          name="breed"
          control={control}
          render={({ field }) => (
            <Combobox
            label="Raça*"
              placeholder="Digite a raça"
              options={breeds}
              value={field.value}
              onChange={field.onChange}
              error={errors.breed?.message}
            />
          )}
        />

        {origin === "local" && (
          <InputField
            label="Número do Brinco*"
            inputMode="numeric"
            placeholder="ex: 001"
            {...register("ear_tag", {
              onChange: (e) => {
                e.target.value = maskEarTag(e.target.value);
              },
            })}
            onBeforeInput={(e) => {
              const inputEvent = e.nativeEvent as InputEvent;

              if (inputEvent.data && !/^\d+$/.test(inputEvent.data)) {
                e.preventDefault();
              }
            }}
            error={errors.ear_tag?.message}
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
      </div>
    </Modal>
  );
}
