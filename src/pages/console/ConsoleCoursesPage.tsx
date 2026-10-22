import { Link } from "react-router-dom";
import {
  EmptyHint,
  PageHeader,
  PageShell,
  PrimaryButton,
} from "../../components/ui/AdminUi";
import { courses } from "../../data/mock";

export function ConsoleCoursesPage() {
  return (
    <PageShell>
      <PageHeader
        title="课程管理"
        meta={`${courses.length} 门课程在学习中`}
        action={<PrimaryButton to="/courses">发现课程</PrimaryButton>}
      />

      {courses.length === 0 ? (
        <EmptyHint>还没有加入任何课程</EmptyHint>
      ) : (
        <div className="flex flex-col gap-2.5">
          {courses.map((c, i) => {
            const done = c.chapters.filter((ch) => ch.done).length;
            const pct = Math.round((done / c.chapters.length) * 100);
            return (
              <Link
                key={c.id}
                to={`/courses/learning/${c.id}`}
                className="group flex flex-col gap-3 rounded-2xl bg-[#1c1b1b] p-3.5 transition-colors hover:bg-[#222] sm:flex-row sm:items-center"
              >
                <div
                  className="uidea-media w-full shrink-0 rounded-xl sm:w-40"
                  style={{ background: c.cover }}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="ui-text-body font-medium text-white">{c.title}</div>
                  <div className="ui-text-meta mt-0.5 text-[#8a8a8a]">
                    {c.teacher} · {c.lessons} 节 · {c.duration}
                  </div>
                  <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-[#2a2a2a]">
                    <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="ui-text-label mt-1 text-[#747778]">
                    已完成 {done}/{c.chapters.length} · {pct}%
                  </div>
                </div>
                <span className="ui-text-meta shrink-0 text-[#9ea1a2] group-hover:text-white">
                  继续学习 →
                </span>
                <span className="sr-only">{i}</span>
              </Link>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
