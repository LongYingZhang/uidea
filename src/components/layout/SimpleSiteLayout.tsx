import { NavLink, Outlet } from "react-router-dom";
import {
  SIDEBAR_COLLAPSED,
  SIDEBAR_EXPANDED,
  SiteSidebar,
} from "./SiteSidebar";
import { useSidebarState } from "./useSidebarState";

export function SimpleSiteLayout() {
  const { expanded, toggle } = useSidebarState(true);
  const padLeft = expanded ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED;

  return (
    <div className="flex min-h-screen flex-col bg-[#131313] text-[#f4f4f4] antialiased selection:bg-[#f4f4f4] selection:text-[#131313]">
      <SiteSidebar expanded={expanded} onToggle={toggle} />

      <main
        className="w-full flex-1 transition-[padding] duration-200 ease-out"
        style={{ paddingLeft: padLeft }}
      >
        <Outlet />
      </main>

      <footer
        className="mt-auto w-full border-t border-[#1f1f1f] py-8 transition-[padding] duration-200 ease-out"
        style={{ paddingLeft: padLeft }}
      >
        <div className="uidea-shell ui-text-meta flex flex-col items-center justify-between gap-4 px-margin text-[#8a8a8a] sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="font-['Space_Grotesk'] tracking-wider text-[#666]">UIDEA ARCHIVE</span>
            <NavLink to="/legal/terms" className="hover:text-[#f4f4f4]">
              条款与合规
            </NavLink>
            <NavLink to="/legal/privacy" className="hover:text-[#f4f4f4]">
              隐私安全
            </NavLink>
            <NavLink to="/vision" className="hover:text-[#f4f4f4]">
              协议存证
            </NavLink>
          </div>
          <div className="ui-text-label font-['Space_Mono'] tracking-wider text-[#666]">
            © 2026 UIDEA LABS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
