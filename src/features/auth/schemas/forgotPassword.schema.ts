import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "O email é obrigatório")
    .email("Informe um email válido"),
});

export type ForgotPasswordSchemaData = z.infer<
  typeof forgotPasswordSchema
>;