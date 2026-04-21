import { api } from "../../../lib/api";
import type { AuthData } from "../types/auth.types";

export async function login(data: AuthData) {
  const res = await api.post("/login", data);
  return res.data;
}
