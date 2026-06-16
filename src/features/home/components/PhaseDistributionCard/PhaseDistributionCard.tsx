import { ProgressBar } from "@/shared";
import { Card } from "../Card";

export function PhaseDistruibutionCard() {
  return (
    <Card title="Distribuição por Fase">
      <main className="flex flex-col gap-5">
        <ProgressBar label="Bezerra" totalCows={20} value={10} color="#B300A9"/>
        <ProgressBar label="Garrota" totalCows={20} value={18.75} color="#6100D0"/>
        <ProgressBar label="Novilha" totalCows={20} value={27.5} color="#00A5C2"/>
        <ProgressBar label="Primípara" totalCows={20} value={37.5} color="#003AFF"/>
        <ProgressBar label="Multípara" totalCows={20} value={6.25} color="#FF7700"/>
      </main>
    </Card>
  );
}
