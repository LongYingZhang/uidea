import { Link, useParams } from "react-router-dom";

type Doc = {
  title: string;
  updated: string;
  sections: { heading: string; paragraphs: readonly string[] }[];
};

const DOCS: Record<string, Doc> = {
  terms: {
    title: "用户协议",
    updated: "2026-09-01",
    sections: [
      {
        heading: "一、协议的适用范围",
        paragraphs: [
          "本协议是你与 Uidea 之间就使用平台服务达成的约定。注册、浏览或发布内容，均视为你已阅读并同意本协议。",
          "本页为原型演示文本，不构成任何具有法律效力的条款。",
        ],
      },
      {
        heading: "二、账号与内容",
        paragraphs: [
          "你对自己发布的作品、文字与素材负责，并保证拥有相应的使用权。使用生成式工具创作的内容，应按平台要求标注工具与流程。",
          "平台不对作品的市场价值、商业结果作出承诺。",
        ],
      },
      {
        heading: "三、任务与结算",
        paragraphs: [
          "需求方与创作者就任务范围、交付物与价格自行达成一致。平台提供沟通与记录能力，不介入具体创作决策。",
          "发生争议时，双方应先行协商；协商不成可申请平台介入调解。",
        ],
      },
    ],
  },
  privacy: {
    title: "隐私政策",
    updated: "2026-09-01",
    sections: [
      {
        heading: "一、我们收集什么",
        paragraphs: [
          "账号信息（邮箱、昵称）、你主动填写的个人资料、发布的作品与互动记录。",
          "为保障服务运行，会记录必要的访问日志，例如设备类型与页面访问路径。",
        ],
      },
      {
        heading: "二、如何使用",
        paragraphs: [
          "用于账号登录、内容展示、任务匹配与通知提醒。我们不会将你的联系方式展示给未与你建立沟通关系的用户。",
        ],
      },
      {
        heading: "三、你的权利",
        paragraphs: [
          "你可以随时查看、修改个人资料，或申请导出与删除账号数据。删除后与账号关联的作品将同步下线。",
        ],
      },
    ],
  },
};

export function LegalPage() {
  const { slug } = useParams();
  const doc = (slug && DOCS[slug]) || DOCS.terms;

  return (
    <div className="uidea-shell px-margin py-8">
      <Link to="/" className="ui-text-meta text-[#8a8a8a] hover:text-white">
        ← 返回广场
      </Link>

      <div className="mt-6 max-w-[720px]">
        <h1 className="m-0 text-[24px] font-semibold leading-8 text-white">{doc.title}</h1>
        <p className="ui-text-label mt-1 mb-0 font-['Space_Mono'] text-[#66696a]">
          更新于 {doc.updated}
        </p>

        <div className="mt-8 flex flex-col gap-7">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="ui-text-body m-0 font-medium text-white">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="ui-text-body mt-2 mb-0 leading-relaxed text-[#a3a3a3]">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="ui-text-meta mt-10 flex gap-4 text-[#747778]">
          <Link to="/legal/terms" className="hover:text-white">
            用户协议
          </Link>
          <Link to="/legal/privacy" className="hover:text-white">
            隐私政策
          </Link>
        </div>
      </div>
    </div>
  );
}
