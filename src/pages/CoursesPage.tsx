import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FilterChips } from "../components/ui/FilterChips";

const COVER = "/covers/cover-art.png";

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

type Course = {
  id: string;
  title: string;
  chapters: string;
  price: string;
  learners: number;
  author: string;
  authorInitial: string;
  category: (typeof filters)[number];
  levelLabel: string;
  cover: string;
};

const courses: Course[] = [
  {
    id: "1",
    title: "【重磅开售】AI+大师创作课",
    chapters: "13章14节",
    price: "2999 ¥",
    learners: 20584,
    author: "@LONGYINGZHANG",
    authorInitial: "张",
    category: "AIGC",
    levelLabel: "入门",
    cover: COVER,
  },
  {
    id: "2",
    title: "ComfyUI 先锋影视概念分镜与动态控制流",
    chapters: "18章24节",
    price: "1680 ¥",
    learners: 12840,
    author: "@VortexLab",
    authorInitial: "V",
    category: "影视编导",
    levelLabel: "入门",
    cover: COVER,
  },
  {
    id: "3",
    title: "TouchDesigner 与 GLSL 实时计算生成美学",
    chapters: "24章30节",
    price: "2480 ¥",
    learners: 8632,
    author: "@MarcusBerg",
    authorInitial: "M",
    category: "创意视觉",
    levelLabel: "进阶",
    cover: COVER,
  },
  {
    id: "4",
    title: "Houdini 拓扑流体与微结构动力学",
    chapters: "32章40节",
    price: "3680 ¥",
    learners: 4210,
    author: "@Hyperspace",
    authorInitial: "H",
    category: "3D建模",
    levelLabel: "大师",
    cover: COVER,
  },
  {
    id: "5",
    title: "虚幻引擎实时大屏与舞台视觉拓扑",
    chapters: "20章22节",
    price: "2180 ¥",
    learners: 6540,
    author: "@KaelenT",
    authorInitial: "K",
    category: "UI设计",
    levelLabel: "进阶",
    cover: COVER,
  },
  {
    id: "6",
    title: "极简标量字体与符号体系程序化生成",
    chapters: "12章16节",
    price: "980 ¥",
    learners: 15220,
    author: "@Chen.Design",
    authorInitial: "C",
    category: "LOGO设计",
    levelLabel: "入门",
    cover: COVER,
  },
];

export function CoursesPage() {
  const [filter, setFilter] = useState<string>("全部");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const list = courses.filter((c) => {
    const catOk = filter === "全部" || c.category === filter;
    const q = query.trim().toLowerCase();
    const qOk =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.author.toLowerCase().includes(q);
    return catOk && qOk;
  });

  return (
    <div className="uidea-shell px-margin pt-3 pb-24">
      <FilterChips
        options={filters}
        value={filter}
        onChange={setFilter}
        ariaLabel="课程分类"
        className="mb-6"
      />

      <div className="uidea-grid !gap-5">
        {list.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Link to={`/courses/${course.id}`} className="ui-card flex h-full flex-col gap-2">
      {/* Cover — same inset as text; all sides = card pad */}
      <div className="uidea-media relative overflow-hidden rounded-[8px] bg-[#0e0e0e]">
        <img src={course.cover} alt="" className="h-full w-full object-cover" />
        <span className="ui-text-label absolute right-1.5 top-1.5 rounded-[6px] bg-[#131313]/80 px-1.5 py-0.5 text-white backdrop-blur-[2px]">
          {course.levelLabel}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <h2 className="ui-text-body min-w-0 flex-1 truncate font-medium text-white">
            {course.title}
          </h2>
          <span className="ui-text-label shrink-0 text-[#888]">{course.chapters}</span>
        </div>

        <div className="flex items-baseline justify-between gap-2">
          <span className="font-['Space_Mono'] text-[16px] font-medium leading-none tracking-tight text-white">
            {course.price}
          </span>
          <span className="ui-text-label text-[#888]">{course.learners}人正在学习</span>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-1.5 border-t border-[#1f1f1f] pt-2">
        <span
          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a] ui-text-label font-medium text-white"
          aria-hidden
        >
          {course.authorInitial}
        </span>
        <span className="ui-text-label truncate font-['Space_Grotesk'] uppercase tracking-wider text-[#888]">
          {course.author}
        </span>
      </div>
    </Link>
  );
}
