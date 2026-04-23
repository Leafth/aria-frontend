import { Navigate, useSearchParams } from "react-router-dom";
import Logo from "../../../../assets/icons/logo.svg";
import { ResetPasswordForm } from "../../components";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const reset_password_token = searchParams.get("token");

  if (!reset_password_token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="min-h-screen grid grid-cols-1 bg-gray-200 gap-10">
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md flex flex-col items-center gap-6">
          <header className="flex flex-col justify-center items-center text-primary">
            <img src={Logo} className="w-30 h-30" />

            <h1 className="text-3xl font-semibold">Altere sua senha</h1>
          </header>
          <ResetPasswordForm />
        </div>
      </div>
    </main>
  );
}
