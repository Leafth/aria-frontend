import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout, MainLayout } from "@/shared/components/layout";
import {
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from "@/features/auth/pages";
import {
  DashboardPage,
  ReproductiveSupportPage,
  FlockPage,
  IndividualRecordPage,
} from "@/features";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/flock" element={<FlockPage />} />
            <Route
              path="/flock/individual/:id"
              element={<IndividualRecordPage />}
            />
            <Route
              path="/reproductive-support"
              element={<ReproductiveSupportPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
