import { z } from "zod";
import { getTodayDateString } from "@/utils/getTodayDateString";

export const editWeightSchema = z.object({
  weight: z
    .string()
    .min(1, "Peso é obrigatório")
    .refine((value) => !isNaN(Number(value)), {
      message: "Peso deve ser um número",
    })
    .refine((value) => Number(value) > 0, {
      message: "Peso deve ser maior que zero",
    }),
  occurred_at: z
    .string()
    .min(1, "Data é obrigatória")
    .refine((value) => value <= getTodayDateString(), {
      message: "A data da pesagem não pode ser futura",
    }),
});

export type EditWeightFormData = z.infer<typeof editWeightSchema>;