import { NavLink } from "react-router-dom";
import { BrandLogo } from "../ui/BrandLogo";
import { SIDEBAR_COLLAPSED, SIDEBAR_EXPANDED } from "./SiteSidebar";

type Props = {
  /** Sidebar expanded state */
  sidebarExpanded?: boolean;
  /** Toggle sidebar expand/collapse */
  onToggleSidebar?: () => void;
};

export function SiteHeader({
  sidebarExpanded = true,
  onToggleSidebar,
}: Props) {
  const railWidth = onToggleSidebar
    ? sidebarExpanded
      ? SIDEBAR_EXPANDED
      : SIDEBAR_COLLAPSED
    : 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-[#1f1f1f] bg-[rgba(19,19,19,0.92)] backdrop-blur-[20px]">
      <div className="flex h-full w-full items-center">
        {/* Same column as sidebar — logo covers toggle; hover reveals panel icon */}
        {onToggleSidebar ? (
          <div
            className="relative h-full shrink-0 transition-[width] duration-200 ease-out"
            style={{ width: railWidth }}
          >
            {/* Pin at left-2 — same 8px inset as sidebar px-2 + icon slot */}
            <ToggleButton
              expanded={sidebarExpanded}
              onClick={onToggleSidebar}
            />
          </div>
        ) : (
          <div className="flex h-full items-center px-margin">
            <NavLink to="/" className="flex shrink-0 items-center" aria-label="Uidea">
              <BrandLogo className="h-8 w-auto sm:h-9" />
            </NavLink>
          </div>
        )}
      </div>
    </header>
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
      className="group absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center overflow-visible rounded-[9px] text-[#9ea1a2] transition-colors hover:bg-[#1c1b1b] hover:text-white"
      aria-label={expanded ? "收起侧栏" : "展开侧栏"}
      aria-expanded={expanded}
      onClick={onClick}
    >
      {/* Fixed 20×20 slot — same as sidebar icons; logo overlays this slot */}
      <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-visible">
        <svg
          className="h-5 w-5 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
          <path d="M9 4.5v15" />
        </svg>
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ease-out group-hover:opacity-0"
          aria-hidden
        >
          <BrandLogo className="h-8 w-auto max-w-none sm:h-9" />
        </span>
      </span>
    </button>
  );
}

/** @deprecated kept for imports that expect siteNavItems */
export const siteNavItems = [
  { to: "/", label: "广场", end: true },
  { to: "/tasks", label: "任务" },
  { to: "/designers", label: "设计师" },
  { to: "/courses", label: "课程" },
] as const;
