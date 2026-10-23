import { Link } from "react-router-dom";
import { competitions } from "../../data/mock";

export function CompetitionListPage() {
  return (
    <div className="uidea-shell px-margin py-8">
      <header className="mb-6">
        <h1 className="m-0 text-[20px] font-semibold text-white">设计大赛</h1>
        <p className="ui-text-meta mt-1 mb-0 text-[#8a8a8a]">
          用主题限定的方式，把创作推到极限。
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {competitions.map((c) => {
          const open = c.status === "进行中";
          return (
            <Link
              key={c.id}
              to={c.id === "ai-love" ? "/competitions/one" : "/competitions/1"}
              className="group overflow-hidden rounded-[10px] bg-[#1c1b1b] transition-colors hover:bg-[#222]"
            >
              <div className="relative aspect-[21/9] w-full" style={{ background: c.cover }} aria-hidden>
                <span
                  className={`ui-text-label absolute left-3 top-3 rounded-[6px] px-2 py-1 ${
                    open ? "bg-white text-[#121212]" : "bg-black/60 text-[#c4c7c8]"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <div className="p-4">
                <h2 className="ui-text-body m-0 font-medium text-white">{c.title}</h2>
                <p className="ui-text-meta mt-1 mb-0 line-clamp-2 text-[#8a8a8a]">{c.brief}</p>
                <div className="ui-text-label mt-3 flex items-center justify-between text-[#747778]">
                  <span>{c.sponsor}</span>
                  <span className="font-['Space_Mono'] text-[#c4c7c8]">{c.prize}</span>
                </div>
                <div className="ui-text-label mt-1.5 flex items-center justify-between text-[#5f6364]">
                  <span>{c.entrants.toLocaleString("en-US")} 件参赛</span>
                  <span>截止 {c.deadline}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
