import {
  Calendar,
  Weight,
  AlertTriangle,
  ArrowRight,
  CircleAlert,
  History,
} from "lucide-react";
import { type FlockCardProps } from "./flock-card.type";

export function FlockCard({
  name,
  code,
  breed,
  phase,
  age,
  weight,
  alerts,
  goal,
  currentWeight,
  goalWeight,
  lastWeighing,
  events,
  colorCard,
}: FlockCardProps) {
  const progress = Math.round((currentWeight / goalWeight) * 100);

  return (
    <div
      className="bg-white rounded-2xl border-t-8 shadow-md p-4 flex flex-col gap-4 w-[320px]"
      style={{ borderTopColor: colorCard }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg">{name}</h2>
          <span className="text-sm text-gray-500">#{code}</span>
          <p className="text-sm text-gray-600 mt-1">Raça: {breed}</p>
        </div>

        <span
          className="text-white text-xs px-3 py-1 rounded-full"
          style={{ backgroundColor: colorCard }}
        >
          {phase}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-gray-100 rounded-lg p-2 flex flex-col items-center">
          <Calendar size={16} />
          <span className="text-xs mt-1">{age}</span>
          <span className="text-[10px] text-gray-500">Idade</span>
        </div>

        <div className="bg-gray-100 rounded-lg p-2 flex flex-col items-center">
          <Weight size={16} />
          <span className="text-xs mt-1">{weight}</span>
          <span className="text-[10px] text-gray-500">Peso</span>
        </div>

        <div className="bg-gray-100 rounded-lg p-2 flex flex-col items-center text-red-500">
          <AlertTriangle size={16} />
          <span className="text-xs mt-1">{alerts}</span>
          <span className="text-[10px]">Alerta</span>
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-green-600">● Meta ({goal})</span>
        <span className="font-medium">{goalWeight}kg</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-gray-500">● Última pesagem</span>
        <span className="text-green-600">{lastWeighing}</span>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span>PESO</span>
          <span>
            {currentWeight}/{goalWeight} KG - {progress}%
          </span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-orange-100 text-orange-600 text-sm p-3 rounded-lg flex items-center gap-2">
        <CircleAlert size={16} />
        <span>Próxima da meta. Pese regularmente.</span>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <History size={14} />
          {events} eventos
        </div>

        <div className="flex items-center gap-1 cursor-pointer hover:text-black">
          Ver detalhes <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
}
