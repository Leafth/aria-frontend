import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout, MainLayout } from "../shared/components/layout";
import { LoginPage, ForgotPasswordPage, ResetPasswordPage } from "../features/auth/pages";

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

        <Route element={<MainLayout />}>{`outras paginas do sistema`}</Route>
      </Routes>
    </BrowserRouter>
  );
}
