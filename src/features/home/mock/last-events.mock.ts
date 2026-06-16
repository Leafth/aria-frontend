export interface LastEventMock {
  id: string;
  event: string;
  cow: string;
}

export const lastEventsMock: LastEventMock[] = [
  {
    id: "1",
    event: "Cio Registrado",
    cow: "Estrela (BRC-001)",
  },
  {
    id: "2",
    event: "Cobertura Realizada",
    cow: "Sol (BRC-002)",
  },
  {
    id: "3",
    event: "Parto Registrado",
    cow: "Lua (BRC-003)",
  },
  {
    id: "4",
    event: "Matriz Inativada",
    cow: "Cometa (BRC-004)",
  },
  {
    id: "5",
    event: "Matriz Cadastrada",
    cow: "Galáxia (BRC-005)",
  },
];
