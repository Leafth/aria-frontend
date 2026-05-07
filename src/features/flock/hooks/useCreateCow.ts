import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { UseFormReset, UseFormSetError } from "react-hook-form";

import { createCow } from "../services/cow.service";

import type { CreateCowDTO, CowPhase } from "../types/cow.types";
import type { ApiErrorResponse } from "../components/modals/types/modal-form.types";
import type { CreateCowFormData } from "../schemas/createCow.schema";
import { toast } from "sonner";

interface UseCreateCowFormParams {
  setError: UseFormSetError<CreateCowFormData>;
  reset: UseFormReset<CreateCowFormData>;
  onClose: () => void;
}

export function useCreateCow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCowDTO) => createCow(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cows"],
      });
    },
  });
}

export function useCreateCowForm({
  reset,
  onClose,
}: UseCreateCowFormParams) {
  const { mutateAsync: createCow, isPending } = useCreateCow();

  const onSubmit = async (data: CreateCowFormData) => {
    try {
      await createCow({
        name: data.name,
        ear_tag: data.code,
        birth_date: data.birthDate,
        breed: data.breed,
        weight: Number(data.initialWeight),
        phase: data.phase as CowPhase,
        active: true,
      });

      reset();
      onClose();
      toast.success("Vaca cadastrada com sucesso");
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      if (axiosError.response?.status === 422) {
        const apiErrors = axiosError.response.data.errors;

        if (apiErrors?.ear_tag) {
          toast.error("Falha: Número do brinco já existe");

          return;
        }
      }

      console.error(error);
    }
  };

  return {
    onSubmit,
    isPending,
  };
}
