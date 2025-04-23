
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Car, 
  Settings, 
  ChartBar,
  Gauge,
  Menu
} from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Cars",
      href: "/cars",
      icon: Car,
    },
    {
      title: "Maintenance",
      href: "/maintenance",
      icon: Gauge,
    },
    {
      title: "Reports",
      href: "/reports",
      icon: ChartBar,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  // Auto-collapse sidebar on mobile and handle visibility
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  return (
    <>
      {isMobile && (
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="fixed z-50 bottom-4 right-4 bg-navy text-white p-3 rounded-full shadow-lg"
        >
          <Menu size={24} />
        </button>
      )}
      <aside
        className={cn(
          "bg-navy text-white transition-all duration-300 ease-in-out",
          isMobile 
            ? cn("fixed z-40 top-0 left-0 h-full", mobileOpen ? "w-64" : "-translate-x-full w-64")
            : cn("h-screen", collapsed ? "w-16" : "w-64")
        )}
      >
      <div className="flex items-center justify-between h-16 p-4 border-b border-navy-light">
        {!collapsed && (
          <Link to="/" className="text-xl font-bold">
            Car Manager
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto text-white hover:bg-navy-light"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "→" : "←"}
        </Button>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors",
                  location.pathname === item.href
                    ? "bg-amber text-navy"
                    : "text-white hover:bg-navy-light",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
    {isMobile && mobileOpen && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-30"
        onClick={() => setMobileOpen(false)}
      />
    )}
    </>
  );
};

export default Sidebar;
