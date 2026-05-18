import { formatDateTimeLocalToBackend } from "@/utils/formatDateTimeLocalToBackend";
import type {
  RegisterHeatDetectionDTO,
  RegisterHeatDetectionWithInseminationDTO,
} from "../types/cow.types";
import type { CioFormData } from "../schemas/cio.schema";

export function cioFormToPayload(
  data: CioFormData,
): RegisterHeatDetectionDTO | RegisterHeatDetectionWithInseminationDTO {
  if (data.hasCoverage === "no_coverage") {
    return {
      event: {
        event_type: "heat_detection",
        occurred_at: formatDateTimeLocalToBackend(data.heatOccurredAt),
        data: {
          observation: data.heatObservation || undefined,
        },
      },
    };
  }

  return {
    event: {
      event_type: "heat_detection_with_insemination",
      heat_occurred_at: formatDateTimeLocalToBackend(data.heatOccurredAt),
      insemination_occurred_at: formatDateTimeLocalToBackend(
        data.inseminationOccurredAt!,
      ),
      data: {
        method: data.method!,
        bull_id: data.bullId!,
        heat_observation: data.heatObservation || undefined,
      },
    },
  };
}
