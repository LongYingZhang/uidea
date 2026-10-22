import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FilterChips } from "../components/ui/FilterChips";

const filters = [
  "全部",
  "AIGC",
  "UI设计",
  "影视编导",
  "LOGO设计",
  "创意视觉",
  "网页设计",
  "品牌全案",
  "后期剪辑",
  "3D建模",
  "平面设计",
  "海报设计",
  "室内设计",
] as const;

const COVER = "/covers/cover-art.png";

const works = [
  {
    title: "【士气赛跑】龟兔赛跑",
    author: "@LONGYINGZHANG",
    likes: 999,
    category: "创意视觉",
    cover: COVER,
  },
  {
    title: "流动之境 · 神经潜意识漫游",
    author: "@VortexLab",
    likes: 428,
    category: "AIGC",
    cover: COVER,
  },
  {
    title: "赛博有机体拓扑共生 04",
    author: "@KaelenT",
    likes: 812,
    category: "3D建模",
    cover: COVER,
  },
  {
    title: "光子场域与微结构演化",
    author: "@MarcusBerg",
    likes: 356,
    category: "影视编导",
    cover: COVER,
  },
  {
    title: "极简标量字体与符号体系",
    author: "@Chen.Design",
    likes: 267,
    category: "LOGO设计",
    cover: COVER,
  },
  {
    title: "超几何流形采样视差",
    author: "@Hyperspace",
    likes: 641,
    category: "UI设计",
    cover: COVER,
  },
  {
    title: "脉冲流体着色器解构",
    author: "@Null_Pointer",
    likes: 190,
    category: "平面设计",
    cover: COVER,
  },
] as const;

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

function isImageCover(cover: string) {
  return cover.startsWith("/") || cover.startsWith("http");
}

export function PlazaPage() {
  const [filter, setFilter] = useState<string>("全部");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const list = works.filter((w) => {
    const catOk = filter === "全部" || w.category === filter;
    const q = query.trim().toLowerCase();
    const qOk = !q || w.title.toLowerCase().includes(q);
    return catOk && qOk;
  });

  return (
    <div className="uidea-shell px-margin pt-3 pb-24">
      {/* Promo banners */}
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link
          to="/competitions"
          className="group relative block aspect-[21/9] overflow-hidden rounded-[16px] bg-[#0e0e0e]"
        >
          <img
            src={COVER}
            alt="「AI=爱」创意创作大赛"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </Link>
        <Link
          to="/vision"
          className="group relative block aspect-[21/9] overflow-hidden rounded-[16px] bg-[#0e0e0e]"
        >
          <img
            src={COVER}
            alt="Uidea Vision 愿景"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </Link>
      </div>

      <FilterChips
        options={filters}
        value={filter}
        onChange={setFilter}
        ariaLabel="作品分类"
      />

      <div className="uidea-grid mb-20 !gap-6">
        {list.map((w) => (
          <article
            key={w.title}
            className="uidea-media group relative cursor-pointer overflow-hidden rounded-[16px] bg-[#0e0e0e]"
          >
            {isImageCover(w.cover) ? (
              <img
                src={w.cover}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: w.cover }}
                aria-hidden
              />
            )}

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/80 via-black/35 to-transparent"
              aria-hidden
            />

            {/* Same inset as other cards: --uidea-card-pad (10px) */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-[var(--uidea-card-pad)]">
              <div className="min-w-0 flex-1">
                <div className="ui-text-meta truncate text-white/75">{w.author}</div>
                <h2 className="ui-text-body mt-0.5 truncate font-medium text-white">
                  {w.title}
                </h2>
              </div>
              <div className="ui-text-meta flex shrink-0 items-center gap-1 text-white/90">
                <HeartIcon className="h-3.5 w-3.5" />
                <span>{w.likes}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
