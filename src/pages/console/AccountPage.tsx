import { useState } from "react";
import {
  Field,
  PageHeader,
  PageShell,
  PrimaryButton,
  inputClass,
} from "../../components/ui/AdminUi";

const toggles = [
  { key: "comment", label: "有人评论我的作品", desc: "评论、@ 提及与回复" },
  { key: "like", label: "作品被点赞", desc: "每累计 10 个赞合并提醒一次" },
  { key: "task", label: "新任务推荐", desc: "匹配我的技能标签的任务" },
  { key: "news", label: "平台公告", desc: "规则更新、活动与大赛信息" },
] as const;

export function AccountPage() {
  const [state, setState] = useState<Record<string, boolean>>({
    comment: true,
    like: false,
    task: true,
    news: true,
  });
  const [email, setEmail] = useState("longying@example.com");

  return (
    <PageShell>
      <PageHeader title="账号管理" meta="邮箱、密码与通知偏好" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section>
          <h2 className="ui-text-body mb-3 font-medium text-white">基本信息</h2>
          <Field label="登录邮箱">
            <input value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </Field>
          <Field label="当前密码">
            <input type="password" placeholder="修改密码需先验证当前密码" className={inputClass} />
          </Field>
          <Field label="新密码">
            <input type="password" placeholder="至少 6 位" className={inputClass} />
          </Field>
          <PrimaryButton>更新账号</PrimaryButton>
        </section>

        <section>
          <h2 className="ui-text-body mb-3 font-medium text-white">通知偏好</h2>
          <div className="flex flex-col gap-2">
            {toggles.map((t) => (
              <div
                key={t.key}
                className="flex items-center justify-between gap-4 rounded-2xl bg-[#1c1b1b] px-4 py-3"
              >
                <div className="min-w-0">
                  <div className="ui-text-body text-white">{t.label}</div>
                  <div className="ui-text-meta text-[#8a8a8a]">{t.desc}</div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={!!state[t.key]}
                  aria-label={t.label}
                  onClick={() => setState((s) => ({ ...s, [t.key]: !s[t.key] }))}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    state[t.key] ? "bg-white" : "bg-[#3a3a3a]"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full transition-all ${
                      state[t.key] ? "left-[22px] bg-[#121212]" : "left-0.5 bg-[#8a8a8a]"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[#3a1f1f] bg-[#1c1414] px-4 py-3">
            <div className="ui-text-body text-[#ff8b84]">注销账号</div>
            <p className="ui-text-meta mt-1 mb-0 text-[#a08a8a]">
              注销后作品与历史任务记录将不可恢复，此操作在原型中不会真的执行。
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
