import { Sparkles } from "lucide-react";
import { CioForm } from "../sections/CioForm";
import { useState } from "react";
import { Button } from "@/shared";
import { ChildbirthForm } from "../sections/ChildbirthForm";
import { CoverageForm } from "../sections/CoverageForm";

export function IndividualForm() {
  const [state, setState] = useState("Cio");
  return (
    <div className="flex">
      <article className="bg-white w-120 h-68 rounded-2xl">
        <header className="flex gap-2 bg-[#10B981]/20 rounded-t-2xl py-2 px-3">
          <Sparkles size={20} />
          Próxima ação recomendada
        </header>

        {state === "Cio" && <CioForm />}
        {state === "Coverage" && <CoverageForm />}
        {state === "Childbirth" && <ChildbirthForm />}
      </article>
      <div className="flex flex-col gap-3">
        <Button onClick={() => setState("Cio")} variant="ghost">Cio</Button>
        <Button onClick={() => setState("Coverage")} variant="ghost">Cobertura</Button>
        <Button onClick={() => setState("Childbirth")} variant="ghost">Parto</Button>
      </div>
    </div>
  );
}
