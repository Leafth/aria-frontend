import { HistoryListItem } from "./HistoryListItem";
import type { HistoryListProps } from "./recent-history.types";

export function HistoryList({ items }: HistoryListProps) {
  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <HistoryListItem
          key={`${item.title}-${item.date}-${index}`}
          item={item}
          showDivider={index !== items.length - 1}
        />
      ))}
    </div>
  );
}