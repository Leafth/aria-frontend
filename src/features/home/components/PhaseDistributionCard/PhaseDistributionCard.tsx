import { ProgressBar } from "@/shared";
import type { PhaseDistributionItem } from "../../types/home-view.types";
import { Card } from "../Card";

interface PhaseDistruibutionCardProps {
  data: PhaseDistributionItem[];
}

export function PhaseDistruibutionCard({ data }: PhaseDistruibutionCardProps) {
  const hasData = data.length > 0;

  return (
    <Card title="Distribuição por Fase">
      <main className="flex flex-col gap-5">
        {!hasData && (
          <p className="text-sm text-gray-400">
            Não há dados de fase no momento.
          </p>
        )}

        {data.map((item) => (
          <ProgressBar
            key={item.id}
            label={item.label}
            totalCows={item.count}
            value={item.value}
            color={item.color}
          />
        ))}
      </main>
    </Card>
  );
}
