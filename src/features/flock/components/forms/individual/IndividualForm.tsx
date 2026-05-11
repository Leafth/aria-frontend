import { Sparkles } from "lucide-react";
import { CioForm } from "../sections/CioForm";
// import { ChildbirthForm } from "../sections/ChildbirthForm";
// import { CoverageForm } from "../sections/CoverageForm";

export function IndividualForm() {
  const state = "Cio";

  return (
    <article className="bg-white w-full rounded-2xl overflow-hidden">
      <header className="flex items-center gap-2 bg-[#10B981]/20 py-3 px-4 text-sm sm:text-base">
        <Sparkles size={20} />
        <span>Próxima ação recomendada</span>
      </header>

      <div className="p-4 sm:p-6">
        {state === "Cio" && <CioForm />}
        {/* {state === "Coverage" && <CoverageForm />}
        {state === "Childbirth" && <ChildbirthForm />} */}
      </div>
    </article>
  );
}
