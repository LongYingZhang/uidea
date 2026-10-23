import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { courses } from "../../data/mock";

export function CourseLearnPage() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id) ?? courses[0];
  const [current, setCurrent] = useState(0);
  const chapter = course.chapters[current];

  return (
    <div className="min-h-screen px-margin py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link to={`/courses/${course.id}`} className="ui-text-meta text-[#8a8a8a] hover:text-white">
          ← 返回课程详情
        </Link>
        <span className="ui-text-label text-[#5f6364]">原型播放器 · 无真实视频源</span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div
            className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[10px] bg-[#0e0e0e]"
            style={{ background: chapter.done ? course.cover : "#0e0e0e" }}
          >
            <button
              type="button"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#121212] transition-transform hover:scale-105"
              aria-label="播放"
            >
              <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" fill="currentColor" aria-hidden>
                <path d="M8 5.5v13l11-6.5-11-6.5z" />
              </svg>
            </button>
          </div>

          <h1 className="mt-4 mb-0 text-[16px] font-semibold text-white">{chapter.title}</h1>
          <p className="ui-text-meta mt-1 mb-0 text-[#8a8a8a]">
            第 {current + 1} / {course.chapters.length} 节 · {chapter.duration}
          </p>

          <div className="mt-5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrent((i) => Math.max(0, i - 1))}
              disabled={current === 0}
              className="ui-btn bg-[#2a2a2a] text-white hover:bg-[#333] disabled:opacity-40"
            >
              上一节
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrent((i) => Math.min(course.chapters.length - 1, i + 1))
              }
              disabled={current === course.chapters.length - 1}
              className="ui-btn ui-btn-primary disabled:opacity-40"
            >
              下一节
            </button>
          </div>
        </div>

        <aside className="h-fit rounded-[10px] bg-[#1c1b1b] p-3">
          <div className="ui-text-label px-2 pb-2 text-[#747778]">课程目录</div>
          <ol className="m-0 flex list-none flex-col gap-1 p-0">
            {course.chapters.map((ch, i) => {
              const on = i === current;
              return (
                <li key={ch.title}>
                  <button
                    type="button"
                    onClick={() => setCurrent(i)}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-left transition-colors ${
                      on ? "bg-[#2a2a2a]" : "hover:bg-[#232323]"
                    }`}
                  >
                    <span className="min-w-0">
                      <span
                        className={`ui-text-meta block truncate ${
                          on ? "text-white" : "text-[#a3a3a3]"
                        }`}
                      >
                        {ch.title}
                      </span>
                      <span className="ui-text-label text-[#66696a]">
                        {ch.done ? "已完成" : "未开始"}
                      </span>
                    </span>
                    <span className="ui-text-label shrink-0 font-['Space_Mono'] text-[#747778]">
                      {ch.duration}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>
      </div>
    </div>
  );
}
