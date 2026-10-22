import { Link } from "react-router-dom";
import {
  EmptyHint,
  PageHeader,
  PageShell,
  PrimaryButton,
} from "../../components/ui/AdminUi";

const applications = [
  {
    id: "2",
    title: "2025 全球AI短片先导预告片视觉合成",
    company: "幻境实验室 Vortex Studio",
    price: "¥35,000",
    status: "待沟通",
    updated: "2026-10-18",
  },
  {
    id: "3",
    title: "智能座舱 3D 粒子交互动效原型",
    company: "AURA 科技视觉研究中心",
    price: "¥68,000",
    status: "已报名",
    updated: "2026-10-15",
  },
  {
    id: "5",
    title: "光子场域与微结构全景音画套件",
    company: "斯德哥尔摩视听实验室",
    price: "¥42,000",
    status: "已中标",
    updated: "2026-10-09",
  },
];

const statusTone: Record<string, string> = {
  待沟通: "bg-[#2a2a2a] text-[#e5e2e1]",
  已报名: "bg-[#1a2430] text-[#7fb6ff]",
  已中标: "bg-[#122a20] text-[#18c98a]",
};

export function ConsoleTasksPage() {
  return (
    <PageShell>
      <PageHeader
        title="任务管理"
        meta={`${applications.length} 条参与记录`}
        action={<PrimaryButton to="/tasks">找任务</PrimaryButton>}
      />

      {applications.length === 0 ? (
        <EmptyHint>还没有参与任何任务</EmptyHint>
      ) : (
        <div className="flex flex-col gap-2.5">
          {applications.map((a) => (
            <div
              key={a.id}
              className="flex flex-col gap-3 rounded-2xl bg-[#1c1b1b] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="ui-text-body font-medium text-white">{a.title}</div>
                <div className="ui-text-meta mt-0.5 text-[#8a8a8a]">
                  {a.company} · 更新于 {a.updated}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-['Space_Mono'] text-[14px] text-white">{a.price}</span>
                <span
                  className={`ui-text-label rounded-[6px] px-2 py-1 ${statusTone[a.status]}`}
                >
                  {a.status}
                </span>
                <Link to={`/tasks/${a.id}`} className="ui-text-meta text-[#9ea1a2] hover:text-white">
                  查看
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
