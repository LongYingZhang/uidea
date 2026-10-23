import { Link, useParams } from "react-router-dom";
import { courses } from "../../data/mock";

export function CourseDetailPage() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id) ?? courses[0];

  return (
    <div className="uidea-shell px-margin py-8">
      <Link to="/courses" className="ui-text-meta text-[#8a8a8a] hover:text-white">
        ← 返回课程列表
      </Link>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <div
            className="uidea-media rounded-[10px] bg-[#0e0e0e]"
            style={{
              backgroundImage: `url(${course.cover})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden
          />

          <h1 className="mt-6 mb-0 text-[20px] font-semibold leading-7 text-white">
            {course.title}
          </h1>
          <p className="ui-text-meta mt-1 mb-0 text-[#8a8a8a]">
            {course.teacher} · {course.level} · {course.lessons} 节 · {course.duration}
          </p>
          <p className="ui-text-body mt-4 mb-0 text-[#c9c9c9]">{course.intro}</p>

          <h2 className="ui-text-body mt-8 mb-3 font-medium text-white">课程目录</h2>
          <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
            {course.chapters.map((ch, i) => (
              <li
                key={ch.title}
                className="flex items-center justify-between gap-3 rounded-xl bg-[#1c1b1b] px-3.5 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="ui-text-label w-5 shrink-0 text-[#66696a]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="ui-text-body truncate text-white">{ch.title}</span>
                  {ch.done ? (
                    <span className="ui-text-label shrink-0 text-[#18c98a]">已完成</span>
                  ) : null}
                </div>
                <span className="ui-text-label shrink-0 font-['Space_Mono'] text-[#747778]">
                  {ch.duration}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <aside className="h-fit rounded-[10px] bg-[#1c1b1b] p-4 lg:sticky lg:top-6">
          <div className="font-['Space_Mono'] text-[24px] leading-none text-white">
            {course.price}
          </div>
          <div className="ui-text-meta mt-1 text-[#8a8a8a]">一次购买，永久回看</div>

          <Link to={`/courses/learning/${course.id}`} className="ui-btn ui-btn-primary mt-4 w-full">
            开始学习
          </Link>
          <button type="button" className="ui-btn mt-2 w-full bg-[#2a2a2a] text-white hover:bg-[#333]">
            加入收藏
          </button>

          <ul className="ui-text-meta mt-5 flex list-none flex-col gap-1.5 p-0 text-[#8a8a8a]">
            <li>· {course.lessons} 节视频，支持倍速</li>
            <li>· 提供工程文件与作业点评</li>
            <li>· 学习群长期答疑</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
