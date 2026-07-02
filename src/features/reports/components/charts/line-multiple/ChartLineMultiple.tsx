import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { RatesEvolutionChartItem } from "@/features/reports/types/reports-view.types";

type SelectedRate = "all" | "inseminacao" | "cobertura" | "prenhez";

interface ChartLineMultipleProps {
  data: RatesEvolutionChartItem[];
  title?: string;
  subtitle?: string;
}

const chartConfig = {
  inseminacao: {
    label: "Inseminação",
    color: "#EA604C",
  },
  cobertura: {
    label: "Cobertura",
    color: "#279B8F",
  },
  prenhez: {
    label: "Prenhez",
    color: "#C000C8",
  },
} satisfies ChartConfig;

export function ChartLineMultiple({
  data,
  title = "Evolução das Taxas (%)",
  subtitle = "Últimos 12 meses",
}: ChartLineMultipleProps) {
  const [selectedRate, setSelectedRate] = React.useState<SelectedRate>("all");

  const showInseminacao =
    selectedRate === "all" || selectedRate === "inseminacao";

  const showCobertura = selectedRate === "all" || selectedRate === "cobertura";

  const showPrenhez = selectedRate === "all" || selectedRate === "prenhez";

  return (
    <Card className="w-full border border-gray-200 bg-white shadow-sm">
      <CardHeader className="grid grid-cols-[1fr_auto_auto] items-center gap-10 px-7 pt-7 pb-2">
        <CardTitle className="text-base font-semibold text-gray-900">
          {title}
        </CardTitle>

        <span className="text-sm text-gray-400">{subtitle}</span>

        <Select
          value={selectedRate}
          onValueChange={(value) => setSelectedRate(value as SelectedRate)}
        >
          <SelectTrigger className="h-10 w-40 rounded-lg border-gray-200 bg-white text-sm">
            <SelectValue />
          </SelectTrigger>

          <SelectContent align="end" className="rounded-xl cursor-pointer">
            <SelectItem value="all" className="cursor-pointer">
              Todas
            </SelectItem>
            <SelectItem value="inseminacao" className="cursor-pointer">
              Inseminação
            </SelectItem>
            <SelectItem value="cobertura" className="cursor-pointer">
              Cobertura
            </SelectItem>
            <SelectItem value="prenhez" className="cursor-pointer">
              Prenhez
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-7 pb-6">
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 30,
              right: 10,
              left: -18,
              bottom: 18,
            }}
          >
            <CartesianGrid vertical={false} stroke="#E5E7EB" />

            <YAxis
              type="number"
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fontSize: 12, fill: "#4B5563" }}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            {showInseminacao && (
              <Line
                dataKey="inseminacao"
                type="bumpX"
                stroke="var(--color-inseminacao)"
                strokeWidth={2}
                dot={false}
              />
            )}

            {showCobertura && (
              <Line
                dataKey="cobertura"
                type="bumpX"
                stroke="var(--color-cobertura)"
                strokeWidth={2}
                dot={false}
              />
            )}

            {showPrenhez && (
              <Line
                dataKey="prenhez"
                type="bumpX"
                stroke="var(--color-prenhez)"
                strokeWidth={2}
                dot={false}
              />
            )}

            <ChartLegend
              content={<ChartLegendContent />}
              className="mt-5 justify-center gap-6"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
