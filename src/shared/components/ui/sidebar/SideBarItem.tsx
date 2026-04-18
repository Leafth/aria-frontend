import { useLocation, useNavigate } from "react-router-dom";
import type { SidebarItemType } from "./SideBar.types";
import {
  item,
  itemActive,
  itemInactive,
  itemCollapsed,
  itemActiveCollapsed,
  itemInactiveCollapsed,
} from "./SideBar.styles";

interface SidebarItemProps extends SidebarItemType {
  isCollapsed?: boolean;
}

export function SidebarItem({
  label,
  icon: Icon,
  path,
  isCollapsed = false,
}: SidebarItemProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === path;

  const baseClass = isCollapsed ? itemCollapsed : item;
  const activeClass = isCollapsed ? itemActiveCollapsed : itemActive;
  const inactiveClass = isCollapsed ? itemInactiveCollapsed : itemInactive;

  return (
    <div
      onClick={() => navigate(path)}
      className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
      title={isCollapsed ? label : undefined}
    >
      <Icon size={20} />
      {!isCollapsed && <span>{label}</span>}
    </div>
  );
}
