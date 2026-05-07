import type { CowPhase } from "../types/cow.types";

export function getPhaseColor(phase: CowPhase, active: boolean) {
  if (!active) return "#71717A";

  const colors: Record<CowPhase, string> = {
    calf: "#B32A9A",
    heifer: "#622BD0",
    young: "#28C2B0",
    primiparous: "#0004FF",
    multiparous: "#FF7700",
  };

  return colors[phase];
}
