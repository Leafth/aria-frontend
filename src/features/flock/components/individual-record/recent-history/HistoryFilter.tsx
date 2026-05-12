import { historyFilters, type HistoryFilterValue } from "./HistoryFilter.mock";

interface Props {
  value: HistoryFilterValue;
  onChange: (value: HistoryFilterValue) => void;
}

export function HistoryFilter({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <p className="text-sm font-medium text-text-primary shrink-0">
        Filtros:
      </p>

      <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-center">
        {historyFilters.map((filter) => {
          const isActive = value === filter.name;

          return (
            <button
              key={filter.name}
              type="button"
              onClick={() => onChange(filter.name)}
              className={`flex items-center gap-2 py-2 px-3 md:px-4 rounded-xl cursor-pointer transition-all text-sm whitespace-nowrap
                ${
                  isActive
                    ? "bg-support-teal text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }
              `}
            >
              {filter.name !== "Todas" && (
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: filter.color }}
                />
              )}

              <span>{filter.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
