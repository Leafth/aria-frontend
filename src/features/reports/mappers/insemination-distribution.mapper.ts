import type { DonutChartOption } from "../components/charts/reports-donut/types";
import type { InseminationDistributionApi } from "../types/reports-api.types";

const COLORS = ["#299D8F", "#EA694A", "#C000C8", "#E2BE83", "#70BF72"];

const METHOD_LABELS: Record<string, string> = {
  natural_mating: "Monta Natural",
  artificial_insemination: "Inseminação Artificial",
};

function formatRate(value: number) {
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}%`;
}

export function mapInseminationDistributionToChartOptions(
  data: InseminationDistributionApi,
): DonutChartOption[] {
  const generalTotal = data.total;

  const artificialInseminationTotal =
    data.method.find((item) => item.method === "artificial_insemination")
      ?.total ?? 0;

  return [
    {
      value: "method",
      label: "Método",
      centerValue: generalTotal,
      centerLabel: "coberturas",
      legendTitle: "Método",
      legendSubtitle: `Total - ${generalTotal}`,
      slices: data.method.map((item, index) => ({
        id: item.method,
        label: METHOD_LABELS[item.method] ?? item.method,
        value: item.total,
        color: COLORS[index] ?? "#999999",
      })),
      legendItems: data.method.map((item, index) => ({
        id: item.method,
        label: METHOD_LABELS[item.method] ?? item.method,
        color: COLORS[index] ?? "#999999",
        description: `Participação: ${formatRate(item.rate)}`,
        subDescription: `Total: ${item.total} de ${generalTotal}`,
      })),
    },
    {
      value: "bull",
      label: "Touro",
      centerValue: generalTotal,
      centerLabel: "coberturas",
      legendTitle: "Touros",
      legendSubtitle: `Total - ${generalTotal}`,
      slices: data.bull.map((item, index) => ({
        id: item.bull_id,
        label: item.bull_name,
        value: item.total,
        color: COLORS[index] ?? "#999999",
      })),
      legendItems: data.bull.map((item, index) => ({
        id: item.bull_id,
        label: item.bull_name,
        color: COLORS[index] ?? "#999999",
        description: `Participação: ${formatRate(item.rate)}`,
        subDescription: `Total: ${item.total} de ${generalTotal}`,
      })),
    },
    {
      value: "company",
      label: "Empresa",
      centerValue: artificialInseminationTotal,
      centerLabel: "inseminações",
      legendTitle: "Empresas",
      legendSubtitle: `Total - ${artificialInseminationTotal}`,
      slices: data.company.map((item, index) => ({
        id: item.company,
        label: item.company,
        value: item.total,
        color: COLORS[index] ?? "#999999",
      })),
      legendItems: data.company.map((item, index) => ({
        id: item.company,
        label: item.company,
        color: COLORS[index] ?? "#999999",
        description: `Participação: ${formatRate(item.rate)}`,
        subDescription: `Total: ${item.total} de ${artificialInseminationTotal}`,
      })),
    },
  ];
}
