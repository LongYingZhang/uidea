import { Outlet } from "react-router-dom";
import {
  SIDEBAR_COLLAPSED,
  SIDEBAR_EXPANDED,
  SiteSidebar,
} from "./SiteSidebar";
import { useSidebarState } from "./useSidebarState";

export function AuthLayout() {
  const { expanded, toggle } = useSidebarState(true);
  const padLeft = expanded ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED;

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-clip bg-[#131313] text-white">
      <SiteSidebar expanded={expanded} onToggle={toggle} />
      <main
        className="min-h-screen w-full bg-[#131313] pt-[calc(var(--spacing-margin)_-_0.5rem)] transition-[padding] duration-200 ease-out"
        style={{ paddingLeft: padLeft }}
      >
        <Outlet />
      </main>
    </div>
  );
}
