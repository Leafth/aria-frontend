import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers["X-Tenant-Slug"] = "fazenda-teste";
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await api.post("/auth/refresh");

        return api(error.config); // tenta de novo
      } catch {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
