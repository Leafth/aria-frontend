import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../services";
import { mapEventsToView } from "../mappers";

export function useLastEventsQuery(perPage = 5) {
  return useQuery({
    queryKey: ["home", "last-events", perPage],
    queryFn: () => homeApi.getLastEvents(perPage),
    select: mapEventsToView,
    staleTime: 1000 * 60,
  });
}
