import { ChartColumnIncreasing, Home, Tags, TestTube } from "lucide-react";
import type { SidebarSection } from "./SideBar.types";

export const sections: SidebarSection[] = [
  {
    title: "PRINCIPAL",
    items: [
      { label: "Página Principal", icon: Home, path: "/home" },
      { label: "Rebanho", icon: Tags, path: "/flock" },
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
      { label: "Relatórios", icon: ChartColumnIncreasing, path: "/reports" },
    ],
  },
];