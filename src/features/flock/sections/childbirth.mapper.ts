import type {
  RegisterCalvingDTO,
  RegisterPregnancyInterruptionDTO,
} from "../types/cow.types";
import type { ChildbirthFormData } from "../schemas/childbirth.schema";

export function childbirthFormToPayload(
  data: ChildbirthFormData,
): RegisterCalvingDTO | RegisterPregnancyInterruptionDTO {
  const observation = data.observation?.trim();

  if (data.action === "pregnancy_interruption") {
    return {
      event: {
        event_type: "pregnancy_interruption",
        occurred_at: data.occurredAt,
        data: observation
          ? {
              observation,
            }
          : undefined,
      },
    };
  }

  return {
    event: {
      event_type: "calving",
      occurred_at: data.occurredAt,
      data: observation
        ? {
            observation,
          }
        : undefined,
    },
  };
}
