import { Sparkles } from "lucide-react";
import { CioForm } from "../sections/CioForm";
import { ChildbirthForm } from "../sections/ChildbirthForm";
import { CoverageForm } from "../sections/CoverageForm";
import { PregnancyForm } from "../sections/PregnancyForm";
import type { RecommendedNextAction } from "@/features/flock/types/cow.types";

interface IndividualFormProps {
  cowId: string;
  recommendedNextAction: RecommendedNextAction;
}

export function IndividualForm({
  cowId,
  recommendedNextAction,
}: IndividualFormProps) {

  return (
    <article className="bg-white w-full rounded-2xl overflow-hidden">
      <header className="flex items-center gap-2 bg-[#10B981]/20 py-3 px-4 text-sm sm:text-base">
        <Sparkles size={20} />
        <span>Próxima ação recomendada</span>
      </header>

      <div className="p-4 sm:p-6">
        {recommendedNextAction === "heat_detection" && (
          <CioForm cowId={cowId} />
        )}

        {recommendedNextAction === "insemination" && (
          <CoverageForm cowId={cowId}/>
        )}

        {recommendedNextAction === "pregnancy_check" && (
          <PregnancyForm />
        )}

        {recommendedNextAction === "calving" && (
          <ChildbirthForm />
        )}

        {!recommendedNextAction && (
          <p className="text-sm text-gray-500">
            Nenhuma ação recomendada no momento.
          </p>
        )}
      </div>
    </article>
  );
}
