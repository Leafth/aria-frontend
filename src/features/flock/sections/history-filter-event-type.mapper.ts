import type { CowHistoryEventType } from "../types/cow.types";
import type { HistoryFilterValue } from "../components/individual-record/recent-history/HistoryFilter.mock";

export function historyFilterToEventType(
  filter: HistoryFilterValue,
): CowHistoryEventType | undefined {
  const map: Partial<Record<HistoryFilterValue, CowHistoryEventType>> = {
    Peso: "weighing",
    Cio: "heat_detection",
    Cobertura: "insemination",
    Prenhez: "pregnancy_check",
    Parto: "calving",
    Inativação: "inactivation",
    Fase: "phase_change",
  };

  return map[filter];
}
