import { api } from "@/lib/api";
import type { AuthData, ResetPasswordData } from "@/features/auth/types";

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

export async function forgotPassword(email: string) {
  const res = await api.post("/password/forgot", {
    email,
  });

  return res.data;
}

export async function resetPassword(data: ResetPasswordData) {
  return api.put("/password/reset", data);
}