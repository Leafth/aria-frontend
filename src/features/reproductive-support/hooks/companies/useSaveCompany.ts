import type { CompanyFormData } from "@/features/reproductive-support/schemas";
import { useCreateCompany } from "./useCreateCompany";
import { useUpdateCompany } from "./useUpdateCompany";

export function useSaveCompany(onClose?: () => void) {
  const create = useCreateCompany(onClose);
  const update = useUpdateCompany(onClose);

  const save = async (data: CompanyFormData, id?: number) => {
    if (id) return update.mutateAsync({ id, data });
    return create.mutateAsync(data);
  };

  return {
    save,
    isPending: create.isPending || update.isPending,
  };
}
