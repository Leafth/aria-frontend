import { Button } from "@/shared";

interface HistoryItem {
  title: string;
  description?: string;
  date: string;
  color: string;
}

interface Props {
  items: HistoryItem[];
  onViewAll?: () => void;
  isActive: boolean;
}

export function RecentHistoryCard({ items, onViewAll }: Props) {
  return (
    <div className="w-full bg-white rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-800">Histórico Recente</h2>

      <div className="flex flex-col">
        {items.map((item, index) => (
          <div key={index}>
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

            {index !== items.length - 1 && (
              <div className="border-t border-gray-300" />
            )}
          </div>
        ))}
      </div>

      <Button variant="ghost" onClick={onViewAll} className="w-full">
        Ver Histórico Completo
      </Button>
    </div>
  );
}
