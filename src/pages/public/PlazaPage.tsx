import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { workCategories, works } from "../../data/mock";

type Cat = (typeof workCategories)[number];

export function PlazaPage() {
  const [category, setCategory] = useState<Cat>("全部");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return works.filter((w) => {
      const catOk = category === "全部" || w.category === category || w.tags.includes(category);
      const qOk =
        !q ||
        w.title.toLowerCase().includes(q) ||
        w.author.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [category, query]);

  return (
    <div className="uidea-shell px-margin py-8 sm:py-10">
      {/* Admin-style muted section label */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="m-0 text-[12px] font-normal text-[#9ea1a2]">广场</h1>
          <p className="mt-1 mb-0 text-[13px] text-[#747778]">
            {list.length} 件作品
          </p>
        </div>
        <label className="relative block w-full sm:w-64">
          <span className="sr-only">搜索</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索标题或作者"
            className="h-11 w-full rounded-xl border border-transparent bg-[#2a2a2a] px-3.5 text-[13px] text-white outline-none placeholder:text-[#66696a] hover:border-white/10 focus:border-white/10 focus:bg-[#201f1f]"
          />
        </label>
      </div>

      {/* Single quiet filter row */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {workCategories.map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-[9px] px-3 py-1 text-[13px] leading-none transition-colors ${
                active
                  ? "bg-white font-semibold text-[#121212]"
                  : "bg-transparent font-normal text-[#8a8a8a] hover:text-[#f4f4f4]"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Clean work grid — no banners / sort chrome */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 min-[2560px]:grid-cols-6 min-[3840px]:grid-cols-7">
        {list.map((w) => (
          <Link
            key={w.id}
            to={`/works/${w.id}`}
            className="group flex min-h-[76px] items-center gap-3 rounded-2xl bg-black px-3.5 py-3 transition-colors hover:bg-[#161616] sm:flex-col sm:items-stretch sm:p-0 sm:overflow-hidden sm:bg-[#1c1b1b] sm:hover:bg-[#222]"
          >
            <div
              className="h-11 w-11 shrink-0 rounded-lg sm:aspect-[4/3] sm:h-auto sm:w-full sm:rounded-none"
              style={{ background: w.cover }}
              aria-hidden
            />
            <div className="min-w-0 flex-1 sm:p-3.5">
              <div className="truncate text-[13px] leading-tight text-white">
                {w.title}
              </div>
              <div className="mt-[3px] truncate text-[12px] leading-tight text-[#8a8a8a]">
                {w.author} · {w.category}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="py-16 text-center text-[13px] text-[#747778]">没有匹配的作品</p>
      ) : null}
    </div>
  );
}
