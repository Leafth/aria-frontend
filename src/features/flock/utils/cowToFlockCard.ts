import type { Cow } from "../types/cow.types";
import { calculateAge } from "./calculateAge";
import { getPhaseColor } from "./getPhaseColor";
import { getPhaseLabel } from "./getPhaseLabel";

export function cowToFlockCard(cow: Cow) {
  return {
    id: cow.id,
    name: cow.name,
    code: cow.ear_tag,
    breed: cow.breed,
    phase: cow.active ? getPhaseLabel(cow.phase) : "Inativa",
    age: calculateAge(cow.birth_date),
    weight: `${cow.weight}kg`,
    colorCard: getPhaseColor(cow.phase, cow.active),
  };
}
