import { ChevronRight, CircleAlert } from "lucide-react";

interface AlertItemProps {
  title: string;
  color: string;
  onGoToCowRecord: () => void;
}

export function AlertItem({ title, color, onGoToCowRecord }: AlertItemProps) {
  return (
    <div
      className="flex h-12 w-full items-center justify-between px-5 text-left rounded-lg"
      style={{
        backgroundColor: `${color}33`,
        borderLeft: `5px solid ${color}`,
      }}
    >
      <div className="flex min-w-0 items-center gap-4">
        <CircleAlert className="h-5 w-5 shrink-0" style={{ color }} />

        <p className="truncate text-xs font-semibold text-gray-800">{title}</p>
      </div>

      <button
        type="button"
        onClick={onGoToCowRecord}
        className="flex shrink-0 items-center gap-2 text-xs font-bold uppercase text-black transition hover:opacity-70 cursor-pointer"
      >
        Ir para ficha
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
