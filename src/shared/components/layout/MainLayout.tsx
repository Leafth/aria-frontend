import { Outlet } from "react-router-dom";
import { Sidebar } from "@/shared/components/ui/sidebar";

export function MainLayout() {
  return (
    <div className="h-dvh overflow-hidden">
      <main className="flex h-full bg-background-primary gap-2 overflow-hidden">
        <Sidebar />
        <div className="flex-1 min-w-0 overflow-y-auto overflow-x-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
