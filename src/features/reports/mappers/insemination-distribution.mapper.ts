import type { DonutChartOption } from "../components/charts/reports-donut/types";
import type { InseminationDistributionApi } from "../types/reports-api.types";

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
      slices: data.method.map((item) => ({
        id: item.method,
        label: METHOD_LABELS[item.method] ?? item.method,
        value: item.total,
      })),
      legendItems: data.method.map((item) => ({
        id: item.method,
        label: METHOD_LABELS[item.method] ?? item.method,
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
      slices: data.bull.map((item) => ({
        id: item.bull_id,
        label: item.bull_name,
        value: item.total,
      })),
      legendItems: data.bull.map((item) => ({
        id: item.bull_id,
        label: item.bull_name,
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
      slices: data.company.map((item) => ({
        id: item.company,
        label: item.company,
        value: item.total,
      })),
      legendItems: data.company.map((item) => ({
        id: item.company,
        label: item.company,
        description: `Participação: ${formatRate(item.rate)}`,
        subDescription: `Total: ${item.total} de ${artificialInseminationTotal}`,
      })),
    },
  ];
}
