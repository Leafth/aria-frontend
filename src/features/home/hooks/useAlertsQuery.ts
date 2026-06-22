import { useQuery } from "@tanstack/react-query";
import { homeDashboardApi } from "../services/home.service";
import { mapAlertsToView } from "../mappers/alert.mapper";

export function useAlertsQuery() {
  return useQuery({
    queryKey: ["home", "alerts"],
    queryFn: homeDashboardApi.getAlerts,
    select: mapAlertsToView,
    staleTime: 1000 * 60,
  });
}
