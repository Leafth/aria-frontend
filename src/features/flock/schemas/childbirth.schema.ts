import { z } from "zod";

export const childbirthFormSchema = z.object({
  occurredAt: z.string().min(1, "Informe a data e horário do parto"),
  observation: z.string().optional(),
});

export type ChildbirthFormData = z.infer<typeof childbirthFormSchema>;
