import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="uidea-shell px-margin py-8 sm:py-10">{children}</div>;
}

export function PageHeader({
  title,
  meta,
  action,
}: {
  title: string;
  meta?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="m-0 text-[12px] font-normal text-[#9ea1a2]">{title}</h1>
        {meta ? (
          <p className="mt-1 mb-0 text-[13px] text-[#747778]">{meta}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function ChipRow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
}

export function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 shrink-0 rounded-[9px] px-4 text-[12px] transition-colors ${
        active
          ? "bg-white text-black"
          : "bg-transparent text-[#9ea1a2] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="relative block w-full sm:w-64">
      <span className="sr-only">搜索</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-transparent bg-[#2a2a2a] px-3.5 text-[13px] text-white outline-none placeholder:text-[#66696a] hover:border-white/10 focus:border-white/10 focus:bg-[#201f1f]"
      />
    </label>
  );
}

export function ItemCard({
  to,
  swatch,
  title,
  sub,
}: {
  to: string;
  swatch?: string;
  title: string;
  sub: string;
}) {
  return (
    <Link
      to={to}
      className="group flex min-h-[76px] items-center gap-3 rounded-2xl bg-black px-3.5 py-3 transition-colors hover:bg-[#161616] sm:flex-col sm:items-stretch sm:overflow-hidden sm:bg-[#1c1b1b] sm:p-0 sm:hover:bg-[#222]"
    >
      <div
        className="h-11 w-11 shrink-0 rounded-lg sm:aspect-[4/3] sm:h-auto sm:w-full sm:rounded-none"
        style={{ background: swatch || "#2a2a2a" }}
        aria-hidden
      />
      <div className="min-w-0 flex-1 sm:p-3.5">
        <div className="truncate text-[13px] leading-tight text-white">{title}</div>
        <div className="mt-[3px] truncate text-[12px] leading-tight text-[#8a8a8a]">
          {sub}
        </div>
      </div>
    </Link>
  );
}

export function ItemGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 min-[2560px]:grid-cols-6 min-[3840px]:grid-cols-7">
      {children}
    </div>
  );
}

export function EmptyHint({ children }: { children: ReactNode }) {
  return (
    <p className="py-16 text-center text-[13px] text-[#747778]">{children}</p>
  );
}

export function DetailBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-4">
      <div className="mb-1 text-[11px] leading-4 text-[#9ea1a2]">{label}</div>
      <div className="text-[13px] leading-relaxed text-white">{children}</div>
    </div>
  );
}

export function PrimaryButton({
  children,
  to,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const cls =
    "inline-flex h-9 min-w-[90px] items-center justify-center rounded-[7px] bg-white px-4 text-[12px] text-black hover:bg-[#dedede]";
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function GhostLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} className="text-[12px] text-[#9ea1a2] hover:text-white">
      {children}
    </Link>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="mb-4 flex flex-col gap-1">
      <span className="text-[11px] leading-4 text-[#9ea1a2]">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "h-11 w-full rounded-xl border border-transparent bg-[#2a2a2a] px-3.5 text-[13px] text-white outline-none placeholder:text-[#66696a] hover:border-white/10 focus:border-white/10 focus:bg-[#201f1f]";
