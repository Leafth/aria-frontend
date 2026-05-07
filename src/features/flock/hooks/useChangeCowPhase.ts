import { useMutation, useQueryClient } from "@tanstack/react-query";

import { changeCowPhase } from "../services/cow.service";
import type { ChangeCowPhaseDTO } from "../types/cow.types";

interface ChangeCowPhaseParams {
  id: string;
  data: ChangeCowPhaseDTO;
}

export function useChangeCowPhase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: ChangeCowPhaseParams) =>
      changeCowPhase(id, data),

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
