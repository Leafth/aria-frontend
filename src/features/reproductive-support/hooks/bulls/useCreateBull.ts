import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBull } from "../../services/bull.service";
import { toast } from "sonner";

export function useCreateBull(onSuccessClose?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBull,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bulls"] });
      toast.success("Touro cadastrado com sucesso");
      onSuccessClose?.();
    },

    onError: () => {
      toast.error("Erro ao cadastrar touro");
    },
  });
}
