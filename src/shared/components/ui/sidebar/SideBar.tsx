import Logo from "@/assets/icons/logo.svg";
import { LogOut, PanelLeftClose } from "lucide-react";
import { SidebarItem } from "./SideBarItem";
import {
  container,
  header,
  section,
  sectionTitle,
  footer,
  mobileCloseButton,
} from "./SideBar.styles";
import { sections } from "./SideBarItems";
import { useLogout } from "@/features/auth/hooks";

interface SidebarProps {
  onCloseMobile?: () => void;
}

export function Sidebar({ onCloseMobile }: SidebarProps) {
  const { handleLogout } = useLogout();

  return (
    <aside className={container}>
      <div>
        <div className={header}>
          <div className="flex items-center gap-3">
            <img src={Logo} className="w-16 h-16" />
            <span className="text-2xl font-semibold text-primary">Aria</span>
          </div>

          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className={mobileCloseButton}
              title="Fechar menu"
            >
              <PanelLeftClose size={22} />
            </button>
          )}
        </div>

        {sections.map((sectionData) => (
          <div key={sectionData.title} className={section}>
            <p className={sectionTitle}>{sectionData.title}</p>

            {sectionData.items.map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
                onNavigate={onCloseMobile}
              />
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
