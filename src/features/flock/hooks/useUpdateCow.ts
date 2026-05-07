import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseFormReset } from "react-hook-form";

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
    await updateCowMutation({
      id,
      data: {
        name: data.name,
        ear_tag: data.code,
        birth_date: data.birthDate,
        breed: data.breed,
      },
    });

    reset();
    onClose();
  };

  return {
    onSubmit,
    isPending,
  };
}
