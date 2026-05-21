import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCow } from "../services/cow.service";
import { toast } from "sonner";

interface DeleteCowParams {
  id: string;
}

export function useDeleteCow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeleteCowParams) => deleteCow(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cows"],
      });

      toast.success("Matriz excluído com sucesso.");
    },

    onError: () => {
      toast.error("Não foi possível excluir o animal.");
    },
  });
}
