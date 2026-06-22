import type { InfoCardItem, ReproductiveSummaryApi } from "../types";

export function mapReproductiveSummaryToInfoCards(
  data: ReproductiveSummaryApi,
): InfoCardItem[] {
  return [
    {
      id: "total",
      value: data.total,
      title: "Total matrizes",
      description: `${data.active} ativas e ${data.inactive} inativas`,
    },
    {
      id: "open",
      value: data.open,
      title: "Aguardando Cio",
    },
    {
      id: "in-heat",
      value: data.in_heat,
      title: "Em Cio",
    },
    {
      id: "inseminated",
      value: data.inseminated,
      title: "Cobertura Realizada",
    },
    {
      id: "pregnant",
      value: data.pregnant,
      title: "Prenha",
    },
  ];
}
