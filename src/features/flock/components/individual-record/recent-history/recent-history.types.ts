export type HistoryType = "Peso" | "Cio" | "Cobertura" | "Prenhez" | "Parto";

export interface HistoryItem {
  title: string;
  description?: string;
  date: string;
  color: string;
  type: HistoryType;
}

export interface RecentHistoryCardProps {
  items: HistoryItem[];
  onViewAll?: () => void;
  isActive?: boolean;
  showViewAllButton?: boolean;
}

export interface HistoryListProps {
  items: HistoryItem[];
}

export interface HistoryListItemProps {
  item: HistoryItem;
  showDivider: boolean;
}