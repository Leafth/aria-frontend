import { useMutation, useQueryClient } from "@tanstack/react-query";

import { registerCowWeight } from "../services/cow.service";
import type { RegisterCowWeightDTO } from "../types/cow.types";

interface RegisterCowWeightParams {
  id: string;
  data: RegisterCowWeightDTO;
}

export function useRegisterCowWeight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: RegisterCowWeightParams) =>
      registerCowWeight(id, data),

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
