import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseFormReset } from "react-hook-form";

import { registerCowWeight } from "../services/cow.service";
import type { RegisterCowWeightDTO } from "../types/cow.types";
import type { EditWeightFormData } from "../schemas/editWeight.schema";
import { toast } from "sonner";
import { formatDateTimeLocalToBackend } from "@/utils/formatDateTimeLocalToBackend";
import { getCurrentDateTimeLocal } from "@/utils/dateTime";

interface RegisterCowWeightParams {
  id: string;
  data: RegisterCowWeightDTO;
}

interface UseRegisterCowWeightFormParams {
  id: string;
  reset: UseFormReset<EditWeightFormData>;
  onClose: () => void;
}

export function useRegisterCowWeight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: RegisterCowWeightParams) =>
      registerCowWeight(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cows"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cow", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["cow-history", variables.id],
      });
    },
  });
}

export function useRegisterCowWeightForm({
  id,
  reset,
  onClose,
}: UseRegisterCowWeightFormParams) {
  const { mutateAsync: registerCowWeightMutation, isPending } =
    useRegisterCowWeight();

  const onSubmit = async (data: EditWeightFormData) => {
    await registerCowWeightMutation({
      id,
      data: {
        weight: Number(data.weight),
        occurred_at: formatDateTimeLocalToBackend(data.occurred_at),
      },
    });

    reset({
      weight: "",
      occurred_at: getCurrentDateTimeLocal(),
    });
    onClose();
    toast.success("Novo peso registrado com sucesso");
  };

  return {
    onSubmit,
    isPending,
  };
}
