import { z } from "zod";
import { getTodayDateString } from "@/utils/getTodayDateString";

export const createCowSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),

  code: z.string().min(1, "Código é obrigatório"),

  birthDate: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .refine((value) => value <= getTodayDateString(), {
      message: "A data de nascimento não pode ser futura",
    }),

  breed: z.string().min(1, "Raça é obrigatória"),

  initialWeight: z
    .string()
    .min(1, "Peso inicial é obrigatório")
    .refine((val) => !isNaN(Number(val)), {
      message: "Peso deve ser um número",
    })
    .refine((val) => Number(val) > 0, {
      message: "Peso deve ser maior que zero",
    }),

  phase: z.string().min(1, "Fase é obrigatória"),

  stage: z.string().optional(),
});

export type CreateCowFormData = z.infer<typeof createCowSchema>;
