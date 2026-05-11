import { useLocation, useNavigate } from "react-router-dom";
import type { SidebarItemType } from "./SideBar.types";
import { item, itemActive, itemInactive } from "./SideBar.styles";

interface SidebarItemProps extends SidebarItemType {
  onNavigate?: () => void;
}

export function SidebarItem({
  label,
  icon: Icon,
  path,
  onNavigate,
}: SidebarItemProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive =
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const handleClick = () => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <div
      onClick={handleClick}
      className={`${item} ${isActive ? itemActive : itemInactive}`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </div>
  );
}
