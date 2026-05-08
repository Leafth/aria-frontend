import { Button } from "@/shared";
import { Weight, Sprout, CirclePlus } from "lucide-react";
import iconCow from "@/assets/icons/iconCow.svg";
import { SelectField } from "@/shared/components/ui/select/SelectField";
import type { CowPhase } from "../../types/cow.types";
import { useState } from "react";
import { ChangeCowPhaseModal } from "../modals/individual-modal/ChangePhaseConfirmation";


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
  nextDate: string;
  weight: string;
  lastWeigh: string;
  phase: string;
  currentPhase: CowPhase;
  onRegisterWeight: () => void;
  onChangePhase: (phase: "calf" | "heifer" | "young") => void;
  isChangingPhase?: boolean;
}

export function AnimalStatusCard({
  nextDate,
  weight,
  lastWeigh,
  phase,
  currentPhase,
  onRegisterWeight,
  onChangePhase,
  isChangingPhase = false,
}: Props) {
  const [pendingPhase, setPendingPhase] = useState<
    "calf" | "heifer" | "young" | null
  >(null);

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
      <div className="w-full bg-white rounded-2xl flex overflow-hidden">
        <div className="flex-1 flex items-center gap-4 p-6 border-r border-gray-200">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-200">
            <img src={iconCow} alt="" className="h-7" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Status Reprodutivo</p>
            <p className="font-semibold text-gray-800">Aguardando Cio</p>
            <p className="text-xs text-gray-400 mt-1">
              Data Prevista: {nextDate}
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-4 p-6 border-r border-gray-200">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-200">
            <Weight className="text-green-700" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">Peso Atual</p>
            <p className="font-semibold text-gray-800">{weight}</p>
            <p className="text-xs text-gray-400 mt-1">
              Última Pesagem: {lastWeigh}
            </p>
            <Button
              variant="ghost"
              className="h-10 mt-3"
              onClick={onRegisterWeight}
            >
              <CirclePlus size={16} className="font-bold" />
              Registrar Peso
            </Button>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-4 p-6">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-200">
            <Sprout className="text-green-700" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">Fase</p>
            <p className="font-semibold text-gray-800">{phase}</p>

            {canChangePhase && (
              <div className="mt-3">
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
