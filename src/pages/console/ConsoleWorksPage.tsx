import { useMemo, useState } from "react";
import {
  Chip,
  ChipRow,
  EmptyHint,
  ItemCard,
  ItemGrid,
  PageHeader,
  PageShell,
  PrimaryButton,
  SearchField,
} from "../../components/ui/AdminUi";
import { works, workCategories } from "../../data/mock";

const PUBLISHED = works.slice(0, 7);
const DRAFTS = works.slice(7, 9);

export function ConsoleWorksPage() {
  const [tab, setTab] = useState<"published" | "draft">("published");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const base = tab === "published" ? PUBLISHED : DRAFTS;
    const q = query.trim().toLowerCase();
    return q ? base.filter((w) => w.title.toLowerCase().includes(q)) : base;
  }, [tab, query]);

  return (
    <PageShell>
      <PageHeader
        title="作品管理"
        meta={`${PUBLISHED.length} 件已发布 · ${DRAFTS.length} 件草稿`}
        action={<PrimaryButton to="/">上传作品</PrimaryButton>}
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ChipRow>
          <Chip active={tab === "published"} onClick={() => setTab("published")}>
            已发布
          </Chip>
          <Chip active={tab === "draft"} onClick={() => setTab("draft")}>
            草稿箱
          </Chip>
        </ChipRow>
        <div className="mb-8 w-full sm:w-64">
          <SearchField value={query} onChange={setQuery} placeholder="搜索作品标题" />
        </div>
      </div>

      {list.length === 0 ? (
        <EmptyHint>{tab === "draft" ? "草稿箱是空的" : "没有匹配的作品"}</EmptyHint>
      ) : (
        <ItemGrid>
          {list.map((w) => (
            <ItemCard
              key={w.id}
              to={`/works/${w.id}`}
              swatch={w.cover}
              title={w.title}
              sub={`${w.category} · ${w.likes} 赞`}
            />
          ))}
        </ItemGrid>
      )}

      <div className="ui-text-meta mt-8 text-[#5f6364]">
        分类参考：{workCategories.slice(1, 6).join(" / ")} 等
      </div>
    </PageShell>
  );
}
