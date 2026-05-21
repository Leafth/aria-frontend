import { useNavigate } from "react-router-dom";
import { IndividualForm } from "../../../components/forms/individual/IndividualForm";
import { AnimalStatusCard } from "../../../components/individual-record/AnimalStatusCard";
import { RecentHistoryCard } from "../../../components/individual-record/recent-history/RecentHistoryCard";
import type { CowDetails } from "../../../types/cow.types";
import { getPhaseLabel } from "../../../utils/getPhaseLabel";
import { useChangeCowPhase } from "../../../hooks/useChangeCowPhase";
import { useCowHistory } from "@/features/flock/hooks/useCowHistory";
import { cowHistoryToHistoryItem } from "@/features/flock/sections/cow-history-item";

interface IndividualRecordMainSectionProps {
  cow: CowDetails;
  onRegisterWeight: () => void;
}

export function IndividualRecordMainSection({
  cow,
  onRegisterWeight,
}: IndividualRecordMainSectionProps) {
  const navigate = useNavigate();

  const { mutateAsync: changeCowPhase, isPending: isChangingPhase } =
    useChangeCowPhase();

  const reproductiveAlert =
    cow.insights.reproductive_status.alerts.length > 0
      ? cow.insights.reproductive_status.alerts[0]
      : null;
  const {
    data: historyData,
    isLoading: isLoadingHistory,
    isError: isHistoryError,
  } = useCowHistory(cow.id, {
    per_page: 2,
  });

  const historyItems = historyData?.data.map(cowHistoryToHistoryItem) ?? [];

  return (
    <section className="flex flex-col gap-5">
      <AnimalStatusCard
        weight={`${cow.insights.weight_insight.current_weight ?? "-"}kg`}
        lastWeigh={cow.insights.weight_insight.last_weighing_at ?? "-"}
        phase={getPhaseLabel(cow.insights.phase_insight.current_phase)}
        currentPhase={cow.insights.phase_insight.current_phase}
        onRegisterWeight={onRegisterWeight}
        statusMessage={cow.insights.reproductive_status.message}
        observation={cow.insights.reproductive_status.observation}
        phaseSuggestion={cow.insights.phase_insight.message}
        isChangingPhase={isChangingPhase}
        alert={reproductiveAlert}
        onChangePhase={async (phase) => {
          await changeCowPhase({
            id: cow.id,
            data: {
              phase,
            },
          });
        }}
        isActive={cow.active}
      />
      <div className="flex flex-col gap-5 sm:flex-row">
        {cow.active && (
          <div className="w-full xl:flex-1">
            <IndividualForm
              cowId={cow.id}
              recommendedNextAction={cow.insights.recommended_next_action}
            />
          </div>
        )}

        <div className="w-full xl:flex-1">
          {isLoadingHistory && (
            <p className="text-sm text-gray-500">Carregando histórico...</p>
          )}

          {isHistoryError && (
            <p className="text-sm text-red-500">Erro ao carregar histórico.</p>
          )}

          {!isLoadingHistory && !isHistoryError && (
            <RecentHistoryCard
              items={historyItems}
              isActive={cow.active}
              onViewAll={() =>
                navigate(`/flock/individual/full-history/${cow.id}`)
              }
              showViewAllButton={true}
            />
          )}
        </div>
      </div>
    </section>
  );
}
