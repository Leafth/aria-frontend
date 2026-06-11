import { Button, InputField } from "@/shared";
import { TextareaField } from "@/shared/components/ui/textarea/Textarea";
import { ToggleField } from "@/shared/components/ui/toggle/ToggleField";
import { getCurrentDateTimeLocal } from "@/utils/dateTime";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRegisterCowEvent } from "../../../hooks/useRegisterCowEvent";
import {
  childbirthFormSchema,
  type ChildbirthFormData,
} from "../../../schemas/childbirth.schema";
import { childbirthFormToPayload } from "../../../sections/childbirth.mapper";

interface ChildbirthFormProps {
  cowId: string;
}

export function ChildbirthForm({ cowId }: ChildbirthFormProps) {
  const form = useForm<ChildbirthFormData>({
    resolver: zodResolver(childbirthFormSchema),
    defaultValues: {
      action: "calving",
      occurredAt: getCurrentDateTimeLocal(),
      observation: "",
    },
  });

  const { mutateAsync, isPending } = useRegisterCowEvent();

  const action = form.watch("action");

  const isCalving = action === "calving";

  async function onSubmit(data: ChildbirthFormData) {
    try {
      const payload = childbirthFormToPayload(data);

      await mutateAsync({
        cowId,
        data: payload,
      });

      toast.success(
        isCalving
          ? "Parto registrado com sucesso."
          : "Interrupção de prenhez registrada com sucesso.",
      );

      form.reset({
        action: "calving",
        occurredAt: getCurrentDateTimeLocal(),
        observation: "",
      });
    } catch {
      toast.error(
        isCalving
          ? "Não foi possível registrar o parto."
          : "Não foi possível registrar a interrupção de prenhez.",
      );
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <Controller
        control={form.control}
        name="action"
        render={({ field }) => (
          <ToggleField
            label="Tipo de registro"
            value={field.value}
            onChange={field.onChange}
            options={[
              { label: "Registrar parto", value: "calving" },
              {
                label: "Interromper prenhez",
                value: "pregnancy_interruption",
              },
            ]}
          />
        )}
      />

      <div>
        <h1 className="font-medium text-xl">
          {isCalving ? "Registrar Parto" : "Interromper Prenhez"}
        </h1>

        <p className="text-gray-500 text-sm">
          {isCalving
            ? "Registrar os dados do parto realizado."
            : "Registrar a interrupção da prenhez."}
        </p>
      </div>

      <InputField
        label={
          isCalving
            ? "Data e horário do parto*"
            : "Data e horário da interrupção*"
        }
        type="datetime-local"
        {...form.register("occurredAt")}
        error={form.formState.errors.occurredAt?.message}
      />

      <Controller
        control={form.control}
        name="observation"
        render={({ field }) => (
          <TextareaField
            label="Observações (opcional)"
            placeholder={
              isCalving
                ? "Adicione informações relevantes sobre o parto..."
                : "Adicione informações relevantes sobre a interrupção..."
            }
            value={field.value ?? ""}
            onChange={field.onChange}
            error={form.formState.errors.observation?.message}
          />
        )}
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending
          ? "Salvando..."
          : isCalving
            ? "Confirmar Parto"
            : "Confirmar Interrupção"}
      </Button>
    </form>
  );
}
