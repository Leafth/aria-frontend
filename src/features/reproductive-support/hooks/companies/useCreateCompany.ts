import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompany } from "@/features/reproductive-support/services";
import { toast } from "sonner";

export function useCreateCompany(onSuccessClose?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Empresa cadastrada com sucesso");
      onSuccessClose?.();
    },
    onError: () => {
      toast.error("Erro ao cadastrar empresa");
    },
  });
}
