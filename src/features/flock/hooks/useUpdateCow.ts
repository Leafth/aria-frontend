import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseFormReset } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { updateCow } from "../services/cow.service";
import type { UpdateCowDTO } from "../types/cow.types";
import type { EditCowFormData } from "../schemas/editCow.schema";

interface UpdateCowParams {
  id: string;
  data: UpdateCowDTO;
}

interface UseUpdateCowFormParams {
  id: string;
  reset: UseFormReset<EditCowFormData>;
  onClose: () => void;
}

type ApiErrorResponse = {
  errors?: {
    ear_tag?: string[];
    name?: string[];
    birth_date?: string[];
    breed?: string[];
    breed_id?: string[];
    breed_name?: string[];
  };
};

export function useUpdateCow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCowParams) => updateCow(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cows"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cow", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["breeds"],
      });
    },
  });
}

export function useUpdateCowForm({
  id,
  reset,
  onClose,
}: UseUpdateCowFormParams) {
  const { mutateAsync: updateCowMutation, isPending } = useUpdateCow();

  const onSubmit = async (data: EditCowFormData) => {
    try {
      const breedPayload = data.breed.breed_id
        ? {
            breed_id: data.breed.breed_id,
            breed_name: undefined,
          }
        : {
            breed_id: undefined,
            breed_name: data.breed.breed_name?.trim(),
          };

      await updateCowMutation({
        id,
        data: {
          name: data.name,
          ear_tag: data.code,
          birth_date: data.birthDate,
          ...breedPayload,
        },
      });

      reset();
      onClose();

      toast.success("Dados da matriz atualizados com sucesso");
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      if (axiosError.response?.status === 422) {
        const apiErrors = axiosError.response.data.errors;

        if (apiErrors?.ear_tag) {
          toast.error("Falha: Número do brinco já existe");
          return;
        }

        if (apiErrors?.breed_id || apiErrors?.breed_name || apiErrors?.breed) {
          toast.error("Falha ao atualizar a raça da matriz");
          return;
        }

        toast.error("Não foi possível atualizar os dados da matriz");
        return;
      }

      toast.error("Erro inesperado ao atualizar os dados da matriz");
      console.error(error);
    }
  };

  return {
    onSubmit,
    isPending,
  };
}
