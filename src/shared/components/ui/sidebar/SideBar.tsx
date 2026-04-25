import Logo from "@/assets/icons/logo.svg";
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { SidebarItem } from "./SideBarItem";
import {
  container,
  containerCollapsed,
  header,
  headerCollapsed,
  section,
  sectionCollapsed,
  sectionTitle,
  sectionTitleCollapsed,
  footer,
  toggleButton,
} from "./SideBar.styles";
import { sections } from "./SideBarItems";
import { useState } from "react";
import { useLogout } from "@/features/auth/hooks";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { handleLogout } = useLogout();

  return (
    <aside className={`${isCollapsed ? containerCollapsed : container} relative`}>
      <div>
        <div className={isCollapsed ? headerCollapsed : header}>
          <img src={Logo} className={isCollapsed ? "w-12 h-12" : "w-16 h-16"} />
          {!isCollapsed && <span className="text-2xl font-semibold text-primary">Aria</span>}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={toggleButton}
          title={isCollapsed ? "Expandir" : "Colapsar"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        {sections.map((sectionData) => (
          <div key={sectionData.title} className={isCollapsed ? sectionCollapsed : section}>
            <p className={isCollapsed ? sectionTitleCollapsed : sectionTitle}>
              {sectionData.title}
            </p>

            {sectionData.items.map((item) => (
              <SidebarItem key={item.label} {...item} isCollapsed={isCollapsed} />
            ))}
          </div>
        ))}
      </div>

      <div className={footer} onClick={handleLogout}>
        <LogOut size={18} />
        {!isCollapsed && <span>Sair</span>}
      </div>
    </aside>
  );
}
