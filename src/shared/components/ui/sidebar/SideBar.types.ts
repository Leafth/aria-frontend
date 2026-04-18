import type { LucideIcon } from "lucide-react";

export interface SidebarItemType {
  label: string;
  icon: LucideIcon;
  path: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarItemType[];
}