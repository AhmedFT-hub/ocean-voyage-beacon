
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useShipments } from "@/contexts/ShipmentContext";
import {
  BarChart2,
  Search,
  Bell,
  FileText,
  Users,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const Sidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();
  const { unreadAlertCount } = useShipments();
  const isAdmin = user?.role === "admin";
  
  // Navigation items
  const navItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: BarChart2,
      isActive: location.pathname === "/dashboard",
    },
    {
      title: "Tracking",
      path: "/tracking",
      icon: Search,
      isActive: location.pathname === "/tracking",
    },
    {
      title: "Alerts",
      path: "/alerts",
      icon: Bell,
      isActive: location.pathname === "/alerts",
      badge: unreadAlertCount > 0 ? unreadAlertCount : undefined,
    },
    {
      title: "Reports",
      path: "/reports",
      icon: FileText,
      isActive: location.pathname === "/reports",
    },
  ];
  
  // Admin-only items
  if (isAdmin) {
    navItems.push({
      title: "User Management",
      path: "/users",
      icon: Users,
      isActive: location.pathname === "/users",
    });
  }

  return (
    <SidebarComponent
      className={cn(
        "border-r bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-[64px]" : "w-60"
      )}
      collapsible
    >
      <div className="flex items-center h-16 px-2 border-b">
        <div 
          className={cn(
            "flex items-center transition-all duration-300", 
            collapsed ? "justify-center w-full" : "px-2"
          )}
        >
          {collapsed ? (
            <div className="flex items-center justify-center w-8 h-8 bg-ocean-700 text-white rounded-md">
              <span className="font-bold text-sm">OT</span>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-ocean-700 text-white rounded-md mr-2">
                <span className="font-bold text-sm">OT</span>
              </div>
              <span className="font-bold text-lg text-ocean-700">Ocean Tracking</span>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar trigger (hamburger) */}
      <SidebarTrigger className="absolute top-4 right-0 transform translate-x-1/2 bg-white border rounded-full p-1 shadow-md" />

      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className={cn(collapsed && "sr-only")}>
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center w-full py-2 px-3 rounded-md",
                        item.isActive
                          ? "bg-sidebar-accent text-sidebar-primary font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                      {!collapsed && item.badge !== undefined && (
                        <Badge className="ml-auto bg-ocean-500 text-white">
                          {item.badge}
                        </Badge>
                      )}
                      {collapsed && item.badge !== undefined && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-ocean-500 text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto mb-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="#"
                      className="flex items-center w-full py-2 px-3 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50"
                    >
                      <Settings className="h-5 w-5 shrink-0" />
                      {!collapsed && <span className="ml-3">Settings</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
