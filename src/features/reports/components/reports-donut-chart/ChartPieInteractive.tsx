import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import type { PieSectorShapeProps } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartStyle,
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

interface SuccessPieOption {
  value: string;
  label: string;
  confirmedLabel: string;
  deniedLabel: string;
  confirmedValue: number;
  deniedValue: number;
}

interface ChartPieInteractiveProps {
  title: string;
  description: string;
  options: SuccessPieOption[];
  defaultValue?: string;
}

const chartConfig = {
  confirmed: {
    label: "Confirmadas",
    color: "#299D8F",
  },
  denied: {
    label: "Negadas",
    color: "#EA694A",
  },
} satisfies ChartConfig;

export function ChartPieInteractive({
  title,
  description,
  options,
  defaultValue,
}: ChartPieInteractiveProps) {
  const id = React.useId();

  const [selectedValue, setSelectedValue] = React.useState(
    defaultValue ?? options[0]?.value,
  );

  const selectedOption =
    options.find((option) => option.value === selectedValue) ?? options[0];

  const total = selectedOption.confirmedValue + selectedOption.deniedValue;

  const successRate =
    total > 0 ? Math.round((selectedOption.confirmedValue / total) * 100) : 0;

  const chartData = [
    {
      status: "confirmed",
      value: selectedOption.confirmedValue,
      fill: "var(--color-confirmed)",
    },
    {
      status: "denied",
      value: selectedOption.deniedValue,
      fill: "var(--color-denied)",
    },
  ];

  const renderPieShape = React.useCallback(
    ({ index, outerRadius = 0, ...props }: PieSectorShapeProps) => {
      if (index === 0) {
        return (
          <g>
            <Sector {...props} outerRadius={outerRadius + 8} />
            <Sector
              {...props}
              outerRadius={outerRadius + 20}
              innerRadius={outerRadius + 11}
            />
          </g>
        );
      }

      return <Sector {...props} outerRadius={outerRadius} />;
    },
    [],
  );

  return (
    <Card
      data-chart={id}
      className="w-full border border-gray-200 bg-white shadow-sm p-5"
    >
      <ChartStyle id={id} config={chartConfig} />

      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
        <div className="grid gap-1">
          <CardTitle className="text-base font-semibold text-gray-900">
            {title}
          </CardTitle>

          <CardDescription className="text-sm text-gray-500">
            {description}
          </CardDescription>
        </div>

        <Select value={selectedValue} onValueChange={setSelectedValue}>
          <SelectTrigger className="h-9 w-32 rounded-lg border-gray-200 bg-white text-sm">
            <SelectValue />
          </SelectTrigger>

          <SelectContent align="end" className="rounded-xl">
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-[#299D8F]" />
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="grid grid-cols-1 items-center gap-6 pb-8 md:grid-cols-[1fr_170px]">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square h-57.5 w-full max-w-65"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              innerRadius={58}
              outerRadius={92}
              strokeWidth={0}
              shape={renderPieShape}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                    return null;
                  }

                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) - 4}
                        className="fill-gray-900 text-3xl font-bold"
                      >
                        {successRate}%
                      </tspan>

                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 22}
                        className="fill-gray-500 text-xs"
                      >
                        taxa
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Taxa de Sucesso
            </h3>

            <p className="mt-1 text-sm text-gray-400">Total - {total}</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-6 text-sm">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#299D8F]" />
                <span className="text-gray-900">
                  {selectedOption.confirmedLabel}
                </span>
              </div>

              <span className="font-medium text-gray-900">
                {selectedOption.confirmedValue}
              </span>
            </div>

            <div className="flex items-center justify-between gap-6 text-sm">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#EA694A]" />
                <span className="text-gray-900">
                  {selectedOption.deniedLabel}
                </span>
              </div>

              <span className="font-medium text-gray-900">
                {selectedOption.deniedValue}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
