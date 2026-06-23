import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AlertsCardProps } from "./types";
import { Card } from "../Card";
import { AlertItem } from "./AlertItem";

export function AlertsCard({ data }: AlertsCardProps) {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const visibleAlerts = showAll ? data : data.slice(0, 2);
  const hasAlerts = data.length > 0;
  const hasMoreThanTwoAlerts = data.length > 2;

  return (
    <Card title="Alertas do sistema">
      <main className="flex flex-col gap-5">
        {!hasAlerts && (
          <p className="text-sm text-gray-400">Não há alertas no momento.</p>
        )}

        {visibleAlerts.map((alert) => (
          <AlertItem
            key={alert.id}
            title={alert.title}
            cowName={alert.cowName}
            earTag={alert.earTag}
            bgColorClass={alert.bgColorClass}
            borderColorClass={alert.borderColorClass}
            iconColorClass={alert.iconColorClass}
            onGoToCowRecord={() => navigate(`/flock/individual/${alert.cowId}`)}
          />
        ))}

        {hasMoreThanTwoAlerts && (
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="self-center cursor-pointer text-sm font-semibold text-gray-700 transition hover:text-gray-950"
          >
            {showAll ? "Mostrar menos" : "Mostrar mais..."}
          </button>
        )}
      </main>
    </Card>
  );
}
