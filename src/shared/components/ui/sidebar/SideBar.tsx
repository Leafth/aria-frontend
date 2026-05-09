import Logo from "@/assets/icons/logo.svg";
import { LogOut } from "lucide-react";
import { SidebarItem } from "./SideBarItem";
import {
  container,
  header,
  section,
  sectionTitle,
  footer,
} from "./SideBar.styles";
import { sections } from "./SideBarItems";
import { useLogout } from "@/features/auth/hooks";

export function Sidebar() {
  const { handleLogout } = useLogout();

  return (
    <aside className={container}>
      <div>
        <div className={header}>
          <img src={Logo} className="w-16 h-16" />
          <span className="text-2xl font-semibold text-primary">Aria</span>
        </div>

        {sections.map((sectionData) => (
          <div key={sectionData.title} className={section}>
            <p className={sectionTitle}>{sectionData.title}</p>

            {sectionData.items.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        ))}
      </div>

      <div className={footer} onClick={handleLogout}>
        <LogOut size={18} />
        <span>Sair</span>
      </div>
    </aside>
  );
}
