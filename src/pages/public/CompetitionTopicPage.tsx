import { Link } from "react-router-dom";
import { competitions } from "../../data/mock";

const comp = competitions[0];

const timeline = [
  { date: "2026-09-01", label: "作品征集开启" },
  { date: "2026-11-30", label: "中期公开课" },
  { date: "2026-12-31", label: "提交截止" },
  { date: "2027-01-15", label: "评审与公示" },
] as const;

const awards = [
  { name: "金赏", count: 1, prize: "¥60,000" },
  { name: "银赏", count: 3, prize: "¥30,000" },
  { name: "评审特别奖", count: 5, prize: "¥8,000" },
] as const;

export function CompetitionTopicPage() {
  return (
    <div className="uidea-shell px-margin py-8">
      <Link to="/competitions" className="ui-text-meta text-[#8a8a8a] hover:text-white">
        ← 返回大赛列表
      </Link>

      <section className="relative mt-5 overflow-hidden rounded-[16px]" style={{ background: comp.cover }}>
        <div className="relative aspect-[21/9] w-full bg-black/25">
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <span className="ui-text-label w-fit rounded-[6px] bg-white px-2 py-1 text-[#121212]">
              {comp.status}
            </span>
            <h1 className="mt-3 mb-0 max-w-[720px] text-[26px] font-semibold leading-9 text-white sm:text-[32px] sm:leading-[40px]">
              {comp.title}
            </h1>
            <p className="ui-text-body mt-2 mb-0 max-w-[640px] text-white/85">{comp.brief}</p>
          </div>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <h2 className="ui-text-body mb-3 font-medium text-white">赛程</h2>
          <ol className="m-0 flex list-none flex-col gap-0 p-0">
            {timeline.map((t, i) => (
              <li key={t.date} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-[#ff5f00]" aria-hidden />
                  {i < timeline.length - 1 ? (
                    <span className="my-1 w-px flex-1 bg-[#2a2a2a]" aria-hidden />
                  ) : null}
                </div>
                <div className="pb-4">
                  <div className="ui-text-meta text-white">{t.label}</div>
                  <div className="ui-text-label font-['Space_Mono'] text-[#747778]">{t.date}</div>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="ui-text-body mt-6 mb-3 font-medium text-white">奖项设置</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {awards.map((a) => (
              <div key={a.name} className="rounded-[16px] bg-[#1c1b1b] p-4">
                <div className="ui-text-meta text-[#8a8a8a]">{a.name}</div>
                <div className="mt-1 font-['Space_Mono'] text-[18px] text-white">{a.prize}</div>
                <div className="ui-text-label mt-0.5 text-[#5f6364]">{a.count} 名</div>
              </div>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-[16px] bg-[#1c1b1b] p-4 lg:sticky lg:top-6">
          <div className="font-['Space_Mono'] text-[24px] leading-none text-white">{comp.prize}</div>
          <div className="ui-text-meta mt-1 text-[#8a8a8a]">总奖池</div>

          <dl className="mt-4 flex flex-col gap-2">
            {[
              ["主办", comp.sponsor],
              ["截止", comp.deadline],
              ["参赛作品", `${comp.entrants.toLocaleString("en-US")} 件`],
            ].map(([k, v]) => (
              <div key={k} className="flex items-start justify-between gap-3">
                <dt className="ui-text-label shrink-0 text-[#747778]">{k}</dt>
                <dd className="ui-text-meta m-0 text-right text-white">{v}</dd>
              </div>
            ))}
          </dl>

          <button type="button" className="ui-btn ui-btn-primary mt-4 w-full">
            提交作品
          </button>
          <Link
            to="/competitions/1"
            className="ui-btn mt-2 w-full bg-[#2a2a2a] text-white hover:bg-[#333]"
          >
            查看排行榜
          </Link>
        </aside>
      </div>
    </div>
  );
}
