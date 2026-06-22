import type { LastEventItem } from "../../types/home-view.types";
import { Card } from "../Card";

interface LastEventsCardProps {
  data: LastEventItem[];
}

export function LastEventsCard({ data }: LastEventsCardProps) {
  const visibleEvents = data.slice(0, 5);
  const hasEvents = data.length > 0;

  return (
    <Card title="Últimos eventos registrados">
      <main className="flex flex-col gap-8 mt-2">
        {!hasEvents && (
          <p className="text-sm text-gray-400">
            Não há eventos registrados no momento.
          </p>
        )}

        {visibleEvents.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <span className="shrink-0 text-sm font-medium text-gray-900">
              {item.event}
            </span>

            <div className="h-px flex-1 bg-gray-200" />

            <span className="shrink-0 text-sm font-medium text-gray-900">
              {item.cow}
            </span>
          </div>
        ))}
      </main>
    </Card>
  );
}
