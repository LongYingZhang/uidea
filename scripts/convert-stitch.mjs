/**
 * Convert stitch-export HTML screens into React page modules.
 * Uses dangerouslySetInnerHTML so imperfect Stitch markup still mounts.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const exportDir = path.join(root, "stitch-export");
const outDir = path.join(root, "src", "stitch");

const SCREEN_MAP = {
  "01": { file: "TaskDetailScreen.tsx", title: "任务详情" },
  "02": { file: "WorkDetailScreen.tsx", title: "作品详情" },
  "03": { file: "PlazaScreen.tsx", title: "作品广场" },
  "04": { file: "TaskListScreen.tsx", title: "任务列表" },
  "05": { file: "CourseDetailScreen.tsx", title: "课程详情" },
  "06": { file: "DesignerListScreen.tsx", title: "设计师列表" },
  "07": { file: "CourseListScreen.tsx", title: "课程列表" },
  "08": { file: "DesignerHomeScreen.tsx", title: "设计师主页" },
  "09": { file: "CompetitionTopicScreen.tsx", title: "大赛专题" },
  "10": { file: "CompetitionRankScreen.tsx", title: "大赛榜单" },
  "11": { file: "CompetitionListScreen.tsx", title: "大赛列表" },
  "12": { file: "VisionScreen.tsx", title: "愿景" },
  "13": { file: "EnterpriseRegisterScreen.tsx", title: "企业注册" },
  "14": { file: "ProfileScreen.tsx", title: "个人信息" },
  "15": { file: "AccountScreen.tsx", title: "账号管理" },
  "16": { file: "ConsoleWorksScreen.tsx", title: "作品管理" },
  "17": { file: "ConsoleWorksAltScreen.tsx", title: "作品库" },
  "18": { file: "ConsoleCoursesScreen.tsx", title: "课程管理" },
  "19": { file: "ConsoleTasksScreen.tsx", title: "任务管理" },
  "20": { file: "ConsoleNotificationsScreen.tsx", title: "通知" },
  "21": { file: "ConsoleMessagesScreen.tsx", title: "沟通" },
  "22": { file: "LoginScreen.tsx", title: "登录" },
  "23": { file: "RegisterScreen.tsx", title: "注册" },
  "24": { file: "LegalScreen.tsx", title: "法律条款" },
  "25": { file: "ProductScreen.tsx", title: "产品" },
};

function extractMain(html) {
  const m = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (!m) throw new Error("no main");
  return m[1];
}

function cleanHtml(html) {
  let s = html;
  s = s.replace(/<script\b[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<style\b[\s\S]*?<\/style>/gi, "");
  s = s.replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*')/gi, "");
  return s.trim();
}

function toTemplateLiteral(html) {
  return html.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function wrapComponent(name, title, html) {
  const body = toTemplateLiteral(html);
  return `/* Auto-generated from stitch-export — ${title} */
const html = \`${body}\`;

export function ${name}() {
  return (
    <div
      className="stitch-screen"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
`;
}

fs.mkdirSync(outDir, { recursive: true });
const indexExports = [];

for (const [id, meta] of Object.entries(SCREEN_MAP)) {
  const htmlPath = path.join(exportDir, `${id}-screen.html`);
  const html = fs.readFileSync(htmlPath, "utf8");
  const cleaned = cleanHtml(extractMain(html));
  const compName = meta.file.replace(/\.tsx$/, "");
  const code = wrapComponent(compName, meta.title, cleaned);
  fs.writeFileSync(path.join(outDir, meta.file), code);
  indexExports.push(`export { ${compName} } from "./${compName}";`);
  console.log("wrote", meta.file, cleaned.length);
}

fs.writeFileSync(path.join(outDir, "index.ts"), indexExports.join("\n") + "\n");
console.log("done", Object.keys(SCREEN_MAP).length);
