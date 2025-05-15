
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";

const AppLayout = () => {
  return (
    <SidebarProvider collapsedWidth={64}>
      <div className="min-h-screen flex flex-col w-full">
        <TopBar />
        <div className="flex flex-1 w-full">
          <Sidebar />
          <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
