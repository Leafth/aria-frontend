import type { InactivationReason } from "@/features/flock/types/cow.types";

export function getInactivationReasonLabel(reason?: InactivationReason) {
  const labels: Record<InactivationReason, string> = {
    sale: "Venda",
    death: "Morte",
  };

  return reason ? labels[reason] : "-";
}
