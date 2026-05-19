import { useNavigate } from "react-router-dom";
import { IndividualForm } from "../../../components/forms/individual/IndividualForm";
import { AnimalStatusCard } from "../../../components/individual-record/AnimalStatusCard";
import { RecentHistoryCard } from "../../../components/individual-record/recent-history/RecentHistoryCard";
import type { CowDetails } from "../../../types/cow.types";
import { getPhaseLabel } from "../../../utils/getPhaseLabel";
import { recentHistoryMock } from "../../../components/individual-record/recent-history/recent-history.mock";
import { useChangeCowPhase } from "../../../hooks/useChangeCowPhase";

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
            <IndividualForm cowId={cow.id} />
          </div>
        )}

        <div className="w-full xl:flex-1">
          <RecentHistoryCard
            items={recentHistoryMock}
            isActive={cow.active}
            onViewAll={() =>
              navigate(`/flock/individual/full-history/${cow.id}`)
            }
            showViewAllButton={true}
          />
        </div>
      </div>
    </section>
  );
}
