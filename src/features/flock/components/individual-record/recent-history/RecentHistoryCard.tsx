import { Button } from "@/shared";
import type { RecentHistoryCardProps } from "./recent-history.types";
import { HistoryList } from "./HistoryList";

export function RecentHistoryCard({
  items,
  onViewAll,
  showViewAllButton,
}: RecentHistoryCardProps) {
  const visibleItems = showViewAllButton ? items.slice(0, 2) : items;

  return (
    <div className="w-full bg-white rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-800">Histórico Completo</h2>

      <HistoryList items={visibleItems} />

      {showViewAllButton && (
        <Button variant="ghost" onClick={onViewAll} className="w-full">
          Ver Histórico Completo
        </Button>
      )}
    </div>
  );
}
