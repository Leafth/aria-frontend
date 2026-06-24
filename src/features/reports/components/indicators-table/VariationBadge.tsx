import { TrendingDown, TrendingUp } from "lucide-react";
import { formatVariation } from "../../utils/formatVariation";

export function VariationBadge({ value }: { value: number }) {
  const isPositive = value >= 0;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
        isPositive
          ? "bg-emerald-100 text-emerald-600"
          : "bg-red-100 text-red-500"
      }`}
    >
      <span>
        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
      </span>
      {formatVariation(value)}
    </span>
  );
}
