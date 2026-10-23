import { Link, useParams } from "react-router-dom";
import { designers, works } from "../../data/mock";

export function DesignerHomePage() {
  const { id } = useParams();
  const person = designers.find((d) => d.id === id) ?? designers[0];
  const own = works.filter((w) => w.author.replace("@", "") === person.name).slice(0, 6);
  const list = own.length > 0 ? own : works.slice(0, 6);

  return (
    <div className="uidea-shell px-margin py-8">
      <Link to="/designers" className="ui-text-meta text-[#8a8a8a] hover:text-white">
        ← 返回设计师列表
      </Link>

      <header className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <div
            className="h-16 w-16 shrink-0 rounded-full"
            style={{ background: person.accent }}
            aria-hidden
          />
          <div>
            <h1 className="m-0 text-[20px] font-semibold leading-7 text-white">{person.name}</h1>
            <p className="ui-text-meta mt-0.5 mb-0 text-[#8a8a8a]">
              {person.title} · {person.city}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button type="button" className="ui-btn ui-btn-primary">
            关注
          </button>
          <Link to="/messages" className="ui-btn bg-[#2a2a2a] text-white hover:bg-[#333]">
            私信
          </Link>
        </div>
      </header>

      <p className="ui-text-body mt-5 mb-0 max-w-[640px] text-[#a3a3a3]">{person.bio}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {person.tags.map((t) => (
          <span
            key={t}
            className="ui-text-label rounded-[6px] bg-[#1c1b1b] px-2 py-1 text-[#9ea1a2]"
          >
            {t}
          </span>
        ))}
      </div>

      <dl className="mt-6 flex gap-8">
        {[
          ["作品", person.works],
          ["关注者", person.followers.toLocaleString("en-US")],
        ].map(([k, v]) => (
          <div key={String(k)}>
            <dd className="ui-text-body m-0 font-medium text-white">{v}</dd>
            <dt className="ui-text-label text-[#747778]">{k}</dt>
          </div>
        ))}
      </dl>

      <h2 className="ui-text-body mt-10 mb-3 font-medium text-white">作品</h2>
      <div className="uidea-grid">
        {list.map((w) => (
          <Link
            key={w.id}
            to={`/works/${w.id}`}
            className="uidea-media group relative overflow-hidden rounded-[10px] bg-[#0e0e0e]"
          >
            <div className="absolute inset-0" style={{ background: w.cover }} aria-hidden />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-[var(--uidea-card-pad)]">
              <div className="ui-text-body truncate font-medium text-white">{w.title}</div>
              <div className="ui-text-meta truncate text-white/70">{w.category}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
