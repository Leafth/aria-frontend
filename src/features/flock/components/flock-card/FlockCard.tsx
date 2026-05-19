import { Calendar, Weight, ArrowRight, AlertCircle, Info  } from "lucide-react";

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
  active,
  statusMessage,
  statusDate,
  alerts,
  inactiveReason,
}: FlockCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-2xl border-t-8 shadow-md p-4 flex flex-col gap-4 w-full sm:w-72 h-full"
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

      {active ? (
        <div className="flex items-center justify-between text-xs font-medium text-emerald-600">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>{statusMessage ?? "Status não informado"}</span>
          </div>

          {statusDate && <span>{statusDate}</span>}
        </div>
      ) : (
        <div className="flex items-center justify-between text-xs font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gray-500" />
            <span>Inativa{inactiveReason ? ` por ${inactiveReason}` : ""}</span>
          </div>

          {statusDate && <span>{statusDate}</span>}
        </div>
      )}

      {alerts.length > 0 && (
        <div className="flex flex-col gap-2">
          {alerts.map((alert) => (
            <AlertInfo
              key={`${alert.code}-${alert.message}`}
              level={alert.level}
            >
              <>
                {alert.level === "info" ? <Info size={20} /> : <AlertCircle size={20} />}
                <p>{alert.message}</p>
              </>
            </AlertInfo>
          ))}
        </div>
      )}

      <div className="mt-auto flex justify-end items-center text-sm text-gray-600 pt-4">
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
