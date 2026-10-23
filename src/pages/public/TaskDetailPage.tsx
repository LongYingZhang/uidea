import { useState } from "react";
import { Link, useParams } from "react-router-dom";

type Detail = {
  id: string;
  title: string;
  company: string;
  price: string;
  due: string;
  applicants: number;
  tags: readonly string[];
  summary: string;
  requirements: readonly string[];
  deliverables: readonly string[];
};

const TASKS: Record<string, Detail> = {
  "1": {
    id: "1",
    title: "企业项目宣传简介",
    company: "北京宙晴科技有限公司",
    price: "¥1,000",
    due: "2026-07-07",
    applicants: 456,
    tags: ["加急", "广州", "C端小程序", "需上门"],
    summary:
      "企业项目简介根据项目资料，进行平面设计。项目内容不能外发，需要本地上门服务。可以按照上门服务收费。",
    requirements: ["能到广州本地现场沟通", "有企业画册/简介设计经验", "可接受保密协议"],
    deliverables: ["宣传简介 A4 双面 2 版", "源文件（AI/PSD）", "印刷对接支持"],
  },
  "2": {
    id: "2",
    title: "2025 全球AI短片先导预告片视觉合成",
    company: "幻境实验室 Vortex Studio",
    price: "¥35,000",
    due: "2026-03-15",
    applicants: 18,
    tags: ["加急", "北京", "商业预告片", "远程"],
    summary:
      "针对下半年全球首发的科幻叙事短片，需要导演级概念艺术家。利用 ComfyUI 与 Midjourney 定制一致性人物与深空场景资产，含 18 组 4K 动态镜头。",
    requirements: ["熟悉 ComfyUI 节点与 LoRA 训练", "有商业预告片交付经验", "能配合导演做 2 轮以上修改"],
    deliverables: ["18 组 4K 动态镜头", "一致性人物资产包", "分层工程文件"],
  },
};

const FALLBACK: Detail = {
  id: "0",
  title: "智能座舱 3D 粒子交互动效原型",
  company: "AURA 科技视觉研究中心",
  price: "¥68,000",
  due: "2026-03-20",
  applicants: 24,
  tags: ["深圳", "3D交互", "HMI"],
  summary:
    "为新能源旗舰车型定制驾驶模式切换的多维粒子动画。基于 UE5 Niagara 或 TouchDesigner，输出轻量化着色器资产与高清 Demo。",
  requirements: ["UE5 或 TouchDesigner 实战经验", "理解 HMI 动效节奏", "可交付轻量化资产"],
  deliverables: ["4 组驾驶模式动效", "实时 Demo 工程", "资产与规范文档"],
};

export function TaskDetailPage() {
  const { id } = useParams();
  const task = (id && TASKS[id]) || FALLBACK;
  const [applied, setApplied] = useState(false);

  return (
    <div className="uidea-shell px-margin py-8">
      <Link to="/tasks" className="ui-text-meta text-[#8a8a8a] hover:text-white">
        ← 返回任务列表
      </Link>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <div className="ui-text-meta flex items-center gap-2 text-[#8a8a8a]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2a2a2a] text-white">
              {task.company.slice(0, 1)}
            </span>
            {task.company}
          </div>

          <h1 className="mt-2 mb-0 text-[20px] font-semibold leading-7 text-white">{task.title}</h1>

          <div className="mt-3 flex flex-wrap gap-2">
            {task.tags.map((t) => (
              <span
                key={t}
                className="ui-text-label rounded-[6px] bg-[#1c1b1b] px-2 py-1 text-[#9ea1a2]"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="ui-text-body mt-5 mb-0 leading-relaxed text-[#c9c9c9]">{task.summary}</p>

          <h2 className="ui-text-body mt-8 mb-2 font-medium text-white">能力要求</h2>
          <ul className="ui-text-body m-0 list-disc pl-5 text-[#a3a3a3]">
            {task.requirements.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>

          <h2 className="ui-text-body mt-8 mb-2 font-medium text-white">交付物</h2>
          <ul className="ui-text-body m-0 list-disc pl-5 text-[#a3a3a3]">
            {task.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-[10px] bg-[#1c1b1b] p-4 lg:sticky lg:top-6">
          <div className="font-['Space_Mono'] text-[24px] leading-none text-white">{task.price}</div>
          <div className="ui-text-meta mt-1 text-[#8a8a8a]">预算区间，可沟通</div>

          <dl className="mt-4 flex flex-col gap-2">
            {[
              ["截止时间", task.due],
              ["已报名", `${task.applicants} 人`],
              ["交付周期", "面议"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <dt className="ui-text-label text-[#747778]">{k}</dt>
                <dd className="ui-text-meta m-0 text-white">{v}</dd>
              </div>
            ))}
          </dl>

          <button
            type="button"
            onClick={() => setApplied(true)}
            disabled={applied}
            className={`ui-btn mt-5 w-full ${
              applied ? "bg-[#122a20] text-[#18c98a]" : "ui-btn-primary"
            }`}
          >
            {applied ? "已提交报名" : "立即报名"}
          </button>

          <button type="button" className="ui-btn mt-2 w-full bg-[#2a2a2a] text-white hover:bg-[#333]">
            联系客户
          </button>
        </aside>
      </div>
    </div>
  );
}
