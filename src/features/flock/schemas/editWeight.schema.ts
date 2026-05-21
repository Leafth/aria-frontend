import { z } from "zod";

function isFutureDateTime(value: string) {
  if (!value) return false;

  const selectedDate = new Date(value);
  const now = new Date();

  return selectedDate.getTime() > now.getTime();
}

export const editWeightSchema = z.object({
  weight: z.string().min(1, "Peso é obrigatório"),

  occurred_at: z
    .string()
    .min(1, "Data e horário da pesagem são obrigatórios")
    .refine((value) => !isFutureDateTime(value), {
      message: "A data e horário da pesagem não podem ser futuros",
    }),
});

export type EditWeightFormData = z.infer<typeof editWeightSchema>;
