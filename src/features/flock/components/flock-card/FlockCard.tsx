import { Calendar, Weight, ArrowRight, AlertCircle } from "lucide-react";

import { type FlockCardProps } from "./flock-card.type";
import { useNavigate } from "react-router-dom";
import { AlertInfo } from "../alert-info/AlertInfo";

export function FlockCard({
  id,
  name,
  code,
  breed,
  phase,
  age,
  weight,
  colorCard,
}: FlockCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-2xl border-t-8 shadow-md p-4 flex flex-col gap-4 w-full sm:w-72"
      style={{ borderTopColor: colorCard }}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <h2 className="font-semibold text-lg truncate">{name}</h2>
          <span className="text-sm text-gray-500">#{code}</span>
          <p className="text-sm text-gray-600 mt-1 truncate">Raça: {breed}</p>
        </div>

        <span
          className="text-white text-xs px-3 py-1 rounded-full shrink-0"
          style={{ backgroundColor: colorCard }}
        >
          {phase}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 bg-gray-100 rounded-lg divide-x divide-gray-300">
        <div className="p-2 flex flex-col items-center">
          <Calendar size={16} className="font-bold" />
          <span className="text-xs mt-1 font-bold">{age}</span>
          <span className="text-[10px] text-gray-500">Idade</span>
        </div>

        <div className="p-2 flex flex-col items-center">
          <Weight size={16} className="font-bold" />
          <span className="text-xs mt-1 font-bold">{weight}</span>
          <span className="text-[10px] text-gray-500">Peso</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-medium text-emerald-600">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Cio Confirmado</span>
        </div>

        <span>03/02/2026</span>
      </div>

      <AlertInfo>
        <>
          <AlertCircle />
          <p>Aguardando cobertura</p>
        </>
      </AlertInfo>

      <div className="flex justify-end items-center text-sm text-gray-600 mt-4 sm:mt-8">
        <button
          type="button"
          className="flex items-center gap-1 cursor-pointer hover:text-black"
          onClick={() => navigate(`/flock/individual/${id}`)}
        >
          Ver detalhes <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
