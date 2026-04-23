import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
});

export type CompanyFormData = z.infer<typeof companySchema>;
