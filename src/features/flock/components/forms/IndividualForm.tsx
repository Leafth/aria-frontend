import { Button, InputField } from "@/shared";
import { Sparkles } from "lucide-react";

export function IndividualForm() {
  return (
    <article className="bg-white w-120 h-68 rounded-2xl">
      <header className="flex gap-2 bg-[#10B981]/20 rounded-t-2xl py-2 px-3">
        <Sparkles size={20} />
        Próxima ação recomendada
      </header>
      <form className="flex flex-col gap-5 p-5">
        <div>
          <h1 className="font-medium text-xl">Registrar Cio</h1>
          <p className="text-gray-500 text-sm">Registrar os dados do parto realizado</p>
        </div>
        <InputField label="Código*" placeholder="ex: BR-044" />
        <Button className="w-full">Confirmar Cio</Button>
      </form>
    </article>
  );
}
