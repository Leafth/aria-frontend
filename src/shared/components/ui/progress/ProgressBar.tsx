import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  label: string;
  totalCows: number;
  value: number;
  color?: string;
  className?: string;
}

export function ProgressBar({
  label,
  totalCows,
  value,
  color = "#3b82f6",
  className,
}: ProgressBarProps) {
  const normalizedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>

        <span className="text-sm font-semibold text-gray-900">
          {totalCows} - {normalizedValue}%
        </span>
      </div>

      <Progress
        value={normalizedValue}
        indicatorColor={color}
        className="h-3"
      />
    </div>
  );
}
