export type HistoryMainFilter = "all" | "reproduction" | "weighing" | "phase";

export type ReproductiveHistoryEvent =
  | "heat_detection"
  | "insemination"
  | "pregnancy_check"
  | "calving"
  | "pregnancy_interruption";

export interface HistoryFiltersValue {
  main: HistoryMainFilter;
  startDate: string;
  endDate: string;
  reproductiveEvents: ReproductiveHistoryEvent[];
}

export const mainHistoryFilters: {
  label: string;
  value: HistoryMainFilter;
  color: string;
}[] = [
  { label: "Todos", value: "all", color: "#E5E7EB" },
  { label: "Reprodução", value: "reproduction", color: "#f97316" },
  { label: "Peso", value: "weighing", color: "#c026d3" },
  { label: "Fase", value: "phase", color: "#10B981" },
];

export const reproductiveHistoryFilters: {
  label: string;
  value: ReproductiveHistoryEvent;
}[] = [
  { label: "Cio detectado", value: "heat_detection" },
  { label: "Cobertura realizada", value: "insemination" },
  { label: "Diagnóstico de prenhez", value: "pregnancy_check" },
  { label: "Parto registrado", value: "calving" },
  { label: "Interrupção de prenhez", value: "pregnancy_interruption" },
];
