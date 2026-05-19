import { z } from "zod";

export const pregnancyFormSchema = z.object({
  occurredAt: z.string().min(1, "Informe a data e horário do exame"),

  result: z.enum(["positive", "negative"], {
    message: "Informe o resultado do exame",
  }),
});

export type PregnancyFormData = z.infer<typeof pregnancyFormSchema>;
