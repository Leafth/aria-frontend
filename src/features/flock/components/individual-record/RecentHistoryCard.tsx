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
}

export function RecentHistoryCard({ items, onViewAll }: Props) {
  return (
    <div className="w-120 bg-white rounded-2xl p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-800">Histórico Recente</h2>

      <div className="flex flex-col">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex items-start justify-between py-4">
              {/* Lado esquerdo */}
              <div className="flex gap-3">
                <div
                  className="w-3 h-3 mt-1 rounded-full"
                  style={{ backgroundColor: item.color }}
                />

                <div>
                  <p className="font-medium text-gray-800">{item.title}</p>

                  {item.description && (
                    <p className="text-xs text-gray-500">{item.description}</p>
                  )}
                </div>
              </div>

              <span className="text-xs text-gray-400 whitespace-nowrap">
                {item.date}
              </span>
            </div>

            {index !== items.length - 1 && (
              <div className="border-t border-gray-300" />
            )}
          </div>
        ))}
      </div>

      <Button variant="ghost">
        Ver Histórico Completo
      </Button>
    </div>
  );
}
