import type { Cow } from "../types/cow.types";
import { calculateAge } from "./calculateAge";
import { getPhaseColor } from "./getPhaseColor";
import { getPhaseLabel } from "./getPhaseLabel";

function formatWeight(weight: string | number) {
  return `${Number(weight).toFixed(0)}kg`;
}

function getInactiveReasonLabel(reason?: string) {
  const labels: Record<string, string> = {
    death: "Morte",
    sale: "Venda",
  };

  return reason ? (labels[reason] ?? reason) : undefined;
}

export function cowToFlockCard(cow: Cow) {
  return {
    id: cow.id,
    name: cow.name,
    code: cow.ear_tag,
    breed: cow.breed,
    phase: cow.active ? getPhaseLabel(cow.phase) : "Inativa",
    age: calculateAge(cow.birth_date),
    weight: formatWeight(cow.weight),
    daysInLactation: cow.insights?.days_since_last_calving ?? null,
    colorCard: getPhaseColor(cow.phase, cow.active),
    active: cow.active,

    statusMessage: cow.active
      ? cow.insights?.status?.message
      : "Matriz inativa",

    statusDate: cow.active
      ? cow.insights?.status?.occurred_at
      : cow.inactive_status?.inactivated_at,

    alerts: cow.insights?.alerts ?? [],

    inactiveReason: getInactiveReasonLabel(
      cow.inactive_status?.inactivated_reason,
    ),
  };
}
