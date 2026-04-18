import { Outlet } from "react-router-dom";
import { Sidebar } from "../ui/sidebar";

export function MainLayout() {
  return (
    <div>
      <main className="flex bg-background-primary gap-2">
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
}
