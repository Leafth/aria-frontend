import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCow } from "../services/cow.service";

export function useDeleteCow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCow(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cows"],
      });
    },
  });
}
