import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FilterChips } from "../components/ui/FilterChips";
import { tasks, type Task } from "../data/mock";

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

export function TasksPage() {
  const [filter, setFilter] = useState<string>("全部");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const list = tasks.filter((t) => {
    const catOk = filter === "全部" || t.category === filter;
    const q = query.trim().toLowerCase();
    const qOk =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.company.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q);
    return catOk && qOk;
  });

  return (
    <div className="uidea-shell px-margin pt-3 pb-24">
      <FilterChips
        options={filters}
        value={filter}
        onChange={setFilter}
        ariaLabel="任务分类"
        className="mb-6"
      />

      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
        {list.map((t) => (
          <TaskCard key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  return (
    <article className="ui-card flex flex-col gap-2">
      {/* Company */}
      <div className="flex items-center gap-1.5">
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a] ui-text-label font-medium text-white"
          aria-hidden
        >
          {task.companyInitials.slice(0, 1)}
        </span>
        <span className="ui-text-meta truncate text-[#999]">{task.company}</span>
      </div>

      {/* Title + summary */}
      <div className="flex flex-col gap-0.5">
        <h2 className="ui-text-body font-medium text-white">{task.title}</h2>
        <p className="ui-text-meta line-clamp-2 text-[#888]">{task.summary}</p>
      </div>

      {/* Meta */}
      <div className="ui-text-meta flex items-center justify-between gap-2 text-[#888]">
        <span className="inline-flex items-center gap-1">
          <SmileIcon />
          {task.applicants}人已报名
        </span>
        <span>截止时间 {task.due}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-['Space_Mono'] text-[16px] font-medium leading-none tracking-tight text-white">
          {task.price}
        </span>
        <Link to={`/tasks/${task.id}`} className="ui-btn ui-btn-primary shrink-0">
          查看详情
        </Link>
      </div>
    </article>
  );
}

function SmileIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14.5s1.5 2 3.5 2 3.5-2 3.5-2" />
      <path d="M9 9.5h.01M15 9.5h.01" />
    </svg>
  );
}
