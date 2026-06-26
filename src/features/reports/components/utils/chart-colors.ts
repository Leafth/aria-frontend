const DEFAULT_COLORS = ["#299D8F", "#EA694A", "#C000C8", "#E2BE83", "#70BF72"];

export function getChartColor(index: number) {
  if (DEFAULT_COLORS[index]) {
    return DEFAULT_COLORS[index];
  }

  const hue = ((index - DEFAULT_COLORS.length) * 137.508) % 360;

  return `hsl(${hue}, 65%, 50%)`;
}