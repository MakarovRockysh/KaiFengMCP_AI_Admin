import { Outlet, NavLink, useLocation } from "react-router";
import {
  ShoppingCart,
  CreditCard,
  MessageSquare,
  BarChart3,
  Users,
  Shield,
  FileText,
  LayoutDashboard,
  Bot,
  ChevronDown,
  Bell,
  Search,
  Menu,
} from "lucide-react";
import { useState } from "react";

const navGroups = [
  {
    label: "概览",
    items: [
      { to: "/", icon: LayoutDashboard, label: "控制台" },
    ],
  },
  {
    label: "网上商城",
    items: [
      { to: "/orders", icon: ShoppingCart, label: "订单管理" },
      { to: "/payments", icon: CreditCard, label: "支付管理" },
    ],
  },
  {
    label: "意见建议",
    items: [
      { to: "/feedback", icon: MessageSquare, label: "意见建议管理" },
    ],
  },
  {
    label: "数据统计与分析",
    items: [
      { to: "/analytics", icon: BarChart3, label: "数据统计与分析" },
    ],
  },
  {
    label: "基础功能",
    items: [
      { to: "/accounts", icon: Users, label: "账号管理" },
      { to: "/permissions", icon: Shield, label: "功能权限管理" },
      { to: "/logs", icon: FileText, label: "日志管理" },
    ],
  },
];

export default function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(navGroups.map((g) => [g.label, true]))
  );

  const currentPage =
    navGroups.flatMap((g) => g.items).find((i) => i.to === location.pathname)
      ?.label || "控制台";

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="flex h-screen bg-[#f5f6fa]">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-60" : "w-0 overflow-hidden"} transition-all duration-200 bg-[#1a1d2e] flex flex-col shrink-0`}
      >
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white text-sm">清园AI智能体</div>
            <div className="text-white/40 text-xs">后台管理系统</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-1">
              <button
                onClick={() => toggleGroup(group.label)}
                className="flex items-center justify-between w-full px-2 py-2 text-xs text-white/40 uppercase tracking-wider hover:text-white/60"
              >
                {group.label}
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${expandedGroups[group.label] ? "" : "-rotate-90"}`}
                />
              </button>
              {expandedGroups[group.label] && (
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive
                            ? "bg-blue-600/20 text-blue-400"
                            : "text-white/70 hover:bg-white/5 hover:text-white"
                        }`
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="px-4 py-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
              管
            </div>
            <div>
              <div className="text-white text-xs">管理员</div>
              <div className="text-white/40 text-xs">admin@qingyuan.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5 text-gray-500" />
            </button>
            <h2 className="text-base text-gray-800">{currentPage}</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5 gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索..."
                className="bg-transparent border-none outline-none text-sm w-40 placeholder:text-gray-400"
              />
            </div>
            <button className="relative p-1.5 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
