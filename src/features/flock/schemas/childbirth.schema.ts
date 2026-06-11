import { z } from "zod";

export const childbirthFormSchema = z.object({
  action: z.enum(["calving", "pregnancy_interruption"]),
  occurredAt: z.string().min(1, "Informe a data e horário"),
  observation: z.string().optional(),
});

export type ChildbirthFormData = z.infer<typeof childbirthFormSchema>;