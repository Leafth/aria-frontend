import { Button, InputField } from "@/shared";
import { SelectField } from "@/shared/components/ui/select/SelectField";
import { ToggleField } from "@/shared/components/ui/toggle/ToggleField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useRegisterCowEvent } from "../../../hooks/useRegisterCowEvent";
import { cioFormSchema, type CioFormData } from "../../../schemas/cio.schema";
import { cioFormToPayload } from "../../../sections/cio.mapper";

import { useBulls } from "../../../../reproductive-support/hooks/bulls/useBulls";
import { bullToSelectOption } from "../../../sections/bull-select-option.mapper";
import { toast } from "sonner";
import {
  getCurrentDateTimeLocal,
  subtractHoursFromCurrentDateTimeLocal,
} from "@/utils/dateTime";

interface CioFormProps {
  cowId: string;
}

export function CioForm({ cowId }: CioFormProps) {

  const form = useForm<CioFormData>({
    resolver: zodResolver(cioFormSchema),
    defaultValues: {
      hasCoverage: "no_coverage",
      heatOccurredAt: subtractHoursFromCurrentDateTimeLocal(10),
      heatObservation: "",
      inseminationOccurredAt: getCurrentDateTimeLocal(),
      method: "artificial_insemination",
      bullId: "",
    },
  });

  const { mutateAsync, isPending } = useRegisterCowEvent();

  const hasCoverage = form.watch("hasCoverage") === "yes_coverage";
  const method = form.watch("method");

  const bullOrigin = method === "natural_mating" ? "local" : "company";

  const { data: bullsData, isLoading: isLoadingBulls } = useBulls({
    per_page: 100,
    origin: bullOrigin,
  });

  const bullOptions = bullsData?.data.map(bullToSelectOption) ?? [];

  async function onSubmit(data: CioFormData) {
    try {
      const payload = cioFormToPayload(data);

      console.log("FORM DATA:", data);
      console.log("PAYLOAD:", payload);

      await mutateAsync({
        cowId,
        data: payload,
      });

      toast.success(
        data.hasCoverage === "yes_coverage"
          ? "Cio e cobertura registrados com sucesso."
          : "Cio registrado com sucesso.",
      );

      form.reset();
    } catch (error) {
      console.error("ERRO AO REGISTRAR CIO:", error);

      toast.error(
        data.hasCoverage === "yes_coverage"
          ? "Não foi possível registrar o cio e a cobertura."
          : "Não foi possível registrar o cio.",
      );
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <div>
        <h1 className="font-medium text-xl">Registrar Cio</h1>
        <p className="text-gray-500 text-sm">
          Registre o cio da matriz e, se necessário, informe a cobertura.
        </p>
      </div>

      <Controller
        control={form.control}
        name="hasCoverage"
        render={({ field }) => (
          <ToggleField
            label="Cobertura"
            value={field.value}
            onChange={field.onChange}
            options={[
              { label: "Sem Cobertura", value: "no_coverage" },
              { label: "Com Cobertura", value: "yes_coverage" },
            ]}
          />
        )}
      />

      <InputField
        label="Data e horário do cio*"
        type="datetime-local"
        {...form.register("heatOccurredAt")}
        error={form.formState.errors.heatOccurredAt?.message}
      />

      {hasCoverage && (
        <>
          <InputField
            label="Data e horário da cobertura*"
            type="datetime-local"
            {...form.register("inseminationOccurredAt")}
            error={form.formState.errors.inseminationOccurredAt?.message}
          />

          <Controller
            control={form.control}
            name="method"
            render={({ field }) => (
              <ToggleField
                label="Tipo de Cobertura"
                value={field.value ?? "artificial_insemination"}
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
        </>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending
          ? "Salvando..."
          : hasCoverage
            ? "Confirmar Cio e Cobertura"
            : "Confirmar Cio"}
      </Button>
    </form>
  );
}
