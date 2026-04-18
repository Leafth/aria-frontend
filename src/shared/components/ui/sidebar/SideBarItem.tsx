import { useLocation, useNavigate } from "react-router-dom";
import type { SidebarItemType } from "./SideBar.types";
import { item, itemActive, itemInactive } from "./SideBar.styles";

export function SidebarItem({ label, icon: Icon, path }: SidebarItemType) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === path;

  return (
    <div
      onClick={() => navigate(path)}
      className={`${item} ${isActive ? itemActive : itemInactive}`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </div>
  );
}
