import { Button } from "@/shared";
import { Weight, Sprout, CirclePlus } from "lucide-react";
import iconCow from "@/assets/icons/iconCow.svg";
import { SelectField } from "@/shared/components/ui/select/SelectField";
import type { CowPhase } from "../../types/cow.types";
import { useState } from "react";
import { ChangeCowPhaseModal } from "../modals/individual-modal/ChangePhaseConfirmation";
import { formatDate } from "@/utils/formatDate";

const PHASE_LABELS: Record<string, string> = {
  calf: "Bezerra",
  heifer: "Garrota",
  young: "Novilha",
};

const PHASE_OPTIONS: Record<string, { label: string; value: string }[]> = {
  calf: [
    { label: "Garrota", value: "heifer" },
    { label: "Novilha", value: "young" },
  ],
  heifer: [{ label: "Novilha", value: "young" }],
  young: [],
};

interface Props {
  weight: string;
  lastWeigh: string;
  phase: string;
  currentPhase: CowPhase;
  onRegisterWeight: () => void;
  onChangePhase: (phase: "calf" | "heifer" | "young") => void;
  isChangingPhase?: boolean;
  isActive?: boolean;
  statusMessage: string;
  observation: string | null;
  phaseSuggestion: string | null;
}

export function AnimalStatusCard({
  weight,
  lastWeigh,
  phase,
  currentPhase,
  onRegisterWeight,
  onChangePhase,
  isChangingPhase = false,
  isActive = true,
  statusMessage,
  observation,
  phaseSuggestion,
}: Props) {
  const [pendingPhase, setPendingPhase] = useState<
    "calf" | "heifer" | "young" | null
  >(null);

  const iconBg = isActive ? "bg-green-200" : "bg-gray-200";
  const iconColor = isActive ? "text-green-700" : "text-gray-400";

  const phaseOptions = PHASE_OPTIONS[currentPhase] ?? [];
  const canChangePhase = phaseOptions.length > 0;

  function handleSelectChange(value: string) {
    setPendingPhase(value as "calf" | "heifer" | "young");
  }

  function handleConfirmPhaseChange() {
    if (pendingPhase) {
      onChangePhase(pendingPhase);
      setPendingPhase(null);
    }
  }

  return (
    <>
      <div className="w-full bg-white rounded-2xl flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 flex items-center gap-4 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
          <div
            className={`w-14 h-14 shrink-0 flex items-center justify-center rounded-full ${iconBg}`}
          >
            <img
              src={iconCow}
              alt=""
              className={`h-7 ${!isActive ? "grayscale opacity-50" : ""}`}
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm text-gray-500">
              Status {isActive && "Reprodutivo"}
            </p>
            {!isActive ? <p> ---- </p> : (
              <>
                <p className="font-semibold text-gray-800">{statusMessage}</p>
                <p className="text-xs text-gray-400 mt-1">{observation}</p>
              </>
            )}
            
          </div>
        </div>

        <div className="flex-1 flex items-center gap-4 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
          <div
            className={`w-14 h-14 shrink-0 flex items-center justify-center rounded-full ${iconBg}`}
          >
            <Weight className={iconColor} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500">Peso Atual</p>
            <p className="font-semibold text-gray-800">{weight}</p>
            <p className="text-xs text-gray-400 mt-1">
              Última Pesagem: {formatDate(lastWeigh)}
            </p>

            {isActive && (
              <Button
                variant="ghost"
                className="h-10 mt-3 w-full sm:w-auto"
                onClick={onRegisterWeight}
              >
                <CirclePlus size={16} className="font-bold" />
                Registrar Peso
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 flex items-center gap-4 p-5 sm:p-6">
          <div
            className={`w-14 h-14 shrink-0 flex items-center justify-center rounded-full ${iconBg}`}
          >
            <Sprout className={iconColor} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500">Fase</p>
            <p className="font-semibold text-gray-800">{phase}</p>
            <p className="text-xs text-gray-400 mt-1">{phaseSuggestion}</p>
            {canChangePhase && isActive && (
              <div className="mt-3 w-full">
                <SelectField
                  label="Alterar fase"
                  value=""
                  disabled={isChangingPhase}
                  onChange={handleSelectChange}
                  options={phaseOptions}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <ChangeCowPhaseModal
        open={!!pendingPhase}
        onClose={() => setPendingPhase(null)}
        fromPhase={PHASE_LABELS[currentPhase] ?? currentPhase}
        toPhase={PHASE_LABELS[pendingPhase ?? ""] ?? ""}
        onConfirm={handleConfirmPhaseChange}
        isLoading={isChangingPhase}
      />
    </>
  );
}
