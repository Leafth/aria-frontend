import { Home, BarChart } from "lucide-react";
import type { SidebarSection } from "./Sidebar.types";

export const sections: SidebarSection[] = [
  {
    title: "PRINCIPAL",
    items: [
      { label: "Dashboard", icon: Home, path: "/dashboard" },
      { label: "Rebanho", icon: Home, path: "/rebanho" },
    ],
  },
  {
    title: "REPRODUÇÃO",
    items: [
      { label: "Ciclo Reprodutivo", icon: Home, path: "/ciclo" },
      { label: "Parto e Lactação", icon: Home, path: "/parto" },
    ],
  },
  {
    title: "CADASTROS",
    items: [
      {
        label: "Apoios Reprodutivos",
        icon: Home,
        path: "/reproductive-support",
      },
    ],
  },
  {
    title: "ANÁLISES",
    items: [
      { label: "Relatórios", icon: BarChart, path: "/relatorios" },
    ],
  },
];