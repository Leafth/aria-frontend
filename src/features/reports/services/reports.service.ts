import { api } from "@/lib/api";
import type {
  GetReproductiveIndicatorsParams,
  ReportIndicatorsResponseApi,
} from "../types/reports-api.types";
import { mapReportPeriodToParams } from "../mappers/report-period.mapper";

export const reportsService = {
  getReproductiveIndicators: async ({
    period,
  }: GetReproductiveIndicatorsParams) => {
    const response = await api.get<ReportIndicatorsResponseApi>(
      "/dashboard/reproductive-indicators",
      {
        params: mapReportPeriodToParams(period),
      },
    );

    return response.data;
  },
};
