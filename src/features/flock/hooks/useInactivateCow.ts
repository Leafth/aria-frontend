import { useMutation, useQueryClient } from "@tanstack/react-query";

import { inactivateCow } from "../services/cow.service";
import type { InactivateCowDTO } from "../types/cow.types";

interface InactivateCowParams {
  id: string;
  data: InactivateCowDTO;
}

export function useInactivateCow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: InactivateCowParams) => inactivateCow(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cows"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cow", variables.id],
      });
    },
  });
}
