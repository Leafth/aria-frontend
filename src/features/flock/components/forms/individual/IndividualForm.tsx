import { Sparkles } from "lucide-react";
import { CioForm } from "../sections/CioForm";
import { ChildbirthForm } from "../sections/ChildbirthForm";
import { CoverageForm } from "../sections/CoverageForm";
import { useState } from "react";
import { PregnancyForm } from "../sections/PregnancyForm";
import { Button } from "@/components/ui/button";

export function IndividualForm() {
  const [state, setState] = useState("cio");

  return (
    <article className="bg-white w-full rounded-2xl overflow-hidden">
      <header className="flex items-center gap-2 bg-[#10B981]/20 py-3 px-4 text-sm sm:text-base">
        <Sparkles size={20} />
        <span>Próxima ação recomendada</span>
      </header>

      <div className="p-4 sm:p-6">
        {state === "cio" && <CioForm />}
        {state === "coverage" && <CoverageForm />}
        {state === "childbirth" && <ChildbirthForm />}
        {state === "pregnancy" && <PregnancyForm />}
      </div>
      <div>
        <Button
          onClick={() => setState("cio")}
          className="cursor-pointer opacity-30"
        >
          Cio
        </Button>
        <Button
          onClick={() => setState("coverage")}
          className="cursor-pointer opacity-30"
        >
          Cobertura
        </Button>
        <Button
          onClick={() => setState("childbirth")}
          className="cursor-pointer opacity-30"
        >
          Parto
        </Button>
        <Button
          onClick={() => setState("pregnancy")}
          className="cursor-pointer opacity-30"
        >
          Prenhez
        </Button>
      </div>
    </article>
  );
}
