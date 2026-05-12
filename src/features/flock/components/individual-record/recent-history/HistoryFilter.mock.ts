import type { HistoryType } from "../recent-history/recent-history.types";

export type HistoryFilterValue = "Todas" | HistoryType;

type HistoryFilterItem = {
  name: HistoryFilterValue;
  color: string;
};

export const historyFilters: HistoryFilterItem[] = [
  { name: "Todas", color: "#E5E7EB" },
  { name: "Peso", color: "#c026d3" },
  { name: "Cio", color: "#4f46e5" },
  { name: "Cobertura", color: "#2dd4bf" },
  { name: "Prenhez", color: "#1d4ed8" },
  { name: "Parto", color: "#f97316" },
];