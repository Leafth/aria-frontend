import { Button, InputField } from "@/shared";
import { SelectField } from "@/shared/components/ui/select/SelectField";
import { ToggleField } from "@/shared/components/ui/toggle/ToggleField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRegisterCowEvent } from "../../../hooks/useRegisterCowEvent";
import {
  coverageFormSchema,
  type CoverageFormData,
} from "../../../schemas/coverage.schema";
import { coverageFormToPayload } from "../../../sections/coverage.mapper";

import { useBulls } from "../../../../reproductive-support/hooks/bulls/useBulls";
import { bullToSelectOption } from "../../../sections/bull-select-option.mapper";
import { getCurrentDateTimeLocal } from "@/utils/dateTime";

interface CoverageFormProps {
  cowId: string;
}

export function CoverageForm({ cowId }: CoverageFormProps) {
  const form = useForm<CoverageFormData>({
    resolver: zodResolver(coverageFormSchema),
    defaultValues: {
      occurredAt: getCurrentDateTimeLocal(),
      method: "artificial_insemination",
      bullId: "",
    },
  });

  const { mutateAsync, isPending } = useRegisterCowEvent();

  const method = form.watch("method");

  const bullOrigin = method === "natural_mating" ? "local" : "company";

  const { data: bullsData, isLoading: isLoadingBulls } = useBulls({
    per_page: 100,
    origin: bullOrigin,
  });

  const bullOptions = bullsData?.data.map(bullToSelectOption) ?? [];

  async function onSubmit(data: CoverageFormData) {
    try {
      const payload = coverageFormToPayload(data);

      await mutateAsync({
        cowId,
        data: payload,
      });

      toast.success("Cobertura registrada com sucesso.");

      form.reset({
        occurredAt: getCurrentDateTimeLocal(),
        method: "artificial_insemination",
        bullId: "",
      });
    } catch {
      toast.error("Não foi possível registrar a cobertura.");
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <div>
        <h1 className="font-medium text-xl">Registro de Cobertura</h1>
        <p className="text-gray-500 text-sm">
          Registre a cobertura por monta natural ou inseminação artificial.
        </p>
      </div>

      <InputField
        label="Data e horário da cobertura*"
        type="datetime-local"
        {...form.register("occurredAt")}
        error={form.formState.errors.occurredAt?.message}
      />

      <Controller
        control={form.control}
        name="method"
        render={({ field }) => (
          <ToggleField
            label="Tipo de Cobertura"
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
              form.setValue("bullId", "");
            }}
            options={[
              { label: "Monta Natural", value: "natural_mating" },
              {
                label: "Inseminação Artificial",
                value: "artificial_insemination",
              },
            ]}
          />
        )}
      />

      <Controller
        control={form.control}
        name="bullId"
        render={({ field }) => (
          <SelectField
            label="Reprodutor"
            value={field.value}
            onChange={field.onChange}
            options={bullOptions}
            disabled={isLoadingBulls}
            error={form.formState.errors.bullId?.message}
          />
        )}
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Salvando..." : "Confirmar Cobertura"}
      </Button>
    </form>
  );
}
