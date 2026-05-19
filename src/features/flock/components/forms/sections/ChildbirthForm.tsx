import { Button, InputField } from "@/shared";
import { TextareaField } from "@/shared/components/ui/textarea/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRegisterCowEvent } from "../../../hooks/useRegisterCowEvent";
import {
  childbirthFormSchema,
  type ChildbirthFormData,
} from "../../../schemas/childbirth.schema";
import { childbirthFormToPayload } from "../../../sections/childbirth.mapper";
import { getCurrentDateTimeLocal } from "@/utils/dateTime";

interface ChildbirthFormProps {
  cowId: string;
}

export function ChildbirthForm({ cowId }: ChildbirthFormProps) {
  const form = useForm<ChildbirthFormData>({
    resolver: zodResolver(childbirthFormSchema),
    defaultValues: {
      occurredAt: getCurrentDateTimeLocal(),
      observation: "",
    },
  });

  const { mutateAsync, isPending } = useRegisterCowEvent();

  async function onSubmit(data: ChildbirthFormData) {
    try {
      const payload = childbirthFormToPayload(data);

      await mutateAsync({
        cowId,
        data: payload,
      });

      toast.success("Parto registrado com sucesso.");

      form.reset({
        occurredAt: getCurrentDateTimeLocal(),
        observation: "",
      });
    } catch {
      toast.error("Não foi possível registrar o parto.");
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <div>
        <h1 className="font-medium text-xl">Registrar Parto</h1>
        <p className="text-gray-500 text-sm">
          Registrar os dados do parto realizado.
        </p>
      </div>

      <InputField
        label="Data e horário do parto*"
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
            placeholder="Adicione informações relevantes sobre o parto..."
            value={field.value ?? ""}
            onChange={field.onChange}
            error={form.formState.errors.observation?.message}
          />
        )}
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Salvando..." : "Confirmar Parto"}
      </Button>
    </form>
  );
}
