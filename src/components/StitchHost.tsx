import { useEffect, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const PATH_MAP: Record<string, string> = {
  square: "/",
  tasks: "/tasks",
  designers: "/designers",
  courses: "/courses",
  competitions: "/competitions",
  vision: "/vision",
  product: "/product",
  login: "/login",
  register: "/register",
  profile: "/profile",
  "account-settings": "/profile",
  "portfolio-management": "/profile?tab=work",
  "course-management": "/profile?tab=course",
  "task-management": "/profile?tab=task",
  "notifications-center": "/notifications",
  messages: "/messages",
  logout: "/login",
};

type Props = {
  children: ReactNode;
};

/** Intercept Stitch markup links (data-path / common text) into React Router. */
export function StitchHost({ children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor || !root.contains(anchor)) return;

      const dataPath = anchor.getAttribute("data-path");
      if (dataPath && PATH_MAP[dataPath]) {
        event.preventDefault();
        navigate(PATH_MAP[dataPath]);
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href.startsWith("javascript:")) {
        const text = (anchor.textContent || "").trim();
        const byText: Record<string, string> = {
          广场: "/",
          任务: "/tasks",
          设计师: "/designers",
          课程: "/courses",
          大赛: "/competitions",
          返回作品广场: "/",
          返回任务列表: "/tasks",
          返回课程列表: "/courses",
          返回设计师列表: "/designers",
          返回大赛列表: "/competitions",
          返回大赛专题: "/competitions/one",
          了解愿景: "/vision",
          查看详情: "/competitions/one",
          登录: "/login",
          注册: "/register",
        };
        if (byText[text]) {
          event.preventDefault();
          navigate(byText[text]);
        }
      }
    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [navigate]);

  return (
    <div ref={rootRef} className="contents">
      {children}
    </div>
  );
}
