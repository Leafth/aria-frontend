import { formatDateTimeLocalToBackend } from "@/utils/formatDateTimeLocalToBackend";
import type { RegisterInseminationDTO } from "../types/cow.types";
import type { CoverageFormData } from "../schemas/coverage.schema";

export function coverageFormToPayload(
  data: CoverageFormData,
): RegisterInseminationDTO {
  return {
    event: {
      event_type: "insemination",
      occurred_at: formatDateTimeLocalToBackend(data.occurredAt),
      data: {
        method: data.method,
        bull_id: data.bullId,
      },
    },
  };
}
