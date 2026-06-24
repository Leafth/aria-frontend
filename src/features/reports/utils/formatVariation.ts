import { formatPercentage } from "./formatPercentage";

export function formatVariation(value: number) {
  const signal = value > 0 ? "+" : "";

  return `${signal}${formatPercentage(value)}`;
}
