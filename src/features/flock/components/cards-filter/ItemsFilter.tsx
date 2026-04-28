import { filterFlocks } from "./ItemFilter.mock";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function ItemsFilter({ value, onChange }: Props) {
  return (
    <div className="flex gap-3 items-center">
      Fase:
      {filterFlocks.map((filterFlock) => {
        const isActive = value === filterFlock.name;

        return (
          <div
            key={filterFlock.name}
            onClick={() => onChange(filterFlock.name)}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl cursor-pointer transition-all
              ${
                isActive
                  ? "bg-support-teal text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }
            `}
          >
            {filterFlock.name !== "Todas" && (
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: filterFlock.color }}
              />
            )}

            <p>{filterFlock.name}</p>
          </div>
        );
      })}
    </div>
  );
}
