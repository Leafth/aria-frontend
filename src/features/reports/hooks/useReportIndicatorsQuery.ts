import { useQuery } from "@tanstack/react-query";

import { mapReportIndicators } from "../mappers/report-indicators.mapper";
import { reportsService } from "../services/reports.service";

export function useReportIndicatorsQuery() {
  return useQuery({
    queryKey: ["reports", "reproductive-indicators"],
    queryFn: reportsService.getReproductiveIndicators,
    select: mapReportIndicators,
  });
}
