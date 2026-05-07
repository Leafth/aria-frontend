import { Button } from "@/shared";
import { Weight, Sprout, CirclePlus } from "lucide-react";
import iconCow from "@/assets/icons/iconCow.svg";
import { SelectField } from "@/shared/components/ui/select/SelectField";
import type { CowPhase } from "../../types/cow.types";

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
  const canChangePhase =
    currentPhase === "calf" ||
    currentPhase === "heifer" ||
    currentPhase === "young";

  return (
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
          <p className="text-xs text-gray-400 mt-1">
            {canChangePhase
              ? "Sugestão: Fase adequada"
              : ""}
          </p>

          {canChangePhase && (
            <div className="mt-3">
              <SelectField
                label="Alterar fase"
                value={currentPhase}
                disabled={isChangingPhase}
                onChange={(value) =>
                  onChangePhase(value as "calf" | "heifer" | "young")
                }
                options={[
                  { label: "Bezerra", value: "calf" },
                  { label: "Garrota", value: "heifer" },
                  { label: "Novilha", value: "young" },
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
