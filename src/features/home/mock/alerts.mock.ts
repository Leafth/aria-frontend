export interface AlertMock {
  id: string;
  cowId: string;
  title: string;
  color: string;
}

export const alertsMock: AlertMock[] = [
  {
    id: "1",
    cowId: "1",
    title: "Estrela (BRC-042): 3 dias para o parto",
    color: "#F43F3F",
  },
  {
    id: "2",
    cowId: "2",
    title: "Lua (BRC-018): abaixo do peso",
    color: "#FACC15",
  },
  {
    id: "1",
    cowId: "1",
    title: "Estrela (BRC-042): 3 dias para o parto",
    color: "#0820f7",
  },
  {
    id: "2",
    cowId: "2",
    title: "Lua (BRC-018): abaixo do peso",
    color: "#15fa34",
  },
];
