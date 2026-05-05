import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCow } from "../services/cow.service";
import type { UpdateCowDTO } from "../types/cow.types";

interface UpdateCowParams {
  id: string;
  data: UpdateCowDTO;
}

export function useUpdateCow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCowParams) => updateCow(id, data),

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
