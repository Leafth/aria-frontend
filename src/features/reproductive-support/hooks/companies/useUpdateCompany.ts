import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompany } from "../../services/company.service";

export function useUpdateCompany(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateCompany(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      onSuccess?.();
    },
  });
}
