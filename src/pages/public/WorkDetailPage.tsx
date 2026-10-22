import { Link, useParams } from "react-router-dom";
import { works } from "../../data/mock";

export function WorkDetailPage() {
  const { id } = useParams();
  const work = works.find((w) => w.id === id) ?? works[0];
  const related = works.filter((w) => w.id !== work.id && w.category === work.category).slice(0, 4);
  const cover = work.cover.startsWith("/") ? null : work.cover;

  return (
    <div className="uidea-shell px-margin py-8">
      <div className="mb-5 flex items-center gap-2">
        <Link to="/" className="ui-text-meta text-[#8a8a8a] hover:text-white">
          ← 返回作品广场
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div
            className="uidea-media overflow-hidden rounded-[16px] bg-[#0e0e0e]"
            style={cover ? { background: cover } : undefined}
          >
            {work.cover.startsWith("/") ? (
              <img src={work.cover} alt={work.title} />
            ) : null}
          </div>

          <h1 className="mt-6 mb-0 text-[20px] font-semibold leading-7 text-white">
            {work.title}
          </h1>
          <p className="ui-text-body mt-2 mb-0 text-[#a3a3a3]">{work.desc}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {work.tags.map((t) => (
              <span
                key={t}
                className="ui-text-label rounded-[6px] bg-[#1c1b1b] px-2 py-1 text-[#9ea1a2]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-[16px] bg-[#1c1b1b] p-4">
            <div className="flex items-center gap-3">
              <span className="ui-text-body flex h-10 w-10 items-center justify-center rounded-full bg-[#3a3a3a] font-medium text-white">
                {work.author.replace("@", "").slice(0, 1).toUpperCase()}
              </span>
              <div className="min-w-0">
                <div className="ui-text-body truncate font-medium text-white">{work.author}</div>
                <div className="ui-text-label text-[#8a8a8a]">{work.category}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                ["赞", work.likes],
                ["浏览", work.views],
                ["分类", work.category],
              ].map(([label, value]) => (
                <div key={String(label)} className="rounded-xl bg-[#232323] py-2">
                  <div className="ui-text-body font-medium text-white">{value}</div>
                  <div className="ui-text-label text-[#747778]">{label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button type="button" className="ui-btn ui-btn-primary flex-1">
                点赞
              </button>
              <button type="button" className="ui-btn flex-1 bg-[#2a2a2a] text-white hover:bg-[#333]">
                收藏
              </button>
            </div>

            <Link
              to={`/designers/${work.author.replace("@", "")}`}
              className="ui-btn mt-2 w-full bg-[#2a2a2a] text-white hover:bg-[#333]"
            >
              查看设计师主页
            </Link>
          </div>

          <div className="ui-text-label rounded-[16px] bg-[#141414] p-4 text-[#5f6364]">
            作品 ID {work.id} · 原型数据，非真实作品
          </div>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="ui-text-body mb-3 font-medium text-white">同分类作品</h2>
          <div className="uidea-grid">
            {related.map((w) => (
              <Link
                key={w.id}
                to={`/works/${w.id}`}
                className="uidea-media group relative overflow-hidden rounded-[16px] bg-[#0e0e0e]"
              >
                <div className="absolute inset-0" style={{ background: w.cover }} aria-hidden />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-[var(--uidea-card-pad)]">
                  <div className="ui-text-meta truncate text-white/75">{w.author}</div>
                  <div className="ui-text-body truncate font-medium text-white">{w.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
