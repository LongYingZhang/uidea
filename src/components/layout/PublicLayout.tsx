import { NavLink, Outlet } from "react-router-dom";
import {
  SIDEBAR_COLLAPSED,
  SIDEBAR_EXPANDED,
  SiteSidebar,
} from "./SiteSidebar";
import { useSidebarState } from "./useSidebarState";

export function PublicLayout() {
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

      <footer
        className="border-t border-[#1f1f1f] bg-[#131313] transition-[padding] duration-200 ease-out"
        style={{ paddingLeft: padLeft }}
      >
        <div className="uidea-shell flex flex-col justify-between gap-3 px-margin py-6 sm:flex-row sm:items-center">
          <span className="ui-text-meta text-[#747778]">© 2026 Uidea</span>
          <div className="ui-text-meta flex flex-wrap gap-x-5 gap-y-2 text-[#9ea1a2]">
            <NavLink to="/vision" className="hover:text-white">
              愿景
            </NavLink>
            <NavLink to="/legal/terms" className="hover:text-white">
              协议
            </NavLink>
            <NavLink to="/legal/privacy" className="hover:text-white">
              隐私
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
