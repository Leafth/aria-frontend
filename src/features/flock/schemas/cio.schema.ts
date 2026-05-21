import { z } from "zod";

const MAX_COVERAGE_INTERVAL_IN_HOURS = 24;
const HOUR_IN_MS = 60 * 60 * 1000;

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
    if (data.hasCoverage !== "yes_coverage") return;

    if (!data.inseminationOccurredAt) {
      ctx.addIssue({
        code: "custom",
        path: ["inseminationOccurredAt"],
        message: "Informe a data e horário da cobertura",
      });

      return;
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

    const heatDate = new Date(data.heatOccurredAt);
    const coverageDate = new Date(data.inseminationOccurredAt);

    if (Number.isNaN(heatDate.getTime())) {
      ctx.addIssue({
        code: "custom",
        path: ["heatOccurredAt"],
        message: "Data e horário do cio inválidos",
      });

      return;
    }

    if (Number.isNaN(coverageDate.getTime())) {
      ctx.addIssue({
        code: "custom",
        path: ["inseminationOccurredAt"],
        message: "Data e horário da cobertura inválidos",
      });

      return;
    }

    if (coverageDate <= heatDate) {
      ctx.addIssue({
        code: "custom",
        path: ["inseminationOccurredAt"],
        message: "A cobertura deve ocorrer depois do cio",
      });

      return;
    }

    const differenceInMs = coverageDate.getTime() - heatDate.getTime();
    const maxDifferenceInMs = MAX_COVERAGE_INTERVAL_IN_HOURS * HOUR_IN_MS;

    if (differenceInMs > maxDifferenceInMs) {
      ctx.addIssue({
        code: "custom",
        path: ["inseminationOccurredAt"],
        message: "A cobertura deve ocorrer em até 24 horas após o cio",
      });
    }
  });

export type CioFormData = z.infer<typeof cioFormSchema>;
