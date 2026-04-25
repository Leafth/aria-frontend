import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { getMe } from "@/features/auth/services";

export function ProtectedRoute() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  if (isLoading) return null;

  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
