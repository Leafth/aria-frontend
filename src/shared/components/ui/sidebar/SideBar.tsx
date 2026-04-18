import Logo from "../../../../assets/icons/logo.svg";
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
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className={container}>
      <div>
        <div className={header}>
          <img src={Logo} className="w-20 h-20" />
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

      <div className={footer} onClick={() => navigate("/login")}>
        <LogOut size={18} />
        <span>Sair</span>
      </div>
    </aside>
  );
}
