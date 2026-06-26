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

import type { DonutChartOption } from "./types";
import { getChartColor } from "../../utils/chart-colors";

interface ChartPieInteractiveProps {
  title: string;
  description: string;
  options: DonutChartOption[];
  defaultValue?: string;
}

const chartConfig = {
  value: {
    label: "Valor",
  },
} satisfies ChartConfig;

export function ChartPieInteractive({
  title,
  description,
  options,
  defaultValue,
}: ChartPieInteractiveProps) {
  const id = React.useId();

  const [selectedValue, setSelectedValue] = React.useState(defaultValue ?? "");

  React.useEffect(() => {
    if (options.length === 0) {
      return;
    }

    const hasSelectedValue = options.some(
      (option) => option.value === selectedValue,
    );

    if (hasSelectedValue) {
      return;
    }

    const defaultOption = options.find(
      (option) => option.value === defaultValue,
    );

    setSelectedValue(defaultOption?.value ?? options[0].value);
  }, [options, defaultValue, selectedValue]);

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

  const selectedOption =
    options.find((option) => option.value === selectedValue) ?? options[0];

  if (!selectedOption) {
    return (
      <Card className="w-full border border-gray-200 bg-white p-5 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-900">
            {title}
          </CardTitle>

          <CardDescription className="text-sm text-gray-500">
            Nenhum dado disponível.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const chartData = selectedOption.slices.map((slice, index) => ({
    status: slice.id,
    label: slice.label,
    value: slice.value,
    fill: slice.color ?? getChartColor(index),
  }));

  return (
    <Card
      data-chart={id}
      className="w-full border border-gray-200 bg-white p-5 shadow-sm"
    >
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
          <SelectTrigger className="h-9 w-36 rounded-lg border-gray-200 bg-white text-sm">
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
                  <span
                    className="h-3 w-3 rounded-sm"
                    style={{
                      backgroundColor:
                        option.slices[0]?.color ?? getChartColor(0),
                    }}
                  />
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="grid grid-cols-1 items-center gap-6 pb-8 md:grid-cols-[1fr_190px]">
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
              nameKey="label"
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
                        {selectedOption.centerValue}
                      </tspan>

                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 22}
                        className="fill-gray-500 text-xs"
                      >
                        {selectedOption.centerLabel}
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
              {selectedOption.legendTitle}
            </h3>

            {selectedOption.legendSubtitle && (
              <p className="mt-1 text-sm text-gray-400">
                {selectedOption.legendSubtitle}
              </p>
            )}
          </div>

          <div className="flex max-h-34 flex-col gap-4 overflow-y-auto pr-2">
            {selectedOption.legendItems.map((item, index) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-6 text-sm"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-1 h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: item.color ?? getChartColor(index),
                    }}
                  />

                  <div>
                    <p className="text-gray-900">{item.label}</p>

                    {item.description && (
                      <p className="mt-1 text-xs text-gray-900">
                        {item.description}
                      </p>
                    )}

                    {item.subDescription && (
                      <p className="mt-1 text-xs text-gray-400">
                        {item.subDescription}
                      </p>
                    )}
                  </div>
                </div>

                {item.value !== undefined && (
                  <span className="font-medium text-gray-900">
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
