import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { deleteCompany } from "@/features/reproductive-support/services";

function getDeleteCompanyErrorMessage(error: unknown) {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (message) {
      return message;
    }

    if (error.response?.status === 409 || error.response?.status === 422) {
      return "Esta empresa não pode ser excluída porque ainda possui touros cadastrados.";
    }
  }

  return "Erro ao remover empresa.";
}

export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCompany(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Empresa removida com sucesso");
    },

    onError: (error) => {
      toast.error(getDeleteCompanyErrorMessage(error));
    },
  });
}
