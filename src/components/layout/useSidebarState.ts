import { useCallback, useEffect, useState } from "react";

const KEY = "uidea.sidebar.expanded";

export function useSidebarState(defaultExpanded = true) {
  const [expanded, setExpanded] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw === null) return defaultExpanded;
      return raw === "1";
    } catch {
      return defaultExpanded;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, expanded ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [expanded]);

  const toggle = useCallback(() => setExpanded((v) => !v), []);

  return { expanded, setExpanded, toggle } as const;
}
