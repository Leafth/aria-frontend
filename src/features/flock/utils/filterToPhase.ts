import type { CowPhase } from "../types/cow.types";

export function filterToPhase(filter: string): CowPhase | undefined {
  const phases: Record<string, CowPhase> = {
    Bezerra: "calf",
    Garrota: "heifer",
    Novilha: "young",
    Primípara: "primiparous",
    Multípara: "multiparous",
  };

  return phases[filter];
}
