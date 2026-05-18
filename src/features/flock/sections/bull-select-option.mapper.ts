import type { BullDTO } from "../../reproductive-support/types/reproductive-support.types";

export function bullToSelectOption(bull: BullDTO) {
  const originLabel =
    bull.origin === "local" ? "Local" : (bull.company?.name ?? "Empresa");

  return {
    label: `${bull.name} — ${originLabel}`,
    value: String(bull.id),
  };
}
