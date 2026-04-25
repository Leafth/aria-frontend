import { z } from "zod";

export const bullSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    breed: z.string().min(1, "Raça é obrigatória"),
    origin: z.enum(["local", "company"]),
    ear_tag: z.string().optional(),
    company_id: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.origin === "local") {
        return !!data.ear_tag;
      }
      return true;
    },
    {
      message: "Brinco é obrigatório para touros locais",
      path: ["ear_tag"],
    },
  )
  .refine(
    (data) => {
      if (data.origin === "company") {
        return !!data.company_id;
      }
      return true;
    },
    {
      message: "Empresa é obrigatória",
      path: ["company_id"],
    },
  );

export type BullFormData = z.infer<typeof bullSchema>;
