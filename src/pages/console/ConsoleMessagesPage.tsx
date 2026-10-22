import { useState } from "react";
import { PageHeader, PageShell } from "../../components/ui/AdminUi";

type Thread = {
  id: string;
  name: string;
  initials: string;
  company: string;
  preview: string;
  time: string;
  unread: number;
  messages: { from: "them" | "me"; text: string; time: string }[];
};

const threads: Thread[] = [
  {
    id: "t1",
    name: "李工",
    initials: "李",
    company: "AURA 科技视觉研究中心",
    preview: "我们想先看一下粒子动效的参考风格…",
    time: "18:02",
    unread: 2,
    messages: [
      { from: "them", text: "你好，看了你在广场上的 3D 作品，风格很合适。", time: "17:40" },
      { from: "them", text: "我们想先看一下粒子动效的参考风格，方便发两三个链接吗？", time: "18:02" },
      { from: "me", text: "可以，我整理一份参考给你，明天上午发。", time: "18:10" },
    ],
  },
  {
    id: "t2",
    name: "Vortex Studio",
    initials: "VX",
    company: "幻境实验室",
    preview: "合同附件已经发到你的邮箱了",
    time: "10-21",
    unread: 0,
    messages: [
      { from: "them", text: "合同附件已经发到你的邮箱了，麻烦确认一下交付节点。", time: "10-21" },
      { from: "me", text: "收到，今晚看完回你。", time: "10-21" },
    ],
  },
];

export function ConsoleMessagesPage() {
  const [activeId, setActiveId] = useState(threads[0].id);
  const [draft, setDraft] = useState("");
  const active = threads.find((t) => t.id === activeId) ?? threads[0];

  return (
    <PageShell>
      <PageHeader title="沟通" meta={`${threads.length} 个会话`} />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="flex flex-col gap-1.5">
          {threads.map((t) => {
            const on = t.id === activeId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveId(t.id)}
                className={`flex items-start gap-2.5 rounded-2xl p-3 text-left transition-colors ${
                  on ? "bg-[#2a2a2a]" : "bg-[#1c1b1b] hover:bg-[#222]"
                }`}
              >
                <span className="ui-text-label flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3a3a3a] font-medium text-white">
                  {t.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="ui-text-body truncate font-medium text-white">{t.name}</span>
                    <span className="ui-text-label shrink-0 text-[#66696a]">{t.time}</span>
                  </span>
                  <span className="ui-text-meta mt-0.5 block truncate text-[#8a8a8a]">
                    {t.preview}
                  </span>
                </span>
                {t.unread > 0 ? (
                  <span className="ui-text-label mt-1 rounded-full bg-[#ff5f00] px-1.5 text-white">
                    {t.unread}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="flex min-h-[420px] flex-col rounded-2xl bg-[#1c1b1b]">
          <div className="flex items-center justify-between border-b border-[#2a2a2a] px-4 py-3">
            <div>
              <div className="ui-text-body font-medium text-white">{active.name}</div>
              <div className="ui-text-label text-[#8a8a8a]">{active.company}</div>
            </div>
            <span className="ui-text-label text-[#66696a]">原型会话</span>
          </div>

          <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-4">
            {active.messages.map((m, i) => (
              <div
                key={`${m.time}-${i}`}
                className={`ui-text-meta max-w-[78%] rounded-2xl px-3 py-2 ${
                  m.from === "me"
                    ? "self-end bg-white text-[#121212]"
                    : "self-start bg-[#2a2a2a] text-[#e5e2e1]"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDraft("");
            }}
            className="flex items-center gap-2 border-t border-[#2a2a2a] p-3"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="输入消息…"
              className="ui-input"
            />
            <button type="submit" className="ui-btn ui-btn-primary shrink-0">
              发送
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
