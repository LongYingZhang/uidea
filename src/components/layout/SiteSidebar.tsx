import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BrandLogo } from "../ui/BrandLogo";
import { clearSession, isAuthed } from "../../lib/auth";

export const SIDEBAR_EXPANDED = 200;
/** px-2 (8) + chip w-9 (36) + px-2 (8) — equal inset when collapsed */
export const SIDEBAR_COLLAPSED = 52;
/** Icon stroke weight — single knob (original 1.4) */
const ICON_STROKE = 1.4;

type NavItem = {
  to: string;
  label: string;
  icon: SidebarIconName;
  end?: boolean;
  badge?: string;
};

type NavGroup = {
  title?: string;
  items: NavItem[];
};

type SidebarIconName =
  | "grid_view"
  | "assignment"
  | "person_search"
  | "school"
  | "notifications"
  | "chat"
  | "profile"
  | "login";

export const sidebarGroups: NavGroup[] = [
  {
    title: "发现",
    items: [
      { to: "/", label: "广场", icon: "grid_view", end: true },
      { to: "/tasks", label: "任务", icon: "assignment" },
      { to: "/designers", label: "设计师", icon: "person_search" },
      { to: "/courses", label: "课程", icon: "school" },
    ],
  },
  {
    title: "消息",
    items: [
      { to: "/notifications", label: "通知", icon: "notifications", badge: "2" },
      { to: "/messages", label: "沟通", icon: "chat" },
    ],
  },
  {
    title: "个人",
    items: [{ to: "/profile", label: "个人资料", icon: "profile" }],
  },
];

type Props = {
  expanded: boolean;
  onToggle: () => void;
};

/**
 * Content stays at expanded width; the aside only clips on collapse.
 * Icons never reflow — no w-full → w-9 morph.
 */
export function SiteSidebar({ expanded, onToggle }: Props) {
  const navigate = useNavigate();
  const width = expanded ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED;

  return (
    <>
      {/* Corner: the sidebar hairline bends into the content edge with a 16px radius.
          Fixed + outside the aside so the aside's overflow clipping can't trim it. */}
      <span
        className="pointer-events-none fixed top-0 z-[45] h-4 w-4 rounded-tl-[16px] border-l border-t border-[#1f1f1f] transition-[left] duration-200 ease-out"
        style={{ left: width - 1 }}
        aria-hidden
      />
      <aside
        className="fixed bottom-0 left-0 top-0 z-40 flex flex-col overflow-x-hidden bg-[#0e0e0e] transition-[width] duration-200 ease-out"
        style={{ width }}
        aria-label="侧边导航"
      >
        {/* Right-edge hairline: starts below the top-left corner radius, runs to the bottom */}
        <span
          className="pointer-events-none absolute bottom-0 right-0 top-4 w-px bg-[#1f1f1f]"
          aria-hidden
        />
      {/* One pad shell: same 8px inset for logo / nav / login chips */}
      <div
        className="flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden p-2"
        style={{ width: SIDEBAR_EXPANDED }}
      >
        <ToggleButton expanded={expanded} onClick={onToggle} />

        {sidebarGroups.map((group, gi) => (
          <div key={group.title ?? `g-${gi}`}>
            {gi > 0 ? (
              /* Collapsed: short hairline that stops short of the right edge.
                 Expanded: the group title itself carries the trailing line (below). */
              expanded ? (
                <div className="h-2" aria-hidden />
              ) : (
                <div className="my-2 h-px w-9 bg-white/[0.08]" aria-hidden />
              )
            ) : (
              <div className={expanded ? "h-2" : "h-1"} aria-hidden />
            )}
            {group.title ? (
              <div
                className={`flex h-5 items-center overflow-hidden pl-2 transition-all duration-200 ease-out ${
                  expanded ? "mb-2 max-h-5 opacity-100" : "mb-0 max-h-0 opacity-0"
                }`}
                aria-hidden={!expanded}
              >
                <span className="ui-text-label shrink-0 whitespace-nowrap text-[#6f7273]">
                  {group.title}
                </span>
                {gi > 0 ? (
                  /* "PAYMENTS ————" style: line runs from the label to the right */
                  <span className="ml-2 h-px min-w-0 flex-1 bg-white/[0.08]" aria-hidden />
                ) : null}
              </div>
            ) : null}
            <nav className="flex flex-col gap-1">
              {group.items.map((item) => (
                <SidebarLink key={item.to + item.label} item={item} expanded={expanded} />
              ))}
            </nav>
          </div>
        ))}

        <div className="mt-auto">
          <div
            className={`mb-2 mt-3 h-px bg-white/[0.08] ${expanded ? "w-full" : "w-9"}`}
            aria-hidden
          />
          {isAuthed() ? (
            <button
              type="button"
              onClick={() => {
                clearSession();
                navigate("/login");
              }}
              title="退出登录"
              className="group relative flex h-9 w-full items-center transition-colors text-[#9ea1a2] hover:text-white"
            >
              <span
                className="absolute inset-y-0 left-0 w-9 rounded-[9px] transition-[width,background-color] duration-200 ease-out group-hover:bg-[#1c1b1b]"
                aria-hidden
              />
              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center">
                <LogoutIcon />
              </span>
              <span
                className={`ui-text-meta relative z-10 min-w-0 flex-1 truncate pl-1 pr-3 text-left leading-none transition-opacity duration-200 ease-out ${
                  expanded ? "opacity-100" : "opacity-0"
                }`}
              >
                退出登录
              </span>
            </button>
          ) : (
            <SidebarLink
              item={{ to: "/login", label: "登录", icon: "login" }}
              expanded={expanded}
            />
          )}
        </div>
      </div>
      </aside>
    </>
  );
}

