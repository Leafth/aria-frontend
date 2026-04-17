import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Insira seu email para entrar")
    .email("Informe um email válido"),

  password: z
    .string()
    .min(1, "Insira sua senha para entrar")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type LoginSchemaData = z.infer<typeof loginSchema>;