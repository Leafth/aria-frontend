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

      queryClient.invalidateQueries({
        queryKey: ["breeds"],
      });
    },
  });
}

export function useCreateCowForm({
  setError,
  reset,
  onClose,
}: UseCreateCowFormParams) {
  const { mutateAsync: createCowMutation, isPending } = useCreateCow();

  const onSubmit = async (data: CreateCowFormData) => {
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

      const payload: CreateCowDTO = {
        name: data.name,
        ear_tag: data.code,
        birth_date: data.birthDate,
        weight: Number(data.initialWeight),
        phase: data.phase as CowPhase,
        active: true,
        ...breedPayload,
      };

      console.log("Payload enviado:", payload);

      await createCowMutation(payload);

      reset({
        name: "",
        code: "",
        birthDate: "",
        breed: {
          breed_id: undefined,
          breed_name: "",
        },
        initialWeight: "",
        phase: "",
        stage: "",
      });

      onClose();
      toast.success("Matriz cadastrada com sucesso");
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      console.log("Erro ao criar matriz:", axiosError.response?.data);

      if (axiosError.response?.status === 422) {
        const apiErrors = axiosError.response.data.errors;

        if (apiErrors?.ear_tag) {
          setError("code", {
            message: apiErrors.ear_tag[0],
          });

          toast.error("Falha: Número do brinco já existe");
          return;
        }

        if (apiErrors?.breed_id) {
          setError("breed", {
            message: apiErrors.breed_id[0],
          });

          return;
        }

        if (apiErrors?.breed_name) {
          setError("breed", {
            message: apiErrors.breed_name[0],
          });

          return;
        }

        if (apiErrors?.breed) {
          setError("breed", {
            message: apiErrors.breed[0],
          });

          return;
        }
      }

      toast.error("Erro ao cadastrar matriz");
      console.error(error);
    }
  };

  return {
    onSubmit,
    isPending,
  };
}
