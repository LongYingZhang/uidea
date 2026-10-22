import { useState } from "react";
import {
  Chip,
  ChipRow,
  EmptyHint,
  PageHeader,
  PageShell,
} from "../../components/ui/AdminUi";

const notices = [
  {
    id: "n1",
    type: "系统",
    title: "你的作品《百变雪王》进入了本周热门",
    body: "过去 7 天获得 1,204 次浏览、312 个赞。继续保持更新频率，可获得更多推荐曝光。",
    time: "10-22 09:14",
    unread: true,
  },
  {
    id: "n2",
    type: "任务",
    title: "「智能座舱 3D 粒子交互动效」邀请你沟通",
    body: "AURA 科技视觉研究中心 查看了你的主页，并向你发起了合作沟通。",
    time: "10-21 18:02",
    unread: true,
  },
  {
    id: "n3",
    type: "大赛",
    title: "「AI=爱」创意创作大赛进入作品提交期",
    body: "提交截止时间为 2026-12-31 23:59，逾期作品不计入评审。",
    time: "10-20 12:30",
    unread: false,
  },
  {
    id: "n4",
    type: "系统",
    title: "平台规则更新：作品原创性说明",
    body: "自 11 月 1 日起，AIGC 作品需要在提交时标注使用的模型与工具。",
    time: "10-18 10:05",
    unread: false,
  },
] as const;

const TABS = ["全部", "系统", "任务", "大赛"] as const;

export function ConsoleNotificationsPage() {
  const [tab, setTab] = useState<string>("全部");

  const list = notices.filter((n) => tab === "全部" || n.type === tab);

  return (
    <PageShell>
      <PageHeader
        title="通知"
        meta={`${notices.filter((n) => n.unread).length} 条未读`}
      />

      <ChipRow>
        {TABS.map((t) => (
          <Chip key={t} active={tab === t} onClick={() => setTab(t)}>
            {t}
          </Chip>
        ))}
      </ChipRow>

      {list.length === 0 ? (
        <EmptyHint>该分类下暂无通知</EmptyHint>
      ) : (
        <div className="flex flex-col gap-2">
          {list.map((n) => (
            <article
              key={n.id}
              className="flex gap-3 rounded-2xl bg-[#1c1b1b] p-4 transition-colors hover:bg-[#222]"
            >
              <span
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                  n.unread ? "bg-[#ff5f00]" : "bg-[#3a3a3a]"
                }`}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="ui-text-label rounded-[5px] bg-[#2a2a2a] px-1.5 py-0.5 text-[#9ea1a2]">
                    {n.type}
                  </span>
                  <span className="ui-text-label text-[#66696a]">{n.time}</span>
                </div>
                <div className="ui-text-body mt-1.5 font-medium text-white">{n.title}</div>
                <p className="ui-text-meta mt-1 mb-0 text-[#8a8a8a]">{n.body}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </PageShell>
  );
}
