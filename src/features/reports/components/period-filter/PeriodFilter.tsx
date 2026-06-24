type PeriodFilterValue = "7d" | "30d" | "1y" | "all";

interface PeriodFilterOption {
  label: string;
  value: PeriodFilterValue;
}

interface PeriodFilterProps {
  value: PeriodFilterValue;
  onChange: (value: PeriodFilterValue) => void;
}

const PERIOD_OPTIONS: PeriodFilterOption[] = [
  {
    label: "7 dias",
    value: "7d",
  },
  {
    label: "30 dias",
    value: "30d",
  },
  {
    label: "Último ano",
    value: "1y",
  },
  {
    label: "Tudo",
    value: "all",
  },
];

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  return (
    <div className="inline-flex items-center rounded-lg bg-gray-200 p-1">
      {PERIOD_OPTIONS.map((option) => {
        const isSelected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-lg px-5 py-2 text-sm font-medium transition cursor-pointer ${
              isSelected
                ? "bg-white text-gray-950 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export type { PeriodFilterValue };
