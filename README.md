# Uidea Prototype（左侧可收起菜单版）

从 Cursor 快照中恢复并补全的 Vite + React 原型。原工程目录
`~/cursor-bridge-workspace/uidea-prototype/` 已被删除，本目录是其可运行重建版。

## 运行

```bash
npm install
npm run dev      # http://127.0.0.1:5273
npm run build
npm run typecheck
```

## 技术栈

- Vite 5 + React 18 + TypeScript
- React Router 6（`BrowserRouter`，路由表见 `src/App.tsx`）
- Tailwind CSS v4（`@tailwindcss/vite`，设计令牌在 `src/styles/global.css` 的 `@theme`）

## 左侧导航

`src/components/layout/` 下四个文件构成核心，均为**原始恢复代码**：

| 文件 | 作用 |
| --- | --- |
| `SiteSidebar.tsx` | 固定左栏，展开 200px / 收起 64px；收起时只裁切容器，图标不重排；Logo hover 变收起按钮 |
| `useSidebarState.ts` | 展开状态存 `localStorage["uidea.sidebar.expanded"]` |
| `SimpleSiteLayout.tsx` | 首页/任务/设计师/课程使用，内容区 `padding-left` 跟随动画 |
| `PublicLayout.tsx` | 详情页使用，结构同上，页脚不同 |

`SiteHeader.tsx` 也是原始恢复代码，已被新侧栏方案取代（导航移入侧栏），仅
`ConsoleLayout` 仍使用它作为顶栏。

## 原始恢复 vs 重建

**原始恢复（来自 Cursor checkpoint / History，共 27 个非空文件）**

```
src/App.tsx
src/components/StitchHost.tsx
src/components/layout/{SiteSidebar,useSidebarState,SimpleSiteLayout,PublicLayout,AuthLayout,SiteHeader}.tsx
src/components/layout/ConsoleLayout.tsx
src/components/ui/{AdminUi,BrandLogo,CoverBlock,FilterChips}.tsx
src/components/ui/{ChipFilter,SegmentedControl}.css
src/pages/{PlazaPage,TasksPage,DesignersPage,CoursesPage}.tsx
src/pages/public/PlazaPage.tsx
src/pages/auth/LoginPage.tsx        （依赖 stitch/LoginScreen，已改写为独立实现）
src/styles/global.css
index.html
```

**本次重建（原文件未进入快照）**

- `src/pages/console/`：Profile、Account、Works、Courses、Tasks、Notifications、Messages（7 个）
- `src/pages/public/`：WorkDetail、TaskDetail、DesignerHome、CourseDetail、CourseLearn、
  CompetitionList、CompetitionTopic、CompetitionRank、Vision、Product、Legal（11 个）
- `src/pages/auth/`：Register、EnterpriseRegister（2 个）
- `src/data/mock.ts`：作品 / 设计师 / 课程 / 大赛示例数据
- 工程配置：`package.json`、`vite.config.ts`、`tsconfig.json`、`src/main.tsx`

**对原始代码做的最小修正**

1. `ConsoleLayout` 曾向 `SiteHeader` 传 `showSearch`，而恢复出的 `SiteHeader` 已删掉该 prop → 移除传参
2. `FilterChips` 增加可选 `className`（`TasksPage`/`DesignersPage`/`CoursesPage` 都在传）
3. `LoginPage` 不再依赖缺失的 `stitch/LoginScreen`，改为独立表单

## 已知缺失

- `src/lib/stitchNav.ts` 原文件为 0 字节，内容不可恢复（当前无引用）
- 品牌图 `public/uidea-logo.png` 借用自 `Documents/UIDEA/public/logo.png`
- `public/covers/work-sample.png` 为生成的占位图
- 所有数据为示例，不连后端；登录仅写入 `localStorage`
