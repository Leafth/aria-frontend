import { ChartColumnIncreasing, HeartPulse, Home, RefreshCw, Tags, TestTube } from "lucide-react";
import type { SidebarSection } from "./SideBar.types";

export const sections: SidebarSection[] = [
  {
    title: "PRINCIPAL",
    items: [
      { label: "Dashboard", icon: Home, path: "/dashboard" },
      { label: "Rebanho", icon: Tags, path: "/flock" },
    ],
  },
  {
    title: "REPRODUÇÃO",
    items: [
      { label: "Ciclo Reprodutivo", icon: RefreshCw, path: "/ciclo" },
      { label: "Parto e Lactação", icon: HeartPulse, path: "/parto" },
    ],
  },
  {
    title: "CADASTROS",
    items: [
      {
        label: "Apoios Reprodutivos",
        icon: TestTube,
        path: "/reproductive-support",
      },
    ],
  },
  {
    title: "ANÁLISES",
    items: [
      { label: "Relatórios", icon: ChartColumnIncreasing, path: "/relatorios" },
    ],
  },
];