import { useNavigate } from "react-router-dom";
import { IndividualForm } from "../../../components/forms/individual/IndividualForm";
import { AnimalStatusCard } from "../../../components/individual-record/AnimalStatusCard";
import { RecentHistoryCard } from "../../../components/individual-record/recent-history/RecentHistoryCard";
import type { Cow } from "../../../types/cow.types";
import { getPhaseLabel } from "../../../utils/getPhaseLabel";
import { recentHistoryMock } from "../../../components/individual-record/recent-history/recent-history.mock";
import { useChangeCowPhase } from "../../../hooks/useChangeCowPhase";

interface IndividualRecordMainSectionProps {
  cow: Cow;
  onRegisterWeight: () => void;
}

export function IndividualRecordMainSection({
  cow,
  onRegisterWeight,
}: IndividualRecordMainSectionProps) {
  const navigate = useNavigate();

  const { mutateAsync: changeCowPhase, isPending: isChangingPhase } =
    useChangeCowPhase();

  return (
    <section className="flex flex-col gap-5">
      <AnimalStatusCard
        nextDate="-"
        weight={`${cow.weight}kg`}
        lastWeigh="-"
        phase={getPhaseLabel(cow.phase)}
        currentPhase={cow.phase}
        onRegisterWeight={onRegisterWeight}
        isChangingPhase={isChangingPhase}
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
      <div className="flex flex-col gap-5 xl:flex-row">
        {cow.active && (
          <div className="w-full xl:flex-1">
            <IndividualForm />
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
