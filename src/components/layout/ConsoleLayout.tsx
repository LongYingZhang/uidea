import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { clearSession } from "../../lib/auth";

const groups = [
  {
    title: "基础资料",
    items: [
      { to: "/console/profile", label: "个人资料", icon: "badge" },
      { to: "/console/account", label: "账号管理", icon: "manage_accounts" },
    ],
  },
  {
    title: "我的资产",
    items: [
      { to: "/console/works", label: "作品管理", icon: "folder_special" },
      { to: "/console/courses", label: "课程管理", icon: "school" },
      { to: "/console/tasks", label: "任务管理", icon: "assignment" },
    ],
  },
  {
    title: "消息中心",
    items: [
      {
        to: "/console/notifications",
        label: "通知",
        icon: "notifications_none",
      },
      { to: "/console/messages", label: "沟通", icon: "chat" },
    ],
  },
];

const flatItems = groups.flatMap((g) => g.items);

function SidebarNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();
    navigate("/login");
  };

  return (
    <>
      <div className="flex-1 space-y-6 overflow-y-auto px-4">
        {groups.map((group) => (
          <div key={group.title} className="space-y-1">
            <div className="ui-text-label px-3 py-1 uppercase tracking-wider text-[#9ea1a2]">
              {group.title}
            </div>
            <nav className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `ui-chip w-full justify-start gap-2 ${
                      isActive ? "is-active" : "hover:bg-[#1c1b1b]"
                    }`
                  }
                >
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </div>
      <div className="border-t border-[#1f1f1f] px-4 pt-3">
        <button
          type="button"
          onClick={handleLogout}
          className="ui-chip w-full justify-start gap-2 hover:bg-[#1c1b1b]"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>退出登录</span>
        </button>
      </div>
    </>
  );
}

export function ConsoleLayout() {
  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-clip bg-[#131313] text-white">
      <SiteHeader />

      <aside className="fixed bottom-0 left-0 top-16 z-40 hidden w-64 flex-col justify-between border-r border-[#1f1f1f] bg-[#0e0e0e] py-6 lg:flex">
        <SidebarNav />
      </aside>

      <div className="lg:pl-64">
        <main className="relative min-h-screen w-full bg-[#131313] px-margin pb-10 pt-16 sm:pb-12">
          <nav
            className="mb-6 flex gap-2 overflow-x-auto py-4 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="控制台导航"
          >
            {flatItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `ui-chip shrink-0 ${isActive ? "is-active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
