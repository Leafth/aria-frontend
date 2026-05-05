import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCow } from "../services/cow.service";
import type { CreateCowDTO } from "../types/cow.types";

export function useCreateCow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCowDTO) => createCow(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cows"],
      });
    },
  });
}
