import type { BullFormData } from "../../schemas/bull.schema";
import { useCreateBull } from "./useCreateBull";
import { useUpdateBull } from "./useUpdateBull";
import type { CreateBullDTO } from "../../types";

export function useSaveBull(onClose?: () => void) {
  const create = useCreateBull(onClose);
  const update = useUpdateBull(onClose);

  const save = async (data: BullFormData, id?: string) => {
    const breedPayload = data.breed.breed_id
      ? {
          breed_id: data.breed.breed_id,
          breed_name: undefined,
        }
      : {
          breed_id: undefined,
          breed_name: data.breed.breed_name?.trim(),
        };

    const payload: CreateBullDTO =
      data.origin === "local"
        ? {
            name: data.name,
            origin: "local",
            ear_tag: data.ear_tag ?? null,
            company_id: null,
            ...breedPayload,
          }
        : {
            name: data.name,
            origin: "company",
            company_id: data.company_id ?? null,
            ear_tag: null,
            ...breedPayload,
          };

    if (id) return update.mutateAsync({ id, data: payload });

    return create.mutateAsync(payload);
  };

  return {
    save,
    isPending: create.isPending || update.isPending,
  };
}
