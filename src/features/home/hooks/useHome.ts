import { useAlertsQuery } from "./useAlertsQuery";
import { useLastEventsQuery } from "./useLastEventsQuery";
import { usePhaseSummaryQuery } from "./usePhaseSummaryQuery";
import { useReproductiveSummaryQuery } from "./useReproductiveSummaryQuery";

export function useHome() {
  const reproductiveSummaryQuery = useReproductiveSummaryQuery();
  const phaseSummaryQuery = usePhaseSummaryQuery();
  const alertsQuery = useAlertsQuery();
  const lastEventsQuery = useLastEventsQuery(5);

  const queries = [
    reproductiveSummaryQuery,
    phaseSummaryQuery,
    alertsQuery,
    lastEventsQuery,
  ];

  return {
    infoCards: reproductiveSummaryQuery.data ?? [],
    phaseDistribution: phaseSummaryQuery.data ?? [],
    alerts: alertsQuery.data ?? [],
    lastEvents: lastEventsQuery.data ?? [],

    isLoading: queries.some((query) => query.isLoading),
    isFetching: queries.some((query) => query.isFetching),
    isError: queries.some((query) => query.isError),
  };
}
