import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompany } from "@/features/reproductive-support/services";

export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCompany(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
}
