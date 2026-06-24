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

const chartData = [
  {
    month: "Jan",
    inseminacao: 53,
    cobertura: 70,
    prenhez: 28,
  },
  {
    month: "Feb",
    inseminacao: 72,
    cobertura: 87,
    prenhez: 60,
  },
  {
    month: "Mar",
    inseminacao: 58,
    cobertura: 75,
    prenhez: 47,
  },
  {
    month: "Apr",
    inseminacao: 70,
    cobertura: 52,
    prenhez: 58,
  },
  {
    month: "May",
    inseminacao: 60,
    cobertura: 72,
    prenhez: 49,
  },
  {
    month: "Jun",
    inseminacao: 63,
    cobertura: 74,
    prenhez: 52,
  },
];

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

export function ChartLineMultiple() {
  const [selectedMetric, setSelectedMetric] = React.useState("inseminacoes");

  return (
    <Card className="w-full border border-gray-200 bg-white shadow-sm">
      <CardHeader className="grid grid-cols-[1fr_auto_auto] items-center gap-10 px-7 pt-7 pb-2">
        <CardTitle className="text-base font-semibold text-gray-900">
          Evolução das Taxas (%)
        </CardTitle>

        <span className="text-sm text-gray-400">Últimos 6 meses</span>

        <Select value={selectedMetric} onValueChange={setSelectedMetric}>
          <SelectTrigger className="h-10 w-40 rounded-lg border-gray-200 bg-white text-sm">
            <SelectValue />
          </SelectTrigger>

          <SelectContent align="end" className="rounded-xl">
            <SelectItem value="inseminacoes">Inseminações</SelectItem>
            <SelectItem value="coberturas">Coberturas</SelectItem>
            <SelectItem value="prenhez">Prenhez</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-7 pb-6">
        <ChartContainer config={chartConfig} className="h-70 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 16,
              right: 10,
              left: -18,
              bottom: 18,
            }}
          >
            <CartesianGrid vertical={false} stroke="#E5E7EB" />

            <YAxis
              type="number"
              domain={[25, 90]}
              ticks={[25, 53, 68, 76, 90]}
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

            <Line
              dataKey="inseminacao"
              type="natural"
              stroke="var(--color-inseminacao)"
              strokeWidth={2}
              dot={false}
            />

            <Line
              dataKey="cobertura"
              type="natural"
              stroke="var(--color-cobertura)"
              strokeWidth={2}
              dot={false}
            />

            <Line
              dataKey="prenhez"
              type="natural"
              stroke="var(--color-prenhez)"
              strokeWidth={2}
              dot={false}
            />

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
