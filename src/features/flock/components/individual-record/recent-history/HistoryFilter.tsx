import { InputField } from "@/shared";
import {
  mainHistoryFilters,
  reproductiveHistoryFilters,
  type HistoryFiltersValue,
  type ReproductiveHistoryEvent,
} from "./HistoryFilter.mock";

interface Props {
  value: HistoryFiltersValue;
  onChange: (value: HistoryFiltersValue) => void;
}

export function HistoryFilter({ value, onChange }: Props) {
  function handleMainChange(main: HistoryFiltersValue["main"]) {
    onChange({
      ...value,
      main,
      reproductiveEvents:
        main === "reproduction" ? value.reproductiveEvents : [],
    });
  }

  function handleDateChange(field: "startDate" | "endDate", date: string) {
    onChange({
      ...value,
      [field]: date,
    });
  }

  function handleReproductiveEventChange(event: ReproductiveHistoryEvent) {
    const alreadySelected = value.reproductiveEvents.includes(event);

    const reproductiveEvents = alreadySelected
      ? value.reproductiveEvents.filter((item) => item !== event)
      : [...value.reproductiveEvents, event];

    onChange({
      ...value,
      reproductiveEvents,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-150">
        <InputField
          label="Data inicial"
          type="date"
          value={value.startDate}
          onChange={(event) =>
            handleDateChange("startDate", event.target.value)
          }
        />

        <InputField
          label="Data final"
          type="date"
          value={value.endDate}
          onChange={(event) => handleDateChange("endDate", event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <p className="text-sm font-medium text-text-primary shrink-0">
          Filtros:
        </p>

        <div className="flex flex-wrap gap-2 md:gap-3 items-center">
          {mainHistoryFilters.map((filter) => {
            const isActive = value.main === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => handleMainChange(filter.value)}
                className={`flex items-center gap-2 py-2 px-3 md:px-4 rounded-xl cursor-pointer transition-all text-sm whitespace-nowrap
                  ${
                    isActive
                      ? "bg-support-teal text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }
                `}
              >
                {filter.value !== "all" && (
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: filter.color }}
                  />
                )}

                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {value.main === "reproduction" && (
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 my-3">
          {reproductiveHistoryFilters.map((filter) => {
            const checked = value.reproductiveEvents.includes(filter.value);

            return (
              <label
                key={filter.value}
                className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleReproductiveEventChange(filter.value)}
                  className="sr-only"
                />

                <span
                  className={`flex h-4 w-4 items-center rounded-sm justify-center border transition-colors
              ${
                checked
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300 bg-white"
              }
            `}
                >
                  {checked && (
                    <svg
                      viewBox="0 0 20 20"
                      className="h-3 w-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 10.5L8.5 14L15 6" />
                    </svg>
                  )}
                </span>

                <span className="whitespace-nowrap">{filter.label}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
