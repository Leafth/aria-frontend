import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout, MainLayout } from "@/shared/components/layout";
import {
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  HomePage,
  ReproductiveSupportPage,
  FlockPage,
  IndividualRecordPage,
  FullHistoryPage,
  ReportPage,
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
            <Route path="/home" element={<HomePage />} />
            <Route path="/flock" element={<FlockPage />} />
            <Route
              path="/flock/individual/:id"
              element={<IndividualRecordPage />}
            />
            <Route
              path="/flock/individual/full-history/:id"
              element={<FullHistoryPage />}
            />
            <Route
              path="/reproductive-support"
              element={<ReproductiveSupportPage />}
            />
            <Route
              path="/dashboard"
              element={<ReportPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
