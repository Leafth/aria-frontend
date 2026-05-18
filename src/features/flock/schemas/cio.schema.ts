import { z } from "zod";

export const cioFormSchema = z
  .object({
    hasCoverage: z.enum(["no_coverage", "yes_coverage"]),

    heatOccurredAt: z.string().min(1, "Informe a data e horário do cio"),

    heatObservation: z.string().optional(),

    inseminationOccurredAt: z.string().optional(),

    method: z.enum(["natural_mating", "artificial_insemination"]).optional(),

    bullId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasCoverage === "yes_coverage") {
      if (!data.inseminationOccurredAt) {
        ctx.addIssue({
          code: "custom",
          path: ["inseminationOccurredAt"],
          message: "Informe a data e horário da cobertura",
        });
      }

      if (!data.method) {
        ctx.addIssue({
          code: "custom",
          path: ["method"],
          message: "Informe o tipo de cobertura",
        });
      }

      if (!data.bullId) {
        ctx.addIssue({
          code: "custom",
          path: ["bullId"],
          message: "Informe o reprodutor",
        });
      }
    }
  });

export type CioFormData = z.infer<typeof cioFormSchema>;
