import { useQuery } from "@tanstack/react-query";
import { homeDashboardApi } from "../services/home.service";
import { mapEventsToView } from "../mappers/event.mapper";

export function useLastEventsQuery(perPage = 5) {
  return useQuery({
    queryKey: ["home", "last-events", perPage],
    queryFn: () => homeDashboardApi.getLastEvents(perPage),
    select: mapEventsToView,
    staleTime: 1000 * 60,
  });
}
