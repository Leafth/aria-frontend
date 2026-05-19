import { z } from "zod";

export const coverageFormSchema = z.object({
  occurredAt: z.string().min(1, "Informe a data e horário da cobertura"),

  method: z.enum(["natural_mating", "artificial_insemination"], {
    message: "Informe o tipo de cobertura",
  }),

  bullId: z.string().min(1, "Informe o reprodutor"),
});

export type CoverageFormData = z.infer<typeof coverageFormSchema>;
