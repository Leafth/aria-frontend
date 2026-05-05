import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCow } from "../services/cow.service";
import type { UpdateCowDTO } from "../types/cow.types";

interface UpdateCowParams {
  id: number;
  data: UpdateCowDTO;
}

export function useUpdateCow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCowParams) => updateCow(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cows"],
      });
    },
  });
}
