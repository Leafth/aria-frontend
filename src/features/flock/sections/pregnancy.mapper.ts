import { formatDateTimeLocalToBackend } from "@/utils/formatDateTimeLocalToBackend";
import type { RegisterPregnancyCheckDTO } from "../types/cow.types";
import type { PregnancyFormData } from "../schemas/pregnancy.schema";

export function pregnancyFormToPayload(
  data: PregnancyFormData,
): RegisterPregnancyCheckDTO {
  return {
    event: {
      event_type: "pregnancy_check",
      occurred_at: formatDateTimeLocalToBackend(data.occurredAt),
      data: {
        result: data.result,
      },
    },
  };
}
