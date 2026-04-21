import { api } from "../../../lib/api";
import type { AuthData } from "../types/auth.types";

export async function login(data: AuthData) {
  const res = await api.post("/auth/login", {
    auth: data,
  });
  return res.data;
}

export async function getMe() {
  const response = await api.get("/me");
  return response.data;
}

export async function logout() {
  await api.delete("/auth/logout");
}
