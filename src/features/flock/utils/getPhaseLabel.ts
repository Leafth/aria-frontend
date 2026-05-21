import type { CowPhase } from "../types/cow.types";

export function getPhaseLabel(phase: CowPhase) {
  const labels: Record<CowPhase, string> = {
    calf: "Bezerra",
    heifer: "Garrota",
    young: "Novilha",
    primiparous: "Primípara",
    multiparous: "Multípara",
  };

  return labels[phase];
}
