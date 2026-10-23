import { Link } from "react-router-dom";

const features = [
  {
    title: "作品广场",
    desc: "按分类与关键词发现创作者，卡片以封面为主体，信息只留作者与标题。",
    to: "/",
  },
  {
    title: "任务协作",
    desc: "需求方发布任务，创作者报名沟通，价格、周期与交付物写在同一条记录里。",
    to: "/tasks",
  },
  {
    title: "设计师主页",
    desc: "一个可分享的个人页，作品、标签与联系方式保持一致。",
    to: "/designers",
  },
  {
    title: "课程与大赛",
    desc: "从技能补齐到主题竞赛，把练习变成可以被看见的成果。",
    to: "/courses",
  },
];

export function ProductPage() {
  return (
    <div className="uidea-shell px-margin py-8">
      <Link to="/" className="ui-text-meta text-[#8a8a8a] hover:text-white">
        ← 返回广场
      </Link>

      <header className="mt-6 max-w-[720px]">
        <p className="ui-text-label m-0 uppercase tracking-[0.14em] text-[#ff5f00]">Product</p>
        <h1 className="mt-3 mb-0 text-[28px] font-semibold leading-9 text-white sm:text-[36px] sm:leading-[44px]">
          一个广场，四件事。
        </h1>
        <p className="ui-text-body mt-4 mb-0 text-[#a3a3a3]">
          Uidea 把发现、合作、学习与竞赛放在同一套界面语言里，减少在不同工具之间来回搬运的成本。
        </p>
      </header>

      <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {features.map((f) => (
          <Link
            key={f.title}
            to={f.to}
            className="group rounded-[10px] bg-[#1c1b1b] p-5 transition-colors hover:bg-[#222]"
          >
            <div className="ui-text-body font-medium text-white">{f.title}</div>
            <p className="ui-text-body mt-1.5 mb-0 text-[#a3a3a3]">{f.desc}</p>
            <span className="ui-text-meta mt-3 inline-block text-[#747778] group-hover:text-white">
              去看看 →
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-10 rounded-[10px] bg-[#141414] p-6 sm:p-8">
        <h2 className="ui-text-body m-0 font-medium text-white">关于这个原型</h2>
        <p className="ui-text-body mt-2 mb-0 max-w-[680px] text-[#8a8a8a]">
          当前页面是从设计稿重建的本地原型：左侧导航可收起展开，内容区跟随动画；数据均为示例，不连接真实后端。
        </p>
      </section>
    </div>
  );
}
