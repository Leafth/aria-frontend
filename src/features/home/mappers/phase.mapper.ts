import type { PhaseSummaryApi } from "../types/home-service.types";
import type { PhaseDistributionItem } from "../types/home-view.types";

const PHASE_META = {
  calf: {
    label: "Bezerra",
    color: "#B300A9",
    order: 1,
  },
  young: {
    label: "Garrota",
    color: "#6100D0",
    order: 2,
  },
  heifer: {
    label: "Novilha",
    color: "#00A5C2",
    order: 3,
  },
  primiparous: {
    label: "Primípara",
    color: "#003AFF",
    order: 4,
  },
  multiparous: {
    label: "Multípara",
    color: "#FF7700",
    order: 5,
  },
} as const;

export function mapPhaseSummaryToDistribution(
  data: PhaseSummaryApi,
): PhaseDistributionItem[] {
  const totalCows = data.total;

  return Object.entries(PHASE_META)
    .map(([phase, meta]) => {
      const count = data[phase as keyof typeof PHASE_META] ?? 0;

      const percentage = totalCows > 0 ? (count / totalCows) * 100 : 0;

      return {
        id: phase,
        label: meta.label,
        count,
        totalCows,
        value: Number(percentage.toFixed(2)),
        color: meta.color,
      };
    })
    .sort((a, b) => {
      const phaseA = PHASE_META[a.id as keyof typeof PHASE_META];
      const phaseB = PHASE_META[b.id as keyof typeof PHASE_META];

      return phaseA.order - phaseB.order;
    });
}
