import { ChevronRight, CircleAlert } from "lucide-react";
import type { AlertItemProps } from "./types";

export function AlertItem({
  title,
  cowName,
  earTag,
  bgColorClass,
  borderColorClass,
  iconColorClass,
  onGoToCowRecord,
}: AlertItemProps) {
  return (
    <div
      className={`flex h-12 w-full items-center justify-between rounded-lg border-l-5 px-5 text-left ${bgColorClass} ${borderColorClass}`}
    >
      <div className="flex min-w-0 items-center gap-4">
        <CircleAlert className={`h-5 w-5 shrink-0 ${iconColorClass}`} />

        <p className="truncate text-xs font-semibold text-gray-800">{`${cowName}(BRC-${earTag}): ${title}`}</p>
      </div>

      <button
        type="button"
        onClick={onGoToCowRecord}
        className="flex shrink-0 cursor-pointer items-center gap-2 text-xs font-bold uppercase text-black transition hover:opacity-70"
      >
        Ir para ficha
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
