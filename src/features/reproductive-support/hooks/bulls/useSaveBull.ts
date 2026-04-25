import type { BullFormData } from "../../schemas/bull.schema";
import { useCreateBull } from "./useCreateBull";
import { useUpdateBull } from "./useUpdateBull";

export function useSaveBull(onClose?: () => void) {
  const create = useCreateBull(onClose);
  const update = useUpdateBull(onClose);

  const save = async (data: BullFormData, id?: number) => {
    const payload =
      data.origin === "local"
        ? {
            name: data.name,
            breed: data.breed,
            origin: "local" as const,
            ear_tag: data.ear_tag ?? null,
            company_id: null,
          }
        : {
            name: data.name,
            breed: data.breed,
            origin: "company" as const,
            company_id: data.company_id ? Number(data.company_id) : null,
            ear_tag: null,
          };

    if (id) return update.mutateAsync({ id, data: payload });
    return create.mutateAsync(payload);
  };

  return {
    save,
    isPending: create.isPending || update.isPending,
  };
}
