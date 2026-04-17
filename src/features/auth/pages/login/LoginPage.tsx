import Logo from "../../../../assets/icons/Logo.svg";
import ImgLogo from "../../../../assets/img/imgLogin.svg";
import { LoginForm } from "../../components";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-200 gap-10">
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md flex flex-col items-center gap-6">
          <header className="flex flex-col justify-center items-center">
            <img src={Logo} className="w-30 h-30" />

            <h1 className="text-3xl font-semibold text-primary">
              Acesse sua conta
            </h1>
          </header>
          <LoginForm />
        </div>
      </div>
      <aside className="hidden lg:flex flex-col items-center justify-center mr-30 my-2">
        <div className="flex justify-center items-center bg-linear-to-b from-[#03809B] to-[#012C35] h-120 w-full rounded-t-2xl">
          <img src={ImgLogo} alt="" className="w-100 h-100" />
        </div>
        <div className="flex flex-col justify-center bg-white h-3/10 w-full rounded-b-2xl px-10">
          <header className="flex items-center">
            <img src={Logo} className="w-12 h-12" />
            <h3 className="text-3xl font-semibold text-primary">Aria</h3>
          </header>
          <p className="font-medium text-text-primary">
            Centralize o controle reprodutivo e de ciclo de vida do seu rebanho
            bovino de forma prática e intuitiva.{" "}
          </p>
        </div>
      </aside>
    </main>
  );
}
