import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAuthed } from "../../lib/auth";

/**
 * 路由守卫：未登录统一跳转到 /login。
 * 包在布局路由外层即可保护整组页面。
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  if (!isAuthed()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
