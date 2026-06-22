import { useQuery } from "@tanstack/react-query";
import { homeApi } from "../services";
import { mapAlertsToView } from "../mappers";

export function useAlertsQuery() {
  return useQuery({
    queryKey: ["home", "alerts"],
    queryFn: homeApi.getAlerts,
    select: mapAlertsToView,
    staleTime: 1000 * 60,
  });
}
