import { Link } from "react-router-dom";

const sections = [
  {
    title: "我们相信什么",
    body: "设计不该被渠道和预算切成碎片。一个想法从草稿到落地，应该在同一条链路上完成，被同一群人看见。",
  },
  {
    title: "为什么做 Uidea",
    body: "品牌找不到合适的设计师，设计师找不到值得投入的项目。我们把两边放进同一个广场，让匹配发生在作品上，而不是简历上。",
  },
  {
    title: "关于 AI",
    body: "AI 是笔，不是作者。平台鼓励标注工具与流程，也坚持把署名和收益留给真正做决定的人。",
  },
];

const stats = [
  { value: "48,000+", label: "注册创作者" },
  { value: "126,000+", label: "公开作品" },
  { value: "3,200+", label: "已交付任务" },
  { value: "12", label: "覆盖城市" },
];

export function VisionPage() {
  return (
    <div className="uidea-shell px-margin py-8">
      <Link to="/" className="ui-text-meta text-[#8a8a8a] hover:text-white">
        ← 返回广场
      </Link>

      <header className="mt-6 max-w-[760px]">
        <p className="ui-text-label m-0 uppercase tracking-[0.14em] text-[#ff5f00]">Uidea Vision</p>
        <h1 className="mt-3 mb-0 text-[28px] font-semibold leading-9 text-white sm:text-[36px] sm:leading-[44px]">
          让每一个认真做设计的人，被认真对待。
        </h1>
        <p className="ui-text-body mt-4 mb-0 text-[#a3a3a3]">
          我们不打算做另一个作品集网站。Uidea 想解决的是一件更具体的事：让创作、协作与收益回到同一张桌子上。
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-[16px] bg-[#1c1b1b] p-4">
            <div className="font-['Space_Mono'] text-[22px] leading-7 text-white">{s.value}</div>
            <div className="ui-text-label mt-0.5 text-[#747778]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="ui-text-body m-0 font-medium text-white">{s.title}</h2>
            <p className="ui-text-body mt-2 mb-0 leading-relaxed text-[#a3a3a3]">{s.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-12 rounded-[16px] border border-[#2a2a2a] p-6 sm:p-8">
        <h2 className="m-0 text-[18px] font-semibold text-white">加入我们</h2>
        <p className="ui-text-body mt-2 mb-4 max-w-[560px] text-[#a3a3a3]">
          无论你是创作者、品牌方，还是想把这件事做得更好的人，都可以从这里开始。
        </p>
        <div className="flex flex-wrap gap-2">
          <Link to="/register" className="ui-btn ui-btn-primary">
            注册成为创作者
          </Link>
          <Link to="/register/enterprise" className="ui-btn bg-[#2a2a2a] text-white hover:bg-[#333]">
            企业入驻
          </Link>
        </div>
      </section>
    </div>
  );
}
