import { api } from "@/lib/api";

import { mapReportPeriodToParams } from "../mappers/report-period.mapper";

import type {
  GetReproductiveIndicatorsParams,
  InseminationDistributionApi,
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

  getInseminationDistribution: async ({
    period,
  }: GetReproductiveIndicatorsParams) => {
    const response = await api.get<InseminationDistributionApi>(
      "/dashboard/insemination-distribution",
      {
        params: mapReportPeriodToParams(period),
      },
    );

    return response.data;
  },

  getReproductiveReport: async ({ period }: GetReproductiveIndicatorsParams) => {
    const response = await api.get("/dashboard/reproductive-report", {
      params: mapReportPeriodToParams(period),
      responseType: "blob",
    });

    return response.data as Blob;
  },
};
