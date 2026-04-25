import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBull } from "../../services/bull.service";
import { toast } from "sonner";

export function useDeleteBull() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBull(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bulls"] });
      toast.success("Touro removido com sucesso");
    },

    onError: () => {
      toast.error("Erro ao remover touro");
    },
  });
}
