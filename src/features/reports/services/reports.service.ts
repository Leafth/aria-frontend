import { api } from "@/lib/api";

import { mapReportPeriodToParams } from "../mappers/report-period.mapper";

import type {
  GetReproductiveIndicatorsParams,
  ReportFunnelApi,
  ReportIndicatorsResponseApi,
  ReportRatesEvolutionResponseApi,
} from "../types/reports-api.types";

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

  getReproductiveFunnel: async ({
    period,
  }: GetReproductiveIndicatorsParams) => {
    const response = await api.get<ReportFunnelApi>("/dashboard/event-counts", {
      params: mapReportPeriodToParams(period),
    });

    return response.data;
  },

  getReproductiveRatesEvolution: async () => {
    const response = await api.get<ReportRatesEvolutionResponseApi>(
      "/dashboard/reproductive-rates-evolution",
    );

    return response.data;
  },
};
