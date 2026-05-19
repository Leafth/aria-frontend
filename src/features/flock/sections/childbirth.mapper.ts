import { formatDateTimeLocalToBackend } from "@/utils/formatDateTimeLocalToBackend";
import type { RegisterCalvingDTO } from "../types/cow.types";
import type { ChildbirthFormData } from "../schemas/childbirth.schema";

export function childbirthFormToPayload(
  data: ChildbirthFormData,
): RegisterCalvingDTO {
  return {
    event: {
      event_type: "calving",
      occurred_at: formatDateTimeLocalToBackend(data.occurredAt),
      data: {
        observation: data.observation || undefined,
      },
    },
  };
}
