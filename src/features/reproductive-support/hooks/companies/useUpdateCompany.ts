import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompany } from "@/features/reproductive-support/services";

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
