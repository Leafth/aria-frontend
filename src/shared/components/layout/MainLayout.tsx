import { Outlet } from "react-router-dom";
import { Sidebar } from "@/shared/components/ui/sidebar";
import { PanelLeftOpen } from "lucide-react";
import { useState } from "react";

export function MainLayout() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openSidebar = () => {
    setIsVisible(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsAnimating(true));
    });
  };

  const closeSidebar = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  return (
    <div className="h-dvh overflow-hidden bg-background-primary">
      <main className="flex h-full overflow-hidden">
        <div className="hidden md:block shrink-0">
          <Sidebar />
        </div>

        {isVisible && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              aria-label="Fechar menu"
              className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ease-out ${
                isAnimating ? "opacity-100" : "opacity-0"
              }`}
              onClick={closeSidebar}
            />
            <div
              className={`absolute top-0 left-0 w-64 h-full bg-white shadow-xl transition-transform duration-300 ease-out z-10 ${
                isAnimating ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <Sidebar onCloseMobile={closeSidebar} />
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0 overflow-y-auto overflow-x-auto">
          <div className="md:hidden sticky top-0 z-40 bg-background-primary px-4 py-3">
            <button
              type="button"
              onClick={openSidebar}
              className="p-2 rounded-lg bg-white border border-gray-200 shadow-sm"
              title="Abrir menu"
            >
              <PanelLeftOpen size={22} />
            </button>
          </div>

          <Outlet />
        </div>
      </main>
    </div>
  );
}
