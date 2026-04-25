import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/features/auth/services";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      queryClient.removeQueries({ queryKey: ["me"] });

      navigate("/login", { replace: true });
    }
  }

  return { handleLogout };
}