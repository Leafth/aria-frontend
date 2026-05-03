import {
  Calendar,
  Weight,
  ArrowRight,
  CircleAlert,
} from "lucide-react";
import { type FlockCardProps } from "./flock-card.type";
import { useNavigate } from "react-router-dom";

export function FlockCard({
  name,
  code,
  breed,
  phase,
  age,
  weight,
  goal,
  goalWeight,
  colorCard,
}: FlockCardProps) {

  const navigate = useNavigate()

  return (
    <div
      className="bg-white rounded-2xl border-t-8 shadow-md p-4 flex flex-col gap-4 w-84"
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

      <div className="grid grid-cols-2 gap-2 bg-gray-100 rounded-lg justify-around divide-x divide-gray-300">
        <div className="p-2 flex flex-col items-center">
          <Calendar size={16} className="font-bold"/>
          <span className="text-xs mt-1 font-bold">{age}</span>
          <span className="text-[10px] text-gray-500">Idade</span>
        </div>

        <div className="bg-gray-100 rounded-lg p-2 flex flex-col items-center">
          <Weight size={16} className="font-bold"/>
          <span className="text-xs mt-1 font-bold">{weight}</span>
          <span className="text-[10px] text-gray-500">Peso</span>
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-green-600">● Meta ({goal})</span>
        <span className="font-medium">{goalWeight}kg</span>
      </div>

      <div className="bg-orange-100 text-orange-600 border-l-4 border-orange-600 text-sm p-4 rounded-lg flex items-center gap-2">
        <CircleAlert size={20} />
        <span>Próxima da meta. Pese regularmente.</span>
      </div>

      <div className="flex justify-end items-center text-sm text-gray-600 mt-8">
        <div className="flex items-center gap-1 cursor-pointer hover:text-black" onClick={() => navigate(`/flock/individual/${code}`)}>
          Ver detalhes <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
}
