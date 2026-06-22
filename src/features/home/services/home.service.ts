import { api } from "@/lib/api";
import type {
  AlertApi,
  EventsResponseApi,
  PhaseSummaryApi,
  ReproductiveSummaryApi,
} from "../types/home-service.types";

export const homeDashboardApi = {
  getReproductiveSummary: async () => {
    const response = await api.get<ReproductiveSummaryApi>(
      "/dashboard/reproductive-summary",
    );

    return response.data;
  },

  getPhaseSummary: async () => {
    const response = await api.get<PhaseSummaryApi>("/dashboard/phase-summary");

    return response.data;
  },

  getAlerts: async () => {
    const response = await api.get<AlertApi[]>("/dashboard/alerts");
    return response.data;
  },

  getLastEvents: async (perPage = 5) => {
    const response = await api.get<EventsResponseApi>("/events", {
      params: {
        per_page: perPage,
      },
    });

    return response.data;
  },
};
