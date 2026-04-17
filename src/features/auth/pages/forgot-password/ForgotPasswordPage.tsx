import Logo from "../../../../assets/icons/Logo.svg";
import { ForgotPasswordForm } from "../../components";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 bg-gray-200 gap-10">
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md flex flex-col items-center gap-6">
          <header className="flex flex-col justify-center items-center text-primary">
            <img src={Logo} className="w-30 h-30" />

            <h1 className="text-3xl font-semibold">Recupere sua conta</h1>

            <p className="mt-2 text-lg">Esqueceu sua senha?</p>

            <p className="text-lg">Relaxa, a gente te ajuda a recuperar!</p>
          </header>
          <ForgotPasswordForm />
        </div>
      </div>
    </main>
  );
}
