export interface InfoCardItem {
  id: string;
  value: number;
  title: string;
  description?: string;
}

export interface InfoCardsProps {
  data: InfoCardItem[];
}