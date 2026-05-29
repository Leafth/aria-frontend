import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBull } from "../../services/bull.service";
import { toast } from "sonner";
import type { UpdateBullDTO } from "../../types";

export function useUpdateBull(onSuccessClose?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBullDTO }) =>
      updateBull(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bulls"] });
      queryClient.invalidateQueries({ queryKey: ["breeds"] });
      toast.success("Touro atualizado com sucesso");
      onSuccessClose?.();
    },

    onError: () => {
      toast.error("Erro ao atualizar touro");
    },
  });
}
