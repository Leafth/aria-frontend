import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Insira seu email para entrar"),

  password: z
    .string()
    .min(1, "Insira sua senha para entrar"),
});

export type LoginSchemaData = z.infer<typeof loginSchema>;