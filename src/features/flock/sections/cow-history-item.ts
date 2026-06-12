import type { CowHistoryEvent } from "../types/cow.types";
import type {
  HistoryItem,
  HistoryType,
} from "../components/individual-record/recent-history/recent-history.types";

const historyTypeByEventType: Record<
  CowHistoryEvent["event_type"],
  HistoryType
> = {
  weighing: "Peso",
  heat_detection: "Cio",
  insemination: "Cobertura",
  pregnancy_check: "Prenhez",
  calving: "Parto",
  pregnancy_interruption: "Interrupção",
  inactivation: "Inativação",
  phase_change: "Fase",
};

const historyColorByType: Record<HistoryType, string> = {
  Peso: "#c026d3",
  Cio: "#4f46e5",
  Cobertura: "#2dd4bf",
  Prenhez: "#1d4ed8",
  Parto: "#f97316",
  Interrupção: "#dc2626",
  Inativação: "#71717A",
  Fase: "#10B981",
};

export function cowHistoryToHistoryItem(event: CowHistoryEvent): HistoryItem {
  const type = historyTypeByEventType[event.event_type];

  return {
    title: event.title,
    description: event.observation ?? undefined,
    date: event.occurred_at,
    type,
    color: historyColorByType[type],
  };
}
