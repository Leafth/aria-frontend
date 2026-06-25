import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { FunnelItem } from "@/features/reports/types/reports-view.types";

interface ChartBarMixedProps {
  title?: string;
  subtitle?: string;
  data: FunnelItem[];
}

export function ChartBarMixed({
  title = "Funil Reprodutivo",
  subtitle = "Ciclo Atual",
  data,
}: ChartBarMixedProps) {
  return (
    <Card className="w-full border border-gray-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between px-7 pt-8 pb-6">
        <CardTitle className="text-base font-semibold text-gray-900">
          {title}
        </CardTitle>

        <span className="text-sm font-medium text-gray-500">{subtitle}</span>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 px-7">
        {data.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[90px_1fr_48px] items-center gap-5"
          >
            <span className="text-xs font-medium text-gray-500">
              {item.label}
            </span>

            <div className="h-8 w-full">
              <div
                className="h-full rounded-lg"
                style={{
                  width: item.barWidth,
                  backgroundColor: item.color,
                }}
              />
            </div>

            <span className="text-center text-sm font-semibold text-gray-900">
              {item.value}
            </span>
          </div>
        ))}
      </CardContent>

      <CardFooter className="mt-5 flex-col items-start gap-2 px-7 pb-6 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-gray-900">
          Trending up by 5.2% this month
          <TrendingUp className="h-4 w-4" />
        </div>

        <div className="leading-none text-gray-500">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
