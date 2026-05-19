import { Button, InputField } from "@/shared";
import { ToggleField } from "@/shared/components/ui/toggle/ToggleField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRegisterCowEvent } from "../../../hooks/useRegisterCowEvent";
import {
  pregnancyFormSchema,
  type PregnancyFormData,
} from "../../../schemas/pregnancy.schema";
import { pregnancyFormToPayload } from "../../../sections/pregnancy.mapper";
import { getCurrentDateTimeLocal } from "@/utils/dateTime";

interface PregnancyFormProps {
  cowId: string;
}

export function PregnancyForm({ cowId }: PregnancyFormProps) {
  const form = useForm<PregnancyFormData>({
    resolver: zodResolver(pregnancyFormSchema),
    defaultValues: {
      occurredAt: getCurrentDateTimeLocal(),
      result: "positive",
    },
  });

  const { mutateAsync, isPending } = useRegisterCowEvent();

  async function onSubmit(data: PregnancyFormData) {
    try {
      const payload = pregnancyFormToPayload(data);

      await mutateAsync({
        cowId,
        data: payload,
      });

      toast.success(
        data.result === "positive"
          ? "Prenhez confirmada com sucesso."
          : "Prenhez negada com sucesso.",
      );

      form.reset({
        occurredAt: getCurrentDateTimeLocal(),
        result: "positive",
      });
    } catch {
      toast.error("Não foi possível registrar o exame de prenhez.");
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <div>
        <h1 className="font-medium text-xl">Confirmar Prenhez</h1>
        <p className="text-gray-500 text-sm">
          Registrar resultado de prenhez via ultrassom.
        </p>
      </div>

      <InputField
        label="Data e horário do exame*"
        type="datetime-local"
        {...form.register("occurredAt")}
        error={form.formState.errors.occurredAt?.message}
      />

      <Controller
        control={form.control}
        name="result"
        render={({ field }) => (
          <ToggleField
            label="Resultado do exame"
            value={field.value}
            onChange={field.onChange}
            options={[
              { label: "Positivo", value: "positive" },
              { label: "Negativo", value: "negative" },
            ]}
          />
        )}
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Salvando..." : "Confirmar Prenhez"}
      </Button>
    </form>
  );
}
