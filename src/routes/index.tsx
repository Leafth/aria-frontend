import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../features/auth/pages/login/LoginPage";
import { AuthLayout } from "../shared/components/layout/AuthLayout";
import { MainLayout } from "../shared/components/layout/MainLayout";
import ForgotPasswordPage from "../features/auth/pages/forgot-password/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/pages/reset-password/ResetPassordPage";

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
