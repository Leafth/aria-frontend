import { TrendingDown, TrendingUp } from "lucide-react";
import { formatVariation } from "../../utils/formatVariation";

export function VariationBadge({ value }: { value: number | null }) {
  if (value === null) {
    return (
      <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
        Sem comparação
      </span>
    );
  }

  const isPositive = value >= 0;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
        isPositive
          ? "bg-emerald-100 text-emerald-600"
          : "bg-red-100 text-red-500"
      }`}
    >
      {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
      {formatVariation(value)}
    </span>
  );
}
