const SESSION_KEY = "uidea.user";

/** 读取当前会话（模拟登录：仅存邮箱，无真实校验）。 */
export function getSession(): string | null {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

export function setSession(email: string): void {
  try {
    localStorage.setItem(SESSION_KEY, email.trim());
  } catch {
    /* ignore */
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export function isAuthed(): boolean {
  return !!getSession();
}