function ToggleButton({
  expanded,
  onClick,
}: {
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[9px] text-[#9ea1a2] transition-colors hover:bg-[#1c1b1b] hover:text-white"
      aria-label={expanded ? "收起侧栏" : "展开侧栏"}
      aria-expanded={expanded}
      onClick={onClick}
    >
      {/* Same 20×20 icon slot as SidebarLink */}
      <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
        <svg
          className="h-5 w-5 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={ICON_STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
          <path d="M9 4.5v15" />
        </svg>
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out group-hover:opacity-0"
          aria-hidden
        >
          <BrandLogo className="h-5 w-5 max-w-none object-contain" />
        </span>
      </span>
    </button>
  );
}

function SidebarLink({
  item,
  expanded,
}: {
  item: NavItem;
  expanded: boolean;
}) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      title={item.label}
      className={({ isActive }) =>
        [
          "group relative flex h-9 w-full items-center transition-colors",
          isActive ? "text-white" : "text-[#9ea1a2] hover:text-white",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={[
              "absolute inset-y-0 left-0 rounded-[9px] transition-[width,background-color] duration-200 ease-out",
              expanded ? "right-0" : "w-9",
              isActive ? "bg-[#2a2a2a]" : "group-hover:bg-[#1c1b1b]",
            ].join(" ")}
            aria-hidden
          />
          <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center">
            <SidebarIcon name={item.icon} />
          </span>
          <span
            className={`ui-text-meta relative z-10 min-w-0 flex-1 truncate pl-1 pr-3 text-left leading-none transition-opacity duration-200 ease-out ${
              expanded ? "opacity-100" : "opacity-0"
            }`}
          >
            {item.label}
          </span>
          {item.badge ? (
            <span
              className={`ui-text-label relative z-10 mr-3 shrink-0 rounded-[4px] bg-white px-1 py-px font-semibold text-[#121212] transition-opacity duration-200 ease-out ${
                expanded ? "opacity-100" : "opacity-0"
              }`}
            >
              {item.badge}
            </span>
          ) : null}
        </>
      )}
    </NavLink>
  );
}

function SidebarIcon({ name }: { name: SidebarIconName }) {
  return (
    <svg
      className="h-5 w-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={ICON_STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

const ICON_PATHS: Record<SidebarIconName, ReactNode> = {
  grid_view: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" />
    </>
  ),
  assignment: (
    <>
      <path d="M9 4.5h6a1 1 0 011 1V6h1.5A1.5 1.5 0 0119 7.5v11A1.5 1.5 0 0117.5 20h-11A1.5 1.5 0 015 18.5v-11A1.5 1.5 0 016.5 6H8V5.5a1 1 0 011-1z" />
      <path d="M9 4.5h6V6H9V4.5z" />
      <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4.5" />
    </>
  ),
  person_search: (
    <>
      <circle cx="10" cy="8.5" r="3" />
      <path d="M4.5 18.5c.8-2.8 2.9-4.2 5.5-4.2 1.1 0 2.1.2 3 .7" />
      <circle cx="16.5" cy="16.5" r="3" />
      <path d="M18.7 18.7L21 21" />
    </>
  ),
  school: (
    <>
      <path d="M2.5 9.5L12 4.5l9.5 5-9.5 5-9.5-5z" />
      <path d="M6.5 11.5v5.2c0 .5 2.4 2.3 5.5 2.3s5.5-1.8 5.5-2.3v-5.2" />
      <path d="M21.5 9.5v6" />
    </>
  ),
  notifications: (
    <>
      <path d="M12 4.6a4.4 4.4 0 00-4.4 4.4v2.3c0 1.6-.6 2.9-1.6 3.9-.4.4-.1 1.2.5 1.2h11c.6 0 .9-.8.5-1.2-1-1-1.6-2.3-1.6-3.9V9A4.4 4.4 0 0012 4.6z" />
      <path d="M10.2 19.4c.4 1 1 1.5 1.8 1.5s1.4-.5 1.8-1.5" />
    </>
  ),
  chat: (
    <>
      <path d="M6 4.5h12A1.5 1.5 0 0119.5 6v8.5a1.5 1.5 0 01-1.5 1.5h-5.2l-3.6 2.8a.8.8 0 01-1.3-.6v-2.2H6A1.5 1.5 0 014.5 14.5V6A1.5 1.5 0 016 4.5z" />
      <path d="M8.5 9h7M8.5 12.5h4.5" />
    </>
  ),
  profile: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <circle cx="9.2" cy="10.4" r="1.9" />
      <path d="M6.2 15.6c.5-1.4 1.6-2.1 3-2.1s2.5.7 3 2.1" />
      <path d="M15.4 9.6h2.6M15.4 12.4h2.6" />
    </>
  ),
  login: (
    <>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 19c1.2-3.2 3.6-4.75 6.5-4.75S17.3 15.8 18.5 19" />
    </>
  ),
};

function LogoutIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 4.5H18A1.5 1.5 0 0119.5 6v12A1.5 1.5 0 0118 19.5H14" />
      <path d="M9 8.5l-3 3.5 3 3.5" />
      <path d="M6 12h9" />
    </svg>
  );
}
