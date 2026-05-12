import type { HistoryListItemProps } from "./recent-history.types";

export function HistoryListItem({ item, showDivider }: HistoryListItemProps) {
  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between py-4">
        <div className="flex gap-3">
          <div
            className="w-3 h-3 mt-1 rounded-full shrink-0"
            style={{ backgroundColor: item.color }}
          />

          <div className="min-w-0">
            <p className="font-medium text-gray-800">{item.title}</p>

            {item.description && (
              <p className="text-xs text-gray-500">{item.description}</p>
            )}
          </div>
        </div>

        <span className="text-xs text-gray-400 whitespace-nowrap sm:ml-4">
          {item.date}
        </span>
      </div>

      {showDivider && <div className="border-t border-gray-300" />}
    </div>
  );
}
