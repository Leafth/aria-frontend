import { filterFlocks } from "./ItemFilter.mock";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function ItemsFilter({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <p className="text-sm font-medium text-text-primary shrink-0">Fase:</p>

      <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-center">
        {filterFlocks.map((filterFlock) => {
          const isActive = value === filterFlock.name;

          return (
            <button
              key={filterFlock.name}
              type="button"
              onClick={() => onChange(filterFlock.name)}
              className={`flex items-center gap-2 py-2 px-3 md:px-4 rounded-xl cursor-pointer transition-all text-sm whitespace-nowrap
                ${
                  isActive
                    ? "bg-support-teal text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }
              `}
            >
              {filterFlock.name !== "Todas" && (
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: filterFlock.color }}
                />
              )}

              <span>{filterFlock.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
