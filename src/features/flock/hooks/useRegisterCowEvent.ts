import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerCowEvent } from "../services/cow.service";

interface RegisterCowEventParams {
  cowId: string;
  data: Parameters<typeof registerCowEvent>[1];
}

export function useRegisterCowEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cowId, data }: RegisterCowEventParams) =>
      registerCowEvent(cowId, data),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cow", variables.cowId],
      });

      queryClient.invalidateQueries({
        queryKey: ["cows"],
      });

      queryClient.invalidateQueries({
        queryKey: ["events", variables.cowId],
      });
    },
  });
}
