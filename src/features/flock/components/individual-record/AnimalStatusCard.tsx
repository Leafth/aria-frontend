import { Button } from "@/shared";
import { Beef, Weight, Sprout, CirclePlus } from "lucide-react";

interface Props {
  status: string;
  nextDate: string;
  weight: string;
  lastWeigh: string;
  phase: string;
}

export function AnimalStatusCard({
  status,
  nextDate,
  weight,
  lastWeigh,
  phase,
}: Props) {
  return (
    <div className="w-full bg-white rounded-2xl flex overflow-hidden">
      <div className="flex-1 flex items-center gap-4 p-6 border-r border-gray-200">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-200">
          <Beef className="text-green-700" />
        </div>

        <div>
          <p className="text-sm text-gray-500">Status Reprodutivo</p>
          <p className="font-semibold text-gray-800">{status}</p>
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

          <Button variant="ghost" className="h-10 mt-3">
            <CirclePlus size={16} />
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
          <p className="text-xs text-gray-400 mt-1">Sugestão: Fase adequada</p>

          <select className="mt-3 w-full border border-gray-400 rounded-lg px-3 py-2 text-sm bg-white cursor-pointer">
            <div>
              <option>Alterar fase</option>
            <option>Bezerra</option>
            <option>Novilha</option>
            <option>Vaca</option>
            </div>
          </select>
        </div>
      </div>
    </div>
  );
}
