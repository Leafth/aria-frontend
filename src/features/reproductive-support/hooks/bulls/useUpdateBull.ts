import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBull } from "../../services/bull.service";
import { toast } from "sonner";

export function useUpdateBull(onSuccessClose?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateBull(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bulls"] });
      toast.success("Touro atualizado com sucesso");
      onSuccessClose?.();
    },

    onError: () => {
      toast.error("Erro ao atualizar touro");
    },
  });
}
