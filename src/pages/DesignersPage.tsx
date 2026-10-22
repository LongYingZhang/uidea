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

type Designer = {
  id: string;
  name: string;
  location: string;
  skills: readonly string[];
  category: (typeof filters)[number];
  creations: number;
  orders: number;
  works: readonly string[];
};

const designers: Designer[] = [
  {
    id: "1",
    name: "张珑瀛",
    location: "广东广州",
    skills: ["UI设计", "Web设计", "活动运营视觉", "AIGC"],
    category: "UI设计",
    creations: 90,
    orders: 35,
    works: [COVER, COVER, COVER, COVER],
  },
  {
    id: "2",
    name: "VortexLab",
    location: "德国柏林",
    skills: ["AIGC", "创意视觉", "影视编导", "后期剪辑"],
    category: "AIGC",
    creations: 128,
    orders: 86,
    works: [COVER, COVER, COVER, COVER],
  },
  {
    id: "3",
    name: "Kaelen Thorne",
    location: "日本东京",
    skills: ["3D建模", "创意视觉", "AIGC", "海报设计"],
    category: "3D建模",
    creations: 64,
    orders: 42,
    works: [COVER, COVER, COVER, COVER],
  },
  {
    id: "4",
    name: "Marcus Berg",
    location: "瑞典斯德哥尔摩",
    skills: ["后期剪辑", "影视编导", "创意视觉", "AIGC"],
    category: "后期剪辑",
    creations: 112,
    orders: 64,
    works: [COVER, COVER, COVER, COVER],
  },
  {
    id: "5",
    name: "Chen.Design",
    location: "中国上海",
    skills: ["LOGO设计", "品牌全案", "平面设计", "海报设计"],
    category: "LOGO设计",
    creations: 76,
    orders: 28,
    works: [COVER, COVER, COVER, COVER],
  },
  {
    id: "6",
    name: "Hyperspace",
    location: "英国伦敦",
    skills: ["UI设计", "网页设计", "品牌全案", "AIGC"],
    category: "网页设计",
    creations: 98,
    orders: 51,
    works: [COVER, COVER, COVER, COVER],
  },
];

export function DesignersPage() {
  const [filter, setFilter] = useState<string>("全部");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const list = designers.filter((d) => {
    const catOk = filter === "全部" || d.category === filter || d.skills.includes(filter);
    const q = query.trim().toLowerCase();
    const qOk =
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.location.toLowerCase().includes(q) ||
      d.skills.some((s) => s.toLowerCase().includes(q));
    return catOk && qOk;
  });

  return (
    <div className="uidea-shell px-margin pt-3 pb-24">
      <FilterChips
        options={filters}
        value={filter}
        onChange={setFilter}
        ariaLabel="设计师分类"
        className="mb-6"
      />

      <section className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
        {list.map((d) => (
          <DesignerCard key={d.id} designer={d} />
        ))}
      </section>
    </div>
  );
}

function DesignerCard({ designer }: { designer: Designer }) {
  const initial = designer.name.slice(0, 1);

  return (
    <article className="ui-card flex flex-col gap-2">
      {/* Header: avatar · name/location · stats · CTA */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-1.5">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a] ui-text-body font-medium text-[#f4f4f4]"
            aria-hidden
          >
            {initial}
          </span>
          <div className="min-w-0">
            <h2 className="ui-text-body truncate font-medium text-white">{designer.name}</h2>
            <p className="ui-text-meta truncate text-[#999]">{designer.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Stat value={designer.creations} label="创作" />
          <Stat value={designer.orders} label="订单" />
        </div>

        <Link to={`/designers/${designer.id}`} className="ui-btn ui-btn-primary ml-auto shrink-0">
          查看主页
        </Link>
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-1">
        {designer.skills.map((skill) => (
          <span
            key={skill}
            className="ui-text-label rounded-[6px] bg-[#2a2a2a] px-1.5 py-0.5 text-[#999]"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Portfolio — landscape thumbs (site 16:10), not square */}
      <div className="grid grid-cols-4 gap-1">
        {designer.works.map((src, i) => (
          <div
            key={`${designer.id}-w-${i}`}
            className="uidea-media overflow-hidden rounded-[6px] bg-[#0e0e0e]"
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </article>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 text-center">
      <span className="font-['Space_Mono'] text-[13px] font-medium leading-none text-white">
        {value}
      </span>
      <span className="ui-text-label text-[#999]">{label}</span>
    </div>
  );
}
