import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Field, inputClass } from "../../components/ui/AdminUi";
import { works, courses, tasks } from "../../data/mock";

const COVER = "/covers/cover-art.png";

type Profile = {
  name: string;
  handle: string;
  title: string;
  city: string;
  bio: string;
  site: string;
  social: string;
  joined: string;
  available: boolean;
  orders: number;
};

const initialProfile: Profile = {
  name: "Longying Zhang",
  handle: "longying_zhang",
  title: "AI视觉设计品牌创意",
  city: "杭州，中国",
  bio: "关注影像叙事与生成模型的可控性，长期做短片与品牌视觉。习惯把画面压到低饱和、留一层颗粒，让记忆里的空间自己浮出来。最近在做一组以「归乡」为线索的影像实验。",
  site: "longying.studio",
  social: "@LONGYINGZHANG",
  joined: "2025 年 3 月",
  available: true,
  orders: 86,
};

const metrics = [
  { label: "关注", value: "128" },
  { label: "粉丝", value: "1,204" },
  { label: "作品", value: String(works.length) },
];

const TABS = [
  { key: "work", label: "作品" },
  { key: "course", label: "课程" },
  { key: "task", label: "任务" },
  { key: "about", label: "关于" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [draft, setDraft] = useState<Profile>(initialProfile);
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState("");

  const set =
    (key: "name" | "title" | "city" | "bio" | "site" | "social") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDraft((d) => ({ ...d, [key]: e.target.value }));
    };

  const startEdit = () => {
    setDraft(profile);
    setEditing(true);
    setToast("");
  };

  const cancelEdit = () => {
    setEditing(false);
    setToast("");
  };

  const saveEdit = () => {
    setProfile(draft);
    setEditing(false);
    setToast("资料已更新");
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast("主页链接已复制");
    } catch {
      setToast("复制失败，请手动复制地址栏链接");
    }
  };

  /* Message / share / edit — top of the right column; metrics stack below */
  const actions = (
    <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto">
      {editing ? (
        <>
          <button
            type="button"
            onClick={cancelEdit}
            className="ui-btn bg-[#1c1b1b] text-[#c4c7c8] hover:bg-[#222]"
          >
            取消
          </button>
          <button
            type="button"
            onClick={saveEdit}
            className="ui-btn bg-white text-[#121212] hover:bg-[#dedede]"
          >
            保存
          </button>
        </>
      ) : (
        <>
          <Link
            to="/messages"
            className="ui-chip bg-[#1c1b1b] text-[#c4c7c8] hover:bg-[#222]"
          >
            发消息
          </Link>
          <button
            type="button"
            onClick={share}
            className="ui-btn bg-[#1c1b1b] text-[#c4c7c8] hover:bg-[#222]"
          >
            分享主页
          </button>
          <button
            type="button"
            onClick={startEdit}
            className="ui-btn bg-white text-[#121212] hover:bg-[#dedede]"
          >
            编辑资料
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="pb-24">
      {editing ? (
        <div className="uidea-shell px-margin pt-3">
          {/* Editing keeps the actions on their own row above the form */}
          <div className="mb-6 flex justify-end">{actions}</div>
          <EditPanel draft={draft} setDraft={setDraft} set={set} />
        </div>
      ) : (
        <ProfileView profile={profile} toast={toast} />
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- view */

function ProfileView({ profile, toast }: { profile: Profile; toast: string }) {
  const [tab, setTab] = useState<TabKey>(() => {
    const p = new URLSearchParams(window.location.search).get("tab");
    return p === "course" || p === "task" ? p : "work";
  });

  return (
    <>
      {/*
        Full-bleed hero — the cover runs edge to edge underneath the
        avatar / name / stats. It is pulled up by the layout's top padding
        so it sits flush with the top of the viewport.
      */}
      <section
        aria-label="个人主页封面"
        className="relative -mt-[calc(var(--spacing-margin)_-_0.5rem)] w-full overflow-hidden bg-[#0a0a0a]"
      >
        <img
          src={COVER}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-center brightness-[0.45] saturate-[0.75]"
        />
        {/* Even darkening so the type on top always clears contrast */}
        <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
        {/* Top scrim — keeps the very first pixels from glowing */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[32%] bg-gradient-to-b from-black/50 to-transparent"
        />
        {/* Bottom fade — the picture sinks into the page background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[82%] bg-gradient-to-t from-[#131313] via-[#131313]/90 to-transparent"
        />

        <div className="uidea-shell relative px-margin pt-7 pb-6 sm:pt-9 sm:pb-8">
          <div className="flex w-full flex-col items-start">
            <div className="h-20 w-20 overflow-hidden rounded-full bg-[#1c1b1b] ring-1 ring-white/20">
              <img src={COVER} alt={profile.name} className="h-full w-full object-cover" />
            </div>

            <h1 className="mt-4 mb-0 font-['Space_Grotesk'] text-[30px] font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-[36px]">
              {profile.name}
            </h1>

            <div className="mt-2 flex flex-col gap-0.5">
              <p className="ui-text-meta m-0 text-[#dcdad9]">{profile.title}</p>
              <Link
                to="/messages"
                className="ui-text-meta w-fit text-[#9a9c9d] transition-colors hover:text-white"
              >
                联系我吧
              </Link>
            </div>

            {/* Stats — 作品 / 订单, sitting under the title */}
            <div className="mt-4 flex items-start gap-8">
              <div>
                <div className="font-['Space_Mono'] text-[20px] font-bold leading-6 tracking-[-0.02em] text-white">
                  {works.length}
                </div>
                <div className="ui-text-label mt-1.5 text-white/70">作品</div>
              </div>
              <div>
                <div className="font-['Space_Mono'] text-[20px] font-bold leading-6 tracking-[-0.02em] text-white">
                  {profile.orders}
                </div>
                <div className="ui-text-label mt-1.5 text-white/70">订单</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="uidea-shell px-margin">
        {toast ? (
          <div className="ui-text-meta mt-4 inline-flex rounded-[9px] bg-[#1c1b1b] px-3 py-2 text-[#18c98a]">
            {toast}
          </div>
        ) : null}

        {/* Tabs — plain text row, selected item carries a short underline */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <nav
            className="flex min-w-0 items-center gap-5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="个人资料分栏"
          >
            {TABS.map((t) => {
              const on = t.key === tab;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  aria-current={on ? "page" : undefined}
                  className={`ui-text-meta relative flex h-9 shrink-0 items-center transition-colors ${
                    on
                      ? "font-medium text-white"
                      : "text-[#747778] hover:text-white"
                  }`}
                >
                  {t.label}
                  {on ? (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-1/2 h-[3px] w-1/2 -translate-x-1/2 bg-white"
                    />
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6">
          {tab === "work" ? <WorkPanel /> : null}
          {tab === "course" ? <CoursePanel /> : null}
          {tab === "task" ? <TaskPanel /> : null}
          {tab === "about" ? <ProfileAbout profile={profile} /> : null}
        </div>
      </div>
    </>
  );
}

/* ----------------------------------------------------------- about */

function ProfileAbout({ profile }: { profile: Profile }) {
  return (
    <section>
      <SectionTitle>关于</SectionTitle>
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px]">
        <p className="ui-text-body m-0 max-w-[64ch] text-[#c4c7c8]">{profile.bio}</p>

        <div className="rounded-[10px] bg-[#161616] p-4">
          <dl className="m-0">
            <DetailRow label="所在地" value={profile.city} />
            <DetailRow label="个人网站" value={profile.site} />
            <DetailRow label="社交账号" value={profile.social} />
            <DetailRow label="加入时间" value={profile.joined} />
            <DetailRow
              label="接单状态"
              value={profile.available ? "可接单" : "档期已满"}
              accent={profile.available}
            />
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- work list */

type WorkStatus = "published" | "offline" | "draft";
type WorkSubTab = "mine" | "entry" | "draft";

type ManagedWork = {
  id: string;
  title: string;
  category: string;
  event: string;
  cover: string;
  likes: number;
  views: number;
  status: WorkStatus;
  bucket: "mine" | "entry";
  date: string;
};

const WORK_SEED: { status: WorkStatus; bucket: "mine" | "entry"; date: string }[] = [
  { status: "offline", bucket: "mine", date: "2026-06-04" },
  { status: "published", bucket: "mine", date: "2026-06-04" },
  { status: "published", bucket: "entry", date: "2026-05-28" },
  { status: "published", bucket: "entry", date: "2026-05-21" },
  { status: "published", bucket: "mine", date: "2026-05-12" },
  { status: "offline", bucket: "mine", date: "2026-04-30" },
  { status: "published", bucket: "entry", date: "2026-04-18" },
  { status: "draft", bucket: "mine", date: "2026-04-02" },
  { status: "draft", bucket: "mine", date: "2026-03-26" },
  { status: "published", bucket: "mine", date: "2026-03-11" },
];

const managedWorks: ManagedWork[] = works
  .slice(0, WORK_SEED.length)
  .map((w, i) => {
    const seed = WORK_SEED[i] ?? WORK_SEED[0];
    return {
      id: w.id,
      title: w.title,
      category: w.category,
      event: "士气赛跑",
      cover: w.cover,
      likes: w.likes,
      views: w.views,
      status: seed.status,
      bucket: seed.bucket,
      date: seed.date,
    };
  });

const SUB_TABS: { key: WorkSubTab; label: string }[] = [
  { key: "mine", label: "我的作品" },
  { key: "entry", label: "参赛作品" },
  { key: "draft", label: "我的草稿" },
];

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "不限状态" },
  { value: "published", label: "已发布" },
  { value: "offline", label: "已下线" },
  { value: "draft", label: "草稿" },
];

const STATUS_META: Record<WorkStatus, { label: string; cls: string }> = {
  published: { label: "已发布", cls: "bg-[#18c98a]/[0.16] text-[#18c98a]" },
  offline: { label: "已下线", cls: "bg-white/[0.07] text-[#9ea1a2]" },
  draft: { label: "草稿", cls: "bg-white/[0.07] text-[#747778]" },
};

function formatCount(n: number) {
  if (n < 10000) return String(n);
  return `${(n / 10000).toFixed(1)}万`;
}

function WorkPanel() {
  const [sub, setSub] = useState<WorkSubTab>("mine");
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<ManagedWork[]>(managedWorks);
  const [menuOpen, setMenuOpen] = useState(false);
  const [spin, setSpin] = useState(0);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menuOpen]);

  const keyword = query.trim();
  const visible = items.filter((w) => {
    const inTab =
      sub === "draft" ? w.status === "draft" : w.bucket === sub && w.status !== "draft";
    const inStatus = status === "all" || w.status === status;
    const inQuery = keyword === "" || w.title.includes(keyword);
    return inTab && inStatus && inQuery;
  });

  const toggleOffline = (id: string) => {
    setItems((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status: w.status === "offline" ? "published" : "offline" }
          : w
      )
    );
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((w) => w.id !== id));
  };

  const reset = () => {
    setStatus("all");
    setQuery("");
    setSpin((n) => n + 1);
  };

  const activeStatusLabel =
    STATUS_OPTIONS.find((o) => o.value === status)?.label ?? "不限状态";

  return (
    <>
      {/* Secondary filter — sub tabs + primary action */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <nav
          className="flex min-w-0 items-center gap-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="作品分类"
        >
          {SUB_TABS.map((t) => {
            const on = t.key === sub;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setSub(t.key)}
                aria-current={on ? "page" : undefined}
                className={`ui-text-meta relative h-9 shrink-0 transition-colors ${
                  on
                    ? "font-medium text-white"
                    : "text-[#747778] hover:text-white"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </nav>

        <Link to="/profile?tab=work" className="ui-btn ui-btn-primary shrink-0">
          <PlusIcon /> 发布作品
        </Link>
      </div>

      {/* Filter row — status select + title search + reset */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            className="ui-btn min-w-[132px] justify-between border border-[#2a2a2a] bg-[#161616] text-[#c4c7c8] hover:border-white/15 hover:text-white"
          >
            {activeStatusLabel}
            <ChevronDownIcon open={menuOpen} />
          </button>

          {menuOpen ? (
            <div
              role="listbox"
              aria-label="作品状态"
              className="absolute left-0 top-full z-20 mt-1 w-[160px] rounded-[9px] border border-[#2a2a2a] bg-[#201f1f] p-1 shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
            >
              {STATUS_OPTIONS.map((o) => {
                const on = o.value === status;
                return (
                  <button
                    key={o.value}
                    type="button"
                    role="option"
                    aria-selected={on}
                    onClick={() => {
                      setStatus(o.value);
                      setMenuOpen(false);
                    }}
                    className={`ui-text-meta flex h-8 w-full items-center justify-between rounded-[6px] px-2 text-left transition-colors hover:bg-white/[0.06] ${
                      on ? "text-white" : "text-[#9ea1a2]"
                    }`}
                  >
                    {o.label}
                    {on ? <CheckIcon /> : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <label className="relative block">
            <span className="sr-only">搜索标题</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索标题"
              className="ui-input w-[200px] pr-9 sm:w-[260px]"
            />
            <SearchIcon />
          </label>
          <button
            type="button"
            onClick={reset}
            aria-label="重置筛选"
            title="重置筛选"
            className="ui-btn w-9 border border-[#2a2a2a] px-0 text-[#9ea1a2] hover:border-white/15 hover:text-white"
          >
            <RefreshIcon spin={spin} />
          </button>
        </div>
      </div>

      {/* List */}
      {visible.length === 0 ? (
        <p className="ui-text-body py-16 text-center text-[#747778]">没有符合条件的作品</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {visible.map((w) => {
            const meta = STATUS_META[w.status];
            return (
              <article
                key={w.id}
                className="flex min-h-[94px] items-start gap-3 rounded-[10px] bg-[#161616] p-3 transition-colors hover:bg-[#1a1a1a] sm:min-h-[106px]"
              >
                <Link
                  to={`/works/${w.id}`}
                  className="uidea-media relative w-[112px] shrink-0 self-start overflow-hidden rounded-[10px] bg-[#0e0e0e] sm:w-[132px]"
                  aria-label={`查看 ${w.title}`}
                >
                  <img
                    src={w.cover}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                  <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <span
                        className={`ui-text-label shrink-0 rounded-[4px] px-1.5 py-0.5 leading-[14px] ${meta.cls}`}
                      >
                        {meta.label}
                      </span>
                      <h3 className="ui-text-body m-0 truncate font-medium text-white">
                        <span className="text-[#9ea1a2]">【{w.event}】</span>
                        {w.title}
                      </h3>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      {w.status === "published" ? (
                        <button
                          type="button"
                          onClick={() => toggleOffline(w.id)}
                          className="ui-btn border border-white/[0.12] px-3 text-[#c4c7c8] hover:border-white/25 hover:text-white"
                        >
                          下线
                        </button>
                      ) : null}
                      {w.status === "offline" || w.status === "draft" ? (
                        <button
                          type="button"
                          onClick={() => remove(w.id)}
                          className="ui-btn border border-white/[0.12] px-3 text-[#c4c7c8] hover:border-white/25 hover:text-white"
                        >
                          删除
                        </button>
                      ) : null}
                      <Link
                        to="/profile?tab=work"
                        className="ui-btn ui-btn-primary min-w-[64px] px-3"
                      >
                        编辑
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
                    <div className="ui-text-meta flex items-center gap-4 text-[#747778]">
                      <span className="inline-flex items-center gap-1.5">
                        <HeartIcon />
                        {formatCount(w.likes)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <EyeIcon />
                        {formatCount(w.views)}
                      </span>
                    </div>
                    <span className="ui-text-label text-[#66696a]">
                      {w.status === "draft" ? "最后编辑" : "发布时间"}：{w.date}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <Link to="/works" className="ui-text-meta text-[#9ea1a2] hover:text-white">
          查看公开作品页 →
        </Link>
      </div>
    </>
  );
}

/* -------------------------------------------------------- course list */

type CourseState = "online" | "offline" | "review" | "rejected" | "draft";
type CourseSubTab = "mine" | "published" | "draft" | "enroll";

type ManagedCourse = {
  id: string;
  baseId: string;
  title: string;
  price: string;
  cover: string;
  level: string;
  chaptersNum: number;
  lessonsNum: number;
  tags: string[];
  learners: number;
  progress: number;
  state: CourseState;
  bucket: Exclude<CourseSubTab, "enroll">;
  postedAt: string;
};

const COURSE_SEED: {
  bucket: Exclude<CourseSubTab, "enroll">;
  state: CourseState;
  progress: number;
  learners: number;
  level: string;
  price: string;
}[] = [
  { bucket: "mine", state: "online", progress: 1, learners: 20584, level: "基础课", price: "¥1999" },
  { bucket: "mine", state: "online", progress: 21, learners: 20584, level: "基础课", price: "¥1999" },
  { bucket: "mine", state: "online", progress: 23, learners: 20584, level: "基础课", price: "¥1999" },
  { bucket: "mine", state: "online", progress: 100, learners: 20584, level: "基础课", price: "¥1999" },
  { bucket: "mine", state: "online", progress: 58, learners: 18432, level: "基础课", price: "¥399" },
  { bucket: "mine", state: "online", progress: 100, learners: 12036, level: "基础课", price: "¥599" },
  { bucket: "published", state: "offline", progress: 0, learners: 0, level: "入门", price: "¥1999" },
  { bucket: "published", state: "online", progress: 0, learners: 0, level: "入门", price: "¥399" },
  { bucket: "published", state: "online", progress: 0, learners: 0, level: "入门", price: "¥599" },
  { bucket: "published", state: "online", progress: 0, learners: 0, level: "入门", price: "¥259" },
  { bucket: "published", state: "online", progress: 0, learners: 0, level: "入门", price: "¥1999" },
  { bucket: "draft", state: "review", progress: 0, learners: 0, level: "入门", price: "免费" },
  { bucket: "draft", state: "rejected", progress: 0, learners: 0, level: "入门", price: "免费" },
  { bucket: "draft", state: "draft", progress: 0, learners: 0, level: "入门", price: "免费" },
  { bucket: "draft", state: "draft", progress: 0, learners: 0, level: "入门", price: "免费" },
];

const COURSE_TAGS = ["AIGC", "创意视觉", "UI设计"];

const managedCourses: ManagedCourse[] = [...courses, ...courses, ...courses, ...courses, ...courses]
  .slice(0, COURSE_SEED.length)
  .map((c, i) => {
    const seed = COURSE_SEED[i] ?? COURSE_SEED[0];
    return {
      id: `${c.id}-${i}`,
      baseId: c.id,
      title: "AI大师课-精品课",
      price: seed.price,
      cover: c.cover,
      level: seed.level,
      chaptersNum: 1,
      lessonsNum: c.lessons,
      tags: COURSE_TAGS,
      learners: seed.learners,
      progress: seed.progress,
      state: seed.state,
      bucket: seed.bucket,
      postedAt: "2026-06-04",
    };
  });

const ENROLLMENTS = Array.from({ length: 9 }, (_, i) => ({
  id: `enroll-${i}`,
  course: "【重磅开售】AI+大师创作课",
  user: "游客1233",
  source: (["付费购买", "免费领取", "活动兑换"] as const)[i % 3],
  time: `2026-05-27 00:07:${String(10 + i * 3).padStart(2, "0")}`,
}));

const COURSE_SUB_TABS: { key: CourseSubTab; label: string }[] = [
  { key: "mine", label: "我的课程" },
  { key: "published", label: "我发布的课程" },
  { key: "draft", label: "我的草稿" },
  { key: "enroll", label: "报名数据" },
];

const COURSE_STATE_META: Record<CourseState, { label: string; cls: string }> = {
  online: { label: "已上架", cls: "bg-[#18c98a]/[0.16] text-[#18c98a]" },
  offline: { label: "已下线", cls: "bg-white/[0.07] text-[#9ea1a2]" },
  review: { label: "待审核", cls: "bg-white text-[#121212]" },
  rejected: { label: "已驳回", cls: "bg-[#ff4d4f]/[0.14] text-[#ff6b6e]" },
  draft: { label: "草稿", cls: "bg-white/[0.07] text-[#747778]" },
};

const MINE_COURSE_STATE_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "不限状态" },
  { value: "learning", label: "学习中" },
  { value: "done", label: "已完成" },
];

const PROGRESS_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "不限进度" },
  { value: "low", label: "0 - 25%" },
  { value: "mid", label: "25% - 60%" },
  { value: "high", label: "60% 以上" },
];

const PUB_STATE_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "不限状态" },
  { value: "online", label: "已上架" },
  { value: "offline", label: "已下线" },
];

const DRAFT_STATE_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "不限状态" },
  { value: "review", label: "待审核" },
  { value: "rejected", label: "已驳回" },
  { value: "draft", label: "草稿" },
];

const SOURCE_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "不限来源" },
  { value: "付费购买", label: "付费购买" },
  { value: "免费领取", label: "免费领取" },
  { value: "活动兑换", label: "活动兑换" },
];

function progressChip(progress: number) {
  return progress >= 100
    ? "bg-white/[0.07] text-[#9ea1a2]"
    : "bg-[#18c98a]/[0.16] text-[#18c98a]";
}

function CoursePanel() {
  const [sub, setSub] = useState<CourseSubTab>(() => {
    const s = new URLSearchParams(window.location.search).get("sub");
    return s === "published" || s === "draft" || s === "enroll" ? s : "mine";
  });
  const [items, setItems] = useState<ManagedCourse[]>(managedCourses);
  const [mineState, setMineState] = useState("all");
  const [mineProgress, setMineProgress] = useState("all");
  const [pubState, setPubState] = useState("all");
  const [draftState, setDraftState] = useState("all");
  const [source, setSource] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<ManagedCourse | null>(null);
  const [creating, setCreating] = useState(false);
  const [spin, setSpin] = useState(0);

  // Deep link: /profile?tab=course&sub=published&detail=1 opens the first course's modal
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("detail") === "1") {
      const first = items.find((c) => c.bucket === sub);
      if (first) setDetail(first);
    }
    if (params.get("create") === "1") setCreating(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchSub = (key: CourseSubTab) => {
    setSub(key);
    setPage(1);
  };

  const reset = () => {
    setMineState("all");
    setMineProgress("all");
    setPubState("all");
    setDraftState("all");
    setSource("all");
    setQuery("");
    setPage(1);
    setSpin((n) => n + 1);
  };

  const takeOffline = (id: string) => {
    setItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, state: "offline" as const } : c))
    );
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((c) => c.id !== id));
  };

  const saveCourse = (state: "draft" | "review") => {
    const fresh: ManagedCourse = {
      id: `new-${Date.now()}`,
      baseId: courses[0]?.id ?? "aigc-storyboard",
      title: "AI大师课-精品课",
      price: "免费",
      cover: COVER,
      level: "入门",
      chaptersNum: 1,
      lessonsNum: 1,
      tags: COURSE_TAGS,
      learners: 0,
      progress: 0,
      state,
      bucket: "draft",
      postedAt: "2026-10-22",
    };
    setItems((prev) => [fresh, ...prev]);
    setCreating(false);
    setSub("draft");
    setPage(1);
  };

  const keyword = query.trim();
  const filtered = items.filter((c) => {
    const inTab = c.bucket === sub;
    const mineMatch =
      sub !== "mine" ||
      ((mineState === "all" ||
        (mineState === "done" ? c.progress >= 100 : c.progress < 100)) &&
        (mineProgress === "all" ||
          (mineProgress === "low" && c.progress <= 25) ||
          (mineProgress === "mid" && c.progress > 25 && c.progress <= 60) ||
          (mineProgress === "high" && c.progress > 60)));
    const pubMatch = sub !== "published" || pubState === "all" || c.state === pubState;
    const draftMatch = sub !== "draft" || draftState === "all" || c.state === draftState;
    const byQuery = keyword === "" || c.title.includes(keyword);
    return inTab && mineMatch && pubMatch && draftMatch && byQuery;
  });

  const enrollRows = ENROLLMENTS.filter(
    (e) => (source === "all" || e.source === source) && (keyword === "" || e.course.includes(keyword))
  );

  const pageSize = 5;
  const listTotal = Math.max(1, Math.ceil(filtered.length / pageSize));
  const enrollTotal = Math.max(1, Math.ceil(enrollRows.length / pageSize));
  const totalPages = sub === "enroll" ? enrollTotal : listTotal;
  const safePage = Math.min(page, totalPages);
  const paged =
    sub === "enroll"
      ? enrollRows.slice((safePage - 1) * pageSize, safePage * pageSize)
      : filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <>
      {/* Secondary filter — sub tabs + publish action */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <nav
          className="flex min-w-0 items-center gap-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="课程分类"
        >
          {COURSE_SUB_TABS.map((t) => {
            const on = t.key === sub;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => switchSub(t.key)}
                aria-current={on ? "page" : undefined}
                className={`ui-text-meta relative h-9 shrink-0 transition-colors ${
                  on
                    ? "font-medium text-white"
                    : "text-[#747778] hover:text-white"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </nav>

        {sub === "published" ? (
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="ui-btn ui-btn-primary shrink-0"
          >
            <PlusIcon /> 发布课程
          </button>
        ) : null}
      </div>

      {/* Filter row */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {sub === "mine" ? (
            <>
              <FilterSelect
                value={mineState}
                onChange={(v) => {
                  setMineState(v);
                  setPage(1);
                }}
                options={MINE_COURSE_STATE_OPTIONS}
              />
              <FilterSelect
                value={mineProgress}
                onChange={(v) => {
                  setMineProgress(v);
                  setPage(1);
                }}
                options={PROGRESS_OPTIONS}
              />
            </>
          ) : null}
          {sub === "published" ? (
            <FilterSelect
              value={pubState}
              onChange={(v) => {
                setPubState(v);
                setPage(1);
              }}
              options={PUB_STATE_OPTIONS}
            />
          ) : null}
          {sub === "draft" ? (
            <FilterSelect
              value={draftState}
              onChange={(v) => {
                setDraftState(v);
                setPage(1);
              }}
              options={DRAFT_STATE_OPTIONS}
            />
          ) : null}
          {sub === "enroll" ? (
            <FilterSelect
              value={source}
              onChange={(v) => {
                setSource(v);
                setPage(1);
              }}
              options={SOURCE_OPTIONS}
            />
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <label className="relative block">
            <span className="sr-only">搜索标题</span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="搜索标题"
              className="ui-input w-[200px] pr-9 sm:w-[260px]"
            />
            <SearchIcon />
          </label>
          <button
            type="button"
            onClick={reset}
            aria-label="重置筛选"
            title="重置筛选"
            className="ui-btn w-9 border border-[#2a2a2a] px-0 text-[#9ea1a2] hover:border-white/15 hover:text-white"
          >
            <RefreshIcon spin={spin} />
          </button>
        </div>
      </div>

      {/* Enroll table */}
      {sub === "enroll" ? (
        paged.length === 0 ? (
          <p className="ui-text-body py-16 text-center text-[#747778]">
            没有符合条件的报名记录
          </p>
        ) : (
          <div className="overflow-hidden rounded-[10px] bg-[#161616]">
            <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)] gap-3 border-b border-white/[0.07] px-4 py-3">
              {["课程", "用户", "来源", "报名时间"].map((h) => (
                <span key={h} className="ui-text-label text-[#747778]">
                  {h}
                </span>
              ))}
            </div>
            {(paged as typeof ENROLLMENTS).map((e) => (
              <div
                key={e.id}
                className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)] gap-3 border-b border-white/[0.05] px-4 py-3.5 transition-colors last:border-b-0 hover:bg-[#1a1a1a]"
              >
                <span className="ui-text-meta truncate text-[#e5e2e1]">{e.course}</span>
                <span className="ui-text-meta truncate text-[#9ea1a2]">{e.user}</span>
                <span className="ui-text-meta truncate text-[#9ea1a2]">{e.source}</span>
                <span className="ui-text-meta truncate text-[#747778]">{e.time}</span>
              </div>
            ))}
          </div>
        )
      ) : paged.length === 0 ? (
        <p className="ui-text-body py-16 text-center text-[#747778]">没有符合条件的课程</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {(paged as ManagedCourse[]).map((c) => {
            const meta = COURSE_STATE_META[c.state];
            return (
              <article
                key={c.id}
                className="flex min-h-[94px] items-start gap-3 rounded-[10px] bg-[#161616] p-3 transition-colors hover:bg-[#1a1a1a] sm:min-h-[106px]"
              >
                <CourseThumb course={c} onOpen={() => setDetail(c)} />

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 self-stretch">
                  <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      {sub === "mine" ? (
                        <span
                          className={`ui-text-label shrink-0 rounded-[4px] px-1.5 py-0.5 leading-[14px] ${progressChip(c.progress)}`}
                        >
                          {c.progress}%
                        </span>
                      ) : (
                        <span
                          className={`ui-text-label shrink-0 rounded-[4px] px-1.5 py-0.5 leading-[14px] ${meta.cls}`}
                        >
                          {meta.label}
                        </span>
                      )}
                      <h3 className="ui-text-body m-0 truncate font-medium text-white">
                        {c.title}
                      </h3>
                      <span className="ui-text-meta shrink-0 font-['Space_Mono'] text-white">
                        {c.price}
                      </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      {sub === "mine" ? (
                        <Link
                          to={`/courses/learning/${c.baseId}`}
                          className="ui-btn ui-btn-primary min-w-[88px] px-3"
                        >
                          立即学习
                        </Link>
                      ) : null}
                      {sub === "published" && c.state === "online" ? (
                        <button
                          type="button"
                          onClick={() => takeOffline(c.id)}
                          className="ui-btn border border-white/[0.12] px-3 text-[#c4c7c8] hover:border-white/25 hover:text-white"
                        >
                          下线
                        </button>
                      ) : null}
                      {sub === "published" && c.state === "offline" ? (
                        <button
                          type="button"
                          onClick={() => remove(c.id)}
                          className="ui-btn border border-white/[0.12] px-3 text-[#c4c7c8] hover:border-white/25 hover:text-white"
                        >
                          删除
                        </button>
                      ) : null}
                      {sub === "draft" ? (
                        <>
                          <button
                            type="button"
                            onClick={() => remove(c.id)}
                            className="ui-btn border border-white/[0.12] px-3 text-[#c4c7c8] hover:border-white/25 hover:text-white"
                          >
                            删除
                          </button>
                          <button
                            type="button"
                            onClick={() => setCreating(true)}
                            className="ui-btn ui-btn-primary min-w-[64px] px-3"
                          >
                            编辑
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
                    <span className="ui-text-label truncate text-[#747778]">
                      {c.chaptersNum}章 · {c.tags.join(" · ")}
                    </span>
                    <span className="ui-text-label shrink-0 text-[#66696a]">
                      {sub === "mine"
                        ? `${c.learners}人正在学习`
                        : `${c.learners}人学习`}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <Pager page={safePage} total={totalPages} onChange={setPage} />

      {detail ? (
        <CourseDetailModal course={detail} onClose={() => setDetail(null)} />
      ) : null}
      {creating ? (
        <CreateCourseModal onClose={() => setCreating(false)} onSave={saveCourse} />
      ) : null}
    </>
  );
}

function CourseThumb({
  course,
  onOpen,
}: {
  course: ManagedCourse;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="uidea-media relative w-[112px] shrink-0 self-start overflow-hidden rounded-[10px] bg-[#0e0e0e] sm:w-[132px]"
      aria-label={`查看 ${course.title} 详情`}
    >
      <img src={course.cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <span className="absolute bottom-1 left-1 rounded-[4px] bg-black/65 px-1.5 py-0.5 text-[10px] leading-[12px] text-white/90 backdrop-blur-[2px]">
        {course.level}
      </span>
    </button>
  );
}

/* ---------------------------------------------------- course detail */

function CourseDetailModal({ course, onClose }: { course: ManagedCourse; onClose: () => void }) {
  const meta = COURSE_STATE_META[course.state];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="课程详情"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] w-full max-w-[600px] overflow-y-auto rounded-[10px] border border-[#1f1f1f] bg-[#131313] p-5"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="ui-text-meta text-[#9ea1a2]">作品详情</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="ui-btn border border-white/[0.12] px-3 text-[#c4c7c8] hover:border-white/25 hover:text-white"
            >
              公开展示
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="关闭"
              className="flex h-9 w-9 items-center justify-center rounded-[9px] text-[#9ea1a2] transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <XIcon />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <h2 className="ui-text-body m-0 font-medium text-white">{course.title}</h2>
          <span
            className={`ui-text-label shrink-0 rounded-[4px] px-1.5 py-0.5 leading-[14px] ${meta.cls}`}
          >
            {meta.label}
          </span>
        </div>

        <div className="ui-text-meta mt-2 flex flex-wrap items-center justify-between gap-2 text-[#747778]">
          <span className="inline-flex items-center gap-1.5">
            <SmileIcon />
            {course.learners + 647}人
          </span>
          <span className="ui-text-label">发布时间 {course.postedAt}</span>
        </div>

        <div className="mt-4">
          <div className="ui-text-label mb-2 text-[#6f7273]">课程介绍</div>
          <p className="ui-text-body m-0 text-[#c4c7c8]">
            企业项目简介根据项目资料，进行平面设计，项目内容不能外发，需要本地上门服务，可以按天或者按工作量结算。内容相对对瑞风风格，突出文字内容，需要某公司制作！
          </p>
          <p className="ui-text-meta mt-2 mb-0 text-[#747778]">地点：印度尼西亚运村</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 rounded-[8px] bg-[#161616] p-4 sm:grid-cols-4">
          <div>
            <div className="ui-text-label text-[#747778]">分类</div>
            <div className="mt-1 flex flex-wrap gap-1">
              {course.tags.map((t) => (
                <span
                  key={t}
                  className="ui-text-label rounded-[4px] bg-white/[0.06] px-1.5 py-0.5 text-[#9ea1a2]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="ui-text-label text-[#747778]">章节</div>
            <div className="ui-text-meta mt-1 text-white">{course.chaptersNum} 章</div>
          </div>
          <div>
            <div className="ui-text-label text-[#747778]">类别</div>
            <div className="ui-text-meta mt-1 text-white">{course.level}</div>
          </div>
          <div>
            <div className="ui-text-label text-[#747778]">价格</div>
            <div className="ui-text-meta mt-1 font-['Space_Mono'] text-white">
              {course.price}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="ui-text-label mb-2 text-[#6f7273]">封面</div>
          <div className="uidea-media max-w-[280px] overflow-hidden rounded-[8px] bg-[#0e0e0e]">
            <img src={course.cover} alt="课程封面" />
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <div className="ui-text-label text-[#6f7273]">章节列表</div>
            <span className="ui-text-label text-[#66696a]">共 {course.chaptersNum} 章</span>
          </div>
          <div className="overflow-hidden rounded-[8px] bg-[#161616]">
            <div className="uidea-media relative bg-[#0e0e0e]">
              <img
                src={course.cover}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/80 to-transparent p-3">
                <span className="ui-text-meta text-white">01 课程导论与整体安排</span>
                <span className="ui-text-label shrink-0 text-white/70">26:14</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------- create course */

function CreateCourseModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (state: "draft" | "review") => void;
}) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [tags, setTags] = useState<string[]>(["详情页", "UI"]);
  const [tagInput, setTagInput] = useState("");
  const [free, setFree] = useState(true);
  const [price, setPrice] = useState("");
  const [difficulty, setDifficulty] = useState("基础");
  const [intro, setIntro] = useState("");
  const [chapters, setChapters] = useState<string[]>([""]);

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="创建课程"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] w-full max-w-[640px] overflow-y-auto rounded-[10px] border border-[#1f1f1f] bg-[#131313] p-5"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="ui-text-meta text-[#9ea1a2]">创建课程</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="flex h-8 w-8 items-center justify-center rounded-[8px] text-[#9ea1a2] transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <XIcon />
          </button>
        </div>

        <div className="ui-text-label mb-2 text-[#6f7273]">封面</div>
        <UploadBox label="上传封面" className="h-[136px] w-[136px]" />

        <div className="ui-text-label mb-1 mt-4 text-[#6f7273]">课程标题</div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="填写课程标题"
          className={`${inputClass} mb-3`}
        />

        <div className="ui-text-label mb-1 text-[#6f7273]">课程副标题</div>
        <input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="填写课程副标题"
          className={inputClass}
        />

        <div className="ui-text-label mb-1 mt-4 text-[#6f7273]">分类</div>
        <div className="ui-input flex min-h-9 flex-wrap items-center gap-1.5 py-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="ui-text-label inline-flex items-center gap-1 rounded-[4px] bg-white/[0.08] px-1.5 py-0.5 text-[#e5e2e1]"
            >
              {t}
              <button
                type="button"
                aria-label={`删除标签 ${t}`}
                onClick={() => setTags((prev) => prev.filter((x) => x !== t))}
                className="text-[#9ea1a2] hover:text-white"
              >
                ×
              </button>
            </span>
          ))}
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            onBlur={addTag}
            placeholder={tags.length ? "" : "输入分类后回车"}
            className="min-w-[90px] flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-[#66696a]"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
          <div className="flex items-center gap-3">
            <span className="ui-text-label text-[#9ea1a2]">收费类型</span>
            <RadioGroup
              options={["免费", "付费"]}
              value={free ? "免费" : "付费"}
              onChange={(v) => setFree(v === "免费")}
            />
          </div>
          {!free ? (
            <label className="ui-text-meta inline-flex items-center gap-2 text-[#747778]">
              价格
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value.replace(/[^\d]/g, ""))}
                placeholder="1999"
                className="h-8 w-24 rounded-[8px] bg-[#2a2a2a] px-2.5 text-[12px] text-white outline-none placeholder:text-[#66696a]"
              />
            </label>
          ) : null}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="ui-text-label text-[#9ea1a2]">课程难度</span>
          <RadioGroup
            options={["基础", "进阶", "高阶"]}
            value={difficulty}
            onChange={setDifficulty}
          />
        </div>

        <div className="ui-text-label mb-1 mt-4 text-[#6f7273]">课程介绍</div>
        <textarea
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          rows={4}
          placeholder="填写…"
          className={`${inputClass} h-auto resize-none py-2.5`}
        />

        <div className="mt-5 mb-2 flex items-center justify-between">
          <span className="ui-text-label text-[#6f7273]">章节列表</span>
          <button
            type="button"
            onClick={() => setChapters((prev) => [...prev, ""])}
            className="ui-btn border border-white/[0.12] px-3 text-[#c4c7c8] hover:border-white/25 hover:text-white"
          >
            添加章节
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {chapters.map((ch, i) => (
            <div key={i} className="rounded-[8px] bg-[#161616] p-3">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="ui-text-label text-[#9ea1a2]">章节标题</span>
                {chapters.length > 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setChapters((prev) => prev.filter((_, idx) => idx !== i))
                    }
                    className="ui-text-label text-[#9ea1a2] hover:text-white"
                  >
                    删除
                  </button>
                ) : null}
              </div>
              <input
                value={ch}
                onChange={(e) =>
                  setChapters((prev) =>
                    prev.map((x, idx) => (idx === i ? e.target.value : x))
                  )
                }
                placeholder="填写章节标题"
                className={`${inputClass} mb-3`}
              />
              <div className="ui-text-label mb-1.5 text-[#9ea1a2]">上传视频</div>
              <UploadBox label="上传视频" className="h-[84px] w-[132px]" />
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-end gap-2 border-t border-white/[0.07] pt-4">
          <button
            type="button"
            onClick={() => onSave("draft")}
            className="ui-btn bg-[#1c1b1b] text-[#c4c7c8] hover:bg-[#222]"
          >
            保存草稿
          </button>
          <button
            type="button"
            onClick={() => onSave("review")}
            className="ui-btn ui-btn-primary"
          >
            提交审核
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ shared */

function UploadBox({ label, className }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      className={`flex flex-col items-center justify-center gap-1.5 rounded-[8px] border border-dashed border-[#2f2f2f] bg-[#161616] text-[#9ea1a2] transition-colors hover:border-white/20 hover:text-white ${className ?? ""}`}
    >
      <PlusIcon />
      <span className="ui-text-label">{label}</span>
    </button>
  );
}

function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      {options.map((o) => {
        const on = o === value;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className="ui-text-meta inline-flex items-center gap-1.5 text-[#c4c7c8] transition-colors hover:text-white"
          >
            <span
              className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border transition-colors ${
                on ? "border-white" : "border-[#555555]"
              }`}
            >
              {on ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
            </span>
            {o}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------- task list */

type TaskState = "recruiting" | "applied" | "unselected" | "ongoing";
type TaskSubTab = "mine" | "ongoing" | "more";

type ManagedTask = {
  id: string;
  title: string;
  price: string;
  applicants: number;
  due: string;
  category: string;
  tags: readonly string[];
  company: string;
  companyInitials: string;
  summary: string;
  state: TaskState;
  bucket: TaskSubTab;
  daysLeft: number;
  postedDaysAgo: number;
};

const TASK_SEED: { bucket: TaskSubTab; state: TaskState }[] = [
  ...Array.from({ length: 10 }, (_, i): { bucket: TaskSubTab; state: TaskState } => {
    const states: TaskState[] = [
      "applied",
      "unselected",
      "ongoing",
      "applied",
      "unselected",
    ];
    return { bucket: "mine", state: states[i % states.length] };
  }),
  ...Array.from({ length: 6 }, () => ({ bucket: "ongoing" as const, state: "ongoing" as const })),
  ...Array.from(
    { length: 17 },
    () => ({ bucket: "more" as const, state: "recruiting" as const })
  ),
];

const managedTasks: ManagedTask[] = [...tasks, ...tasks, ...tasks, ...tasks, ...tasks]
  .slice(0, TASK_SEED.length)
  .map((t, i) => {
    const seed = TASK_SEED[i] ?? TASK_SEED[0];
    return {
      id: `${t.id}-${i}`,
      title: t.title,
      price: t.price,
      applicants: t.applicants,
      due: t.due,
      category: t.category,
      tags: t.tags,
      company: t.company,
      companyInitials: t.companyInitials,
      summary: t.summary,
      state: seed.state,
      bucket: seed.bucket,
      daysLeft: 3 + ((i * 7) % 40),
      postedDaysAgo: 1 + ((i * 5) % 25),
    };
  });

const TASK_SUB_TABS: { key: TaskSubTab; label: string }[] = [
  { key: "mine", label: "我的任务" },
  { key: "ongoing", label: "进行中任务" },
  { key: "more", label: "更多任务" },
];

const TASK_STATE_META: Record<TaskState, { label: string; cls: string }> = {
  recruiting: { label: "招募中", cls: "bg-[#18c98a]/[0.16] text-[#18c98a]" },
  applied: { label: "已报名", cls: "bg-white text-[#121212]" },
  unselected: { label: "未选中", cls: "bg-white/[0.07] text-[#9ea1a2]" },
  ongoing: { label: "进行中", cls: "bg-[#18c98a]/[0.16] text-[#18c98a]" },
};

const MINE_STATE_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "不限状态" },
  { value: "applied", label: "已报名" },
  { value: "ongoing", label: "进行中" },
  { value: "unselected", label: "未选中" },
];

const TIME_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "不限时间" },
  { value: "week", label: "一周内截止" },
  { value: "month", label: "一月内截止" },
];

const KIND_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "不限种类" },
  { value: "AIGC", label: "AIGC" },
  { value: "平面设计", label: "平面设计" },
  { value: "影视编导", label: "影视编导" },
  { value: "创意视觉", label: "创意视觉" },
  { value: "3D建模", label: "3D建模" },
  { value: "LOGO设计", label: "LOGO设计" },
];

const BUDGET_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "预算区间" },
  { value: "lt1w", label: "1 万以下" },
  { value: "1w3w", label: "1 万 - 3 万" },
  { value: "gt3w", label: "3 万以上" },
];

function parsePrice(price: string) {
  const n = Number(price.replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function inTimeRange(days: number, value: string) {
  if (value === "week") return days <= 7;
  if (value === "month") return days <= 30;
  return true;
}

const DELIVERIES = [
  {
    round: "第 1 次提交",
    result: "通过" as const,
    note: "以设计初稿定出桌面第一版，附 Word 说明文档",
    file: "video0@vip.qq.com.zip",
  },
  {
    round: "第 2 次提交",
    result: "通过" as const,
    note: "根据反馈调整主视觉配色与版式节奏",
    file: "video0@vip.qq.com.zip",
  },
  {
    round: "第 3 次提交",
    result: "未通过" as const,
    note: "物料字号未按规范放大，需要重新排版",
    file: "video0@vip.qq.com.zip",
  },
  {
    round: "第 4 次提交",
    result: "通过" as const,
    note: "终稿打包，含源文件与导出规范",
    file: "video0@vip.qq.com.zip",
  },
];

function TaskPanel() {
  const [sub, setSub] = useState<TaskSubTab>(() => {
    const s = new URLSearchParams(window.location.search).get("sub");
    return s === "ongoing" || s === "more" ? s : "mine";
  });
  const [items, setItems] = useState<ManagedTask[]>(managedTasks);
  const [mineState, setMineState] = useState("all");
  const [timeRange, setTimeRange] = useState("all");
  const [kind, setKind] = useState("all");
  const [budget, setBudget] = useState("all");
  const [posted, setPosted] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<ManagedTask | null>(null);
  const [spin, setSpin] = useState(0);

  // Deep link: /profile?tab=task&sub=more&detail=1 opens the first task's modal
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("detail") !== "1") return;
    const first = items.find((t) => t.bucket === sub);
    if (first) setDetail(first);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchSub = (key: TaskSubTab) => {
    setSub(key);
    setPage(1);
  };

  const reset = () => {
    setMineState("all");
    setTimeRange("all");
    setKind("all");
    setBudget("all");
    setPosted("all");
    setQuery("");
    setPage(1);
    setSpin((n) => n + 1);
  };

  const withdraw = (id: string) => {
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, state: "unselected" as const } : t))
    );
  };

  const keyword = query.trim();
  const filtered = items.filter((t) => {
    const inTab =
      sub === "mine"
        ? t.bucket === "mine" && t.state !== "recruiting"
        : sub === "ongoing"
          ? t.bucket === "ongoing" && t.state === "ongoing"
          : t.bucket === "more" && t.state === "recruiting";
    const byState = sub !== "mine" || mineState === "all" || t.state === mineState;
    const byTime = sub !== "ongoing" || inTimeRange(t.daysLeft, timeRange);
    const byKind = sub !== "more" || kind === "all" || t.category === kind;
    const price = parsePrice(t.price);
    const byBudget =
      sub !== "more" ||
      budget === "all" ||
      (budget === "lt1w" && price < 10000) ||
      (budget === "1w3w" && price >= 10000 && price <= 30000) ||
      (budget === "gt3w" && price > 30000);
    const byPosted = sub !== "more" || inTimeRange(t.postedDaysAgo, posted);
    const byQuery = keyword === "" || t.title.includes(keyword);
    return inTab && byState && byTime && byKind && byBudget && byPosted && byQuery;
  });

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <>
      {/* Secondary filter — sub tabs + (no primary action on tasks) */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <nav
          className="flex min-w-0 items-center gap-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="任务分类"
        >
          {TASK_SUB_TABS.map((t) => {
            const on = t.key === sub;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => switchSub(t.key)}
                aria-current={on ? "page" : undefined}
                className={`ui-text-meta relative h-9 shrink-0 transition-colors ${
                  on
                    ? "font-medium text-white"
                    : "text-[#747778] hover:text-white"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Filter row — selects per sub tab + title search + reset */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {sub === "mine" ? (
            <FilterSelect
              value={mineState}
              onChange={(v) => {
                setMineState(v);
                setPage(1);
              }}
              options={MINE_STATE_OPTIONS}
            />
          ) : null}
          {sub === "ongoing" ? (
            <FilterSelect
              value={timeRange}
              onChange={(v) => {
                setTimeRange(v);
                setPage(1);
              }}
              options={TIME_OPTIONS}
            />
          ) : null}
          {sub === "more" ? (
            <>
              <FilterSelect
                value={kind}
                onChange={(v) => {
                  setKind(v);
                  setPage(1);
                }}
                options={KIND_OPTIONS}
              />
              <FilterSelect
                value={budget}
                onChange={(v) => {
                  setBudget(v);
                  setPage(1);
                }}
                options={BUDGET_OPTIONS}
              />
              <FilterSelect
                value={posted}
                onChange={(v) => {
                  setPosted(v);
                  setPage(1);
                }}
                options={TIME_OPTIONS}
              />
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <label className="relative block">
            <span className="sr-only">搜索标题</span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="搜索标题"
              className="ui-input w-[200px] pr-9 sm:w-[260px]"
            />
            <SearchIcon />
          </label>
          <button
            type="button"
            onClick={reset}
            aria-label="重置筛选"
            title="重置筛选"
            className="ui-btn w-9 border border-[#2a2a2a] px-0 text-[#9ea1a2] hover:border-white/15 hover:text-white"
          >
            <RefreshIcon spin={spin} />
          </button>
        </div>
      </div>

      {/* List */}
      {paged.length === 0 ? (
        <p className="ui-text-body py-16 text-center text-[#747778]">没有符合条件的任务</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {paged.map((t) => {
            const meta = TASK_STATE_META[t.state];
            return (
              <article
                key={t.id}
                className="flex min-h-[94px] flex-col justify-between gap-3 rounded-[10px] bg-[#161616] p-3 transition-colors hover:bg-[#1a1a1a] sm:min-h-[106px]"
              >
                <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <span
                      className={`ui-text-label shrink-0 rounded-[4px] px-1.5 py-0.5 leading-[14px] ${meta.cls}`}
                    >
                      {meta.label}
                    </span>
                    <h3 className="ui-text-body m-0 truncate font-medium text-white">
                      {t.title}
                    </h3>
                    <span className="ui-text-meta shrink-0 font-['Space_Mono'] text-white">
                      {t.price}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {t.state === "applied" ? (
                      <button
                        type="button"
                        onClick={() => withdraw(t.id)}
                        className="ui-btn border border-white/[0.12] px-3 text-[#c4c7c8] hover:border-white/25 hover:text-white"
                      >
                        撤销报名
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setDetail(t)}
                      className="ui-btn ui-btn-primary min-w-[88px] px-3"
                    >
                      查看详情
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
                  <span className="ui-text-meta inline-flex items-center gap-1.5 text-[#747778]">
                    <SmileIcon />
                    {t.applicants}人已报名
                  </span>
                  <span className="ui-text-label text-[#66696a]">截止时间 {t.due}</span>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pager */}
      <Pager page={safePage} total={totalPages} onChange={setPage} />

      {detail ? <TaskDetailModal task={detail} onClose={() => setDetail(null)} /> : null}
    </>
  );
}

/* ------------------------------------------------------- task detail */

function TaskDetailModal({ task, onClose }: { task: ManagedTask; onClose: () => void }) {
  const meta = TASK_STATE_META[task.state];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="任务详情"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] w-full max-w-[600px] overflow-y-auto rounded-[10px] border border-[#1f1f1f] bg-[#131313] p-5"
      >
        {/* Modal header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="ui-text-meta text-[#9ea1a2]">任务详情</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="flex h-8 w-8 items-center justify-center rounded-[8px] text-[#9ea1a2] transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <XIcon />
          </button>
        </div>

        {/* Task head */}
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="ui-text-body m-0 font-medium text-white">{task.title}</h2>
          <span
            className={`ui-text-label shrink-0 rounded-[4px] px-1.5 py-0.5 leading-[14px] ${meta.cls}`}
          >
            {meta.label}
          </span>
        </div>
        <div className="ui-text-meta mt-2 inline-flex items-center gap-1.5 text-[#747778]">
          <SmileIcon />
          {task.applicants}人已报名
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="ui-text-label rounded-[4px] bg-white/[0.06] px-1.5 py-0.5 text-[#9ea1a2]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Key numbers */}
        <div className="mt-4 grid grid-cols-3 gap-3 rounded-[8px] bg-[#161616] p-4">
          <div>
            <div className="ui-text-label text-[#747778]">奖励</div>
            <div className="ui-text-meta mt-1 font-['Space_Mono'] text-white">
              {task.price}
            </div>
          </div>
          <div>
            <div className="ui-text-label text-[#747778]">截止日期</div>
            <div className="ui-text-meta mt-1 text-white">{task.due}</div>
          </div>
          <div>
            <div className="ui-text-label text-[#747778]">任务周期</div>
            <div className="ui-text-meta mt-1 text-white">{task.daysLeft} 天</div>
          </div>
        </div>

        {/* Copy blocks */}
        <div className="mt-5">
          <div className="ui-text-label mb-2 text-[#6f7273]">任务介绍</div>
          <p className="ui-text-body m-0 text-[#c4c7c8]">{task.summary}</p>
        </div>
        <div className="mt-4">
          <div className="ui-text-label mb-2 text-[#6f7273]">交付要求</div>
          <p className="ui-text-body m-0 text-[#c4c7c8]">
            企业项目简介根据项目资料，进行平面设计。项目内容不能外发，需要本地上门服务，可以按照上门服务收费。交付需包含源文件、导出物料与一页说明文档，格式统一按品牌规范打包。
          </p>
        </div>

        {/* Review reference */}
        <div className="mt-5">
          <div className="ui-text-label mb-2 text-[#6f7273]">评审参照图</div>
          <div className="uidea-media max-w-[280px] overflow-hidden rounded-[8px] bg-[#0e0e0e]">
            <img src={works[0]?.cover ?? COVER} alt="评审参照图" />
          </div>
        </div>

        {/* Deliveries */}
        <div className="mt-6">
          <div className="ui-text-label mb-2 text-[#6f7273]">任务交付</div>

          <div className="mb-3 flex items-center gap-3 rounded-[8px] bg-[#161616] p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a] font-['Space_Grotesk'] text-[13px] text-white">
              {task.companyInitials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="ui-text-meta truncate text-white">{task.company}</div>
              <div className="ui-text-label mt-0.5 truncate text-[#747778]">
                {task.tags.slice(0, 4).join(" · ")}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {DELIVERIES.map((d) => (
              <div key={d.round} className="rounded-[8px] bg-[#161616] p-3">
                <div className="flex items-center gap-2">
                  <span className="ui-text-meta text-white">{d.round}</span>
                  <span
                    className={`ui-text-label rounded-[4px] px-1.5 py-0.5 leading-[14px] ${
                      d.result === "通过"
                        ? "bg-[#18c98a]/[0.16] text-[#18c98a]"
                        : "bg-white/[0.07] text-[#9ea1a2]"
                    }`}
                  >
                    {d.result}
                  </span>
                </div>
                <p className="ui-text-meta mt-1 mb-0 text-[#747778]">{d.note}</p>
                <div className="mt-2 flex items-center justify-between gap-2 rounded-[8px] bg-[#1c1b1b] px-2.5 py-2">
                  <span className="ui-text-label inline-flex min-w-0 items-center gap-1.5 text-[#9ea1a2]">
                    <FileIcon />
                    <span className="truncate">{d.file}</span>
                  </span>
                  <span className="ui-text-label shrink-0 text-[#66696a]">↑</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer action */}
        <div className="mt-5 flex justify-end border-t border-white/[0.07] pt-4">
          <button type="button" onClick={onClose} className="ui-btn ui-btn-primary">
            提交作品
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------- filter select / pager */

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const current = options.find((o) => o.value === value) ?? options[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="ui-btn min-w-[132px] justify-between border border-[#2a2a2a] bg-[#161616] text-[#c4c7c8] hover:border-white/15 hover:text-white"
      >
        {current?.label ?? ""}
        <ChevronDownIcon open={open} />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label={current?.label}
          className="absolute left-0 top-full z-20 mt-1 w-[160px] rounded-[9px] border border-[#2a2a2a] bg-[#201f1f] p-1 shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
        >
          {options.map((o) => {
            const on = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                role="option"
                aria-selected={on}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`ui-text-meta flex h-8 w-full items-center justify-between rounded-[6px] px-2 text-left transition-colors hover:bg-white/[0.06] ${
                  on ? "text-white" : "text-[#9ea1a2]"
                }`}
              >
                {o.label}
                {on ? <CheckIcon /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 8) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "…", total];
  }
  if (current >= total - 3) {
    return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "…", current - 1, current, current + 1, "…", total];
}

function Pager({
  page,
  total,
  onChange,
}: {
  page: number;
  total: number;
  onChange: (p: number) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);

  const commit = () => {
    if (draft !== null) {
      const n = Number(draft);
      onChange(Number.isFinite(n) && n >= 1 ? Math.min(n, total) : 1);
    }
    setDraft(null);
  };

  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
      <button
        type="button"
        aria-label="上一页"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="flex h-8 w-8 items-center justify-center rounded-[8px] text-[#9ea1a2] transition-colors hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeftIcon />
      </button>

      {buildPageList(page, total).map((p, i) =>
        p === "…" ? (
          <span key={`dots-${i}`} className="ui-text-meta px-1 text-[#66696a]">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`h-8 min-w-8 rounded-[8px] px-1.5 text-[12px] transition-colors ${
              p === page
                ? "bg-white font-medium text-[#121212]"
                : "text-[#9ea1a2] hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        aria-label="下一页"
        disabled={page >= total}
        onClick={() => onChange(page + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-[8px] text-[#9ea1a2] transition-colors hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRightIcon />
      </button>

      <span className="ui-text-meta ml-2 text-[#747778]">跳至</span>
      <input
        value={draft ?? String(page)}
        onChange={(e) => setDraft(e.target.value.replace(/\D/g, ""))}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        }}
        inputMode="numeric"
        aria-label="跳至页码"
        className="h-8 w-10 rounded-[8px] border border-transparent bg-[#2a2a2a] text-center text-[12px] text-white outline-none hover:border-white/10 focus:border-white/10"
      />
      <span className="ui-text-meta text-[#747778]">页</span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <h2 className="ui-text-label m-0 shrink-0 text-[#6f7273]">{children}</h2>
      <span className="h-px min-w-0 flex-1 bg-white/[0.08]" aria-hidden />
    </div>
  );
}

/* ---------------------------------------------------------------- edit */

function EditPanel({
  draft,
  setDraft,
  set,
}: {
  draft: Profile;
  setDraft: React.Dispatch<React.SetStateAction<Profile>>;
  set: (
    key: "name" | "title" | "city" | "bio" | "site" | "social"
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[200px_minmax(0,560px)]">
      <div className="flex flex-col gap-3">
        <div className="uidea-media overflow-hidden rounded-[10px] bg-[#1c1b1b]">
          <img src={COVER} alt="" className="h-full w-full object-cover" />
        </div>
        <button
          type="button"
          className="ui-chip justify-center bg-[#1c1b1b] text-[#c4c7c8] hover:bg-[#222]"
        >
          更换头像
        </button>
        <p className="ui-text-label m-0 text-[#66696a]">
          建议 1:1 正方形，不小于 400×400
        </p>
      </div>

      <div>
        <div className="ui-text-label mb-3 text-[#6f7273]">基础资料</div>
        <Field label="昵称">
          <input value={draft.name} onChange={set("name")} className={inputClass} />
        </Field>
        <Field label="职业标签">
          <input value={draft.title} onChange={set("title")} className={inputClass} />
        </Field>
        <Field label="所在地">
          <input value={draft.city} onChange={set("city")} className={inputClass} />
        </Field>
        <Field label="个人简介">
          <textarea
            value={draft.bio}
            onChange={set("bio")}
            rows={4}
            className={`${inputClass} h-auto resize-none py-2.5`}
          />
        </Field>
        <Field label="个人网站">
          <input value={draft.site} onChange={set("site")} className={inputClass} />
        </Field>
        <Field label="社交账号">
          <input value={draft.social} onChange={set("social")} className={inputClass} />
        </Field>

        <div className="mb-4 flex flex-col gap-1">
          <span className="ui-text-label leading-4 text-[#9ea1a2]">接单状态</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDraft((d) => ({ ...d, available: true }))}
              className={`ui-chip ${
                draft.available ? "is-active" : "bg-[#1c1b1b] text-[#c4c7c8] hover:bg-[#222]"
              }`}
            >
              可接单
            </button>
            <button
              type="button"
              onClick={() => setDraft((d) => ({ ...d, available: false }))}
              className={`ui-chip ${
                draft.available ? "bg-[#1c1b1b] text-[#c4c7c8] hover:bg-[#222]" : "is-active"
              }`}
            >
              档期已满
            </button>
          </div>
        </div>

        <p className="ui-text-label m-0 text-[#66696a]">
          修改只作用于本地原型状态，刷新后恢复初始值。
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- pieces */

function DetailRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/[0.05] py-2 last:border-b-0">
      <dt className="ui-text-label m-0 text-[#747778]">{label}</dt>
      <dd
        className={`ui-text-meta m-0 truncate ${accent ? "text-[#18c98a]" : "text-[#e5e2e1]"}`}
      >
        {value}
      </dd>
    </div>
  );
}

function PinIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 21s6.4-6.1 6.4-11A6.4 6.4 0 005.6 10c0 4.9 6.4 11 6.4 11z" />
      <circle cx="12" cy="9.8" r="2.3" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 16L16 8" />
      <path d="M9.2 8H16v6.8" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M12 5.5v13M5.5 12h13" />
    </svg>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-150 ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9.5l6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#747778]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="5.6" />
      <path d="M15.2 15.2L19 19" />
    </svg>
  );
}

function RefreshIcon({ spin }: { spin: number }) {
  return (
    <svg
      key={spin}
      className="h-4 w-4 shrink-0"
      style={spin > 0 ? { animation: "uidea-reset-spin 420ms ease" } : undefined}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M19 12a7 7 0 11-2.4-5.3" />
      <path d="M19.4 4.6v4.2h-4.2" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 19.5s-7-4.3-7-9a3.9 3.9 0 017-2.4A3.9 3.9 0 0119 10.5c0 4.7-7 9-7 9z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2.6 12S6 6.6 12 6.6 21.4 12 21.4 12 18 17.4 12 17.4 2.6 12 2.6 12z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

function SmileIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="8.4" />
      <path d="M8.6 14.2c.8 1.1 2 1.8 3.4 1.8s2.6-.7 3.4-1.8" />
      <path d="M9.2 9.6h.01M14.8 9.6h.01" strokeWidth={2} />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14.5 6L8.5 12l6 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9.5 6l6 6-6 6" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M13.5 3.5H7a1.5 1.5 0 00-1.5 1.5v14A1.5 1.5 0 007 20.5h10a1.5 1.5 0 001.5-1.5V8.5l-5-5z" />
      <path d="M13.5 3.5v5h5" />
    </svg>
  );
}
