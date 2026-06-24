import { api } from "@/lib/api";
import type { ReportIndicatorsResponseApi } from "../types/reports-api.types";

export const reportsService = {
  getReproductiveIndicators: async () => {
    const response = await api.get<ReportIndicatorsResponseApi>(
      "/dashboard/reproductive-indicators",
    );

    return response.data;
  },
};
