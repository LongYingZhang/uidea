import { Link } from "react-router-dom";
import { competitions, leaderboard } from "../../data/mock";

const comp = competitions[0];

export function CompetitionRankPage() {
  return (
    <div className="uidea-shell px-margin py-8">
      <Link to="/competitions/one" className="ui-text-meta text-[#8a8a8a] hover:text-white">
        ← 返回大赛专题
      </Link>

      <header className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="m-0 text-[20px] font-semibold text-white">{comp.title} · 排行榜</h1>
          <p className="ui-text-meta mt-1 mb-0 text-[#8a8a8a]">
            综合评审分与社区互动计算，每 30 分钟更新
          </p>
        </div>
        <span className="ui-text-label w-fit rounded-[6px] bg-[#1c1b1b] px-2 py-1 text-[#9ea1a2]">
          数据为原型示例
        </span>
      </header>

      <div className="mt-6 overflow-x-auto rounded-[16px] bg-[#1c1b1b]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="ui-text-label text-[#747778]">
              {["排名", "作品", "作者", "评审分", "点赞"].map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((r) => (
              <tr
                key={r.rank}
                className="border-t border-[#2a2a2a] transition-colors hover:bg-[#222]"
              >
                <td className="px-4 py-3">
                  <span
                    className={`font-['Space_Mono'] text-[13px] ${
                      r.rank <= 3 ? "text-[#ff5f00]" : "text-[#9ea1a2]"
                    }`}
                  >
                    {String(r.rank).padStart(2, "0")}
                  </span>
                </td>
                <td className="ui-text-body max-w-[280px] truncate px-4 py-3 text-white">
                  {r.work}
                </td>
                <td className="ui-text-meta px-4 py-3 text-[#a3a3a3]">{r.name}</td>
                <td className="px-4 py-3 font-['Space_Mono'] text-[13px] text-white">
                  {r.score.toFixed(1)}
                </td>
                <td className="ui-text-meta px-4 py-3 text-[#a3a3a3]">{r.likes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
