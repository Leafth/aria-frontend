import { Sparkles } from "lucide-react";
import { CioForm } from "../sections/CioForm";
import { useState } from "react";
import { Button } from "@/shared";
import { ChildbirthForm } from "../sections/ChildbirthForm";

export function IndividualForm() {
  const [state, setState] = useState("Cio");
  return (
    <div className="flex flex-col">
      <div className="flex gap-3">
        <Button onClick={() => setState("Cio")}>Cio</Button>
        <Button onClick={() => setState("Coverage")}>Cobertura</Button>
        <Button onClick={() => setState("Childbirth")}>Parto</Button>
      </div>
      <article className="bg-white w-120 h-68 rounded-2xl">
        <header className="flex gap-2 bg-[#10B981]/20 rounded-t-2xl py-2 px-3">
          <Sparkles size={20} />
          Próxima ação recomendada
        </header>

        {state === "Cio" && <CioForm />}
        {state === "Coverage" && <p></p>}
        {state === "Childbirth" && <ChildbirthForm/>}
      </article>
    </div>
  );
}
