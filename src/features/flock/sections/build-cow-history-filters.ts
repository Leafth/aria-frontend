import type { CowHistoryFilters } from "../types/cow.types";
import type { HistoryFiltersValue } from "../components/individual-record/recent-history/HistoryFilter.mock";

export function buildCowHistoryFilters(
  filters: HistoryFiltersValue,
): CowHistoryFilters {
  const params: CowHistoryFilters = {};

  if (filters.startDate) {
    params.start_date = filters.startDate;
  }

  if (filters.endDate) {
    params.end_date = filters.endDate;
  }

  if (filters.main === "weighing") {
    params.event_type = "weighing";
    return params;
  }

  if (filters.main === "phase") {
    params.event_type = "phase_change";
    return params;
  }

  if (filters.main === "reproduction") {
    params.reproductive = true;

    if (filters.reproductiveEvents.length > 0) {
      params.event_type = filters.reproductiveEvents.join(",");
    }

    return params;
  }

  return params;
}
