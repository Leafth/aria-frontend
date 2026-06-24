export const reportsTableMock = [
  {
    id: "insemination-success",
    indicator: "Sucesso de\nInseminações",
    successes: {
      value: 12,
      label: "Confirmadas",
    },
    failures: {
      value: 3,
      label: "Negadas",
    },
    total: {
      value: 15,
      label: "Exames",
    },
    rate: 80,
    variation: 1.33,
  },
  {
    id: "heat-with-coverage",
    indicator: "Cios com\nCobertura",
    successes: {
      value: 12,
      label: "Com Cobertura",
    },
    failures: {
      value: 4,
      label: "Sem Cobertura",
    },
    total: {
      value: 22,
      label: "Cios",
    },
    rate: 81.82,
    variation: 1.33,
  },
  {
    id: "pregnancy-success",
    indicator: "Sucesso de\nPrenhez",
    successes: {
      value: 8,
      label: "Partos",
    },
    failures: {
      value: 2,
      label: "Interrupções",
    },
    total: {
      value: 10,
      label: "Encerradas",
    },
    rate: 80,
    variation: -10,
  },
];
