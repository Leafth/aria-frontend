import { z } from "zod";
import { getTodayDateString } from "@/utils/getTodayDateString";

export const editCowSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),

  code: z.string().min(1, "Número do brinco é obrigatório"),

  birthDate: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .refine((value) => value <= getTodayDateString(), {
      message: "A data de nascimento não pode ser futura",
    }),

  breed: z
    .object({
      breed_id: z.string().optional(),
      breed_name: z.string().optional(),
    })
    .refine((value) => value.breed_id || value.breed_name?.trim(), {
      message: "Raça é obrigatória",
    }),
});

export type EditCowFormData = z.infer<typeof editCowSchema>;
