export const workCategories = [
  "全部",
  "AIGC",
  "UI设计",
  "影视编导",
  "LOGO设计",
  "创意视觉",
  "网页设计",
  "品牌全案",
  "后期剪辑",
  "3D建模",
  "平面设计",
  "海报设计",
  "室内设计",
] as const;

export type WorkCategory = (typeof workCategories)[number];

export type Work = {
  id: string;
  title: string;
  author: string;
  category: WorkCategory;
  tags: readonly string[];
  cover: string;
  likes: number;
  views: number;
  desc: string;
};

const COVER = "/covers/cover-art.png";

const SWATCHES = [
  "linear-gradient(135deg,#3b1f0b,#ff5f00)",
  "linear-gradient(135deg,#0b1f3b,#2f7fff)",
  "linear-gradient(135deg,#1b0b2f,#9b5cff)",
  "linear-gradient(135deg,#0b2f22,#18c98a)",
  "linear-gradient(135deg,#2f0b12,#ff4d6d)",
] as const;

export const works: Work[] = [
  {
    id: "2069037478058270721",
    title: "她不是第一次来到这里",
    author: "@cwy",
    category: "创意视觉",
    tags: ["短片", "叙事"],
    cover: COVER,
    likes: 1280,
    views: 20431,
    desc: "一次关于归乡与记忆的影像实验，用低饱和的颗粒质感还原旧磁带里的夏天。",
  },
  {
    id: "2069106112990420994",
    title: "点一点，换一换",
    author: "@卜道满",
    category: "AIGC",
    tags: ["AIGC", "动画"],
    cover: COVER,
    likes: 964,
    views: 15220,
    desc: "把随机性做成可点击的玩具，每一次交互都会生成一个全新的角色。",
  },
  {
    id: "2069108307928424450",
    title: "粽于来了",
    author: "@卜道满",
    category: "海报设计",
    tags: ["节日", "插画"],
    cover: COVER,
    likes: 812,
    views: 11876,
    desc: "端午节点的一组系列插画，用糯米的颗粒感做视觉母题。",
  },
  {
    id: "2069113143377928193",
    title: "没发出去 | 治愈系小动画",
    author: "@卜道满",
    category: "影视编导",
    tags: ["动画", "治愈"],
    cover: COVER,
    likes: 1543,
    views: 30112,
    desc: "一条没发出去的消息，被画成了一分钟的循环动画。",
  },
  {
    id: "2069290347483242497",
    title: "恐龙馆奇妙夜",
    author: "@利涉大川",
    category: "3D建模",
    tags: ["3D", "场景"],
    cover: COVER,
    likes: 706,
    views: 9841,
    desc: "为自然博物馆做的夜场概念，灯光是唯一的主角。",
  },
  {
    id: "2069311069689618433",
    title: "端午",
    author: "@唐雨",
    category: "平面设计",
    tags: ["平面", "字体"],
    cover: COVER,
    likes: 488,
    views: 7210,
    desc: "字体与纹样的双重奏，把节气写成可读的图形。",
  },
  {
    id: "2069347545408217090",
    title: "马上来财 | 番外篇：五福镇年曲",
    author: "@橙子君",
    category: "AIGC",
    tags: ["AIGC", "番剧"],
    cover: COVER,
    likes: 2210,
    views: 45230,
    desc: "AI 生成的分镜与手绘修正结合，做一支有年味的短片。",
  },
  {
    id: "2069424824817688577",
    title: "百变雪王",
    author: "@YOUNG",
    category: "LOGO设计",
    tags: ["品牌", "IP"],
    cover: COVER,
    likes: 1876,
    views: 33204,
    desc: "一个 IP 的 40 种变形，验证符号在极端缩放下的辨识度。",
  },
  {
    id: "2069428145687240706",
    title: "美团 1 对 1 急送",
    author: "@YOUNG",
    category: "品牌全案",
    tags: ["品牌", "广告"],
    cover: COVER,
    likes: 1042,
    views: 21003,
    desc: "从 slogan 到 15 秒 KV 的完整链路。",
  },
  {
    id: "2069434475625979906",
    title: "逃",
    author: "@YOUNG",
    category: "后期剪辑",
    tags: ["剪辑", "实验"],
    cover: COVER,
    likes: 633,
    views: 8901,
    desc: "用跳切制造焦虑感，30 秒内完成一次情绪逃逸。",
  },
  {
    id: "2069435419579260929",
    title: "笑",
    author: "@YOUNG",
    category: "UI设计",
    tags: ["UI", "动效"],
    cover: COVER,
    likes: 512,
    views: 6674,
    desc: "把表情做成微交互组件库，情绪也可以有设计系统。",
  },
  {
    id: "2069438015643721730",
    title: "《铁兵小队》",
    author: "@YOUNG",
    category: "网页设计",
    tags: ["网页", "3D"],
    cover: COVER,
    likes: 899,
    views: 14320,
    desc: "一个可以用鼠标转动视角的角色展示页。",
  },
];

export type Designer = {
  id: string;
  name: string;
  title: string;
  city: string;
  bio: string;
  works: number;
  followers: number;
  tags: readonly string[];
  accent: string;
};

export const designers: Designer[] = [
  {
    id: "cwy",
    name: "cwy",
    title: "影像导演 / 视觉设计",
    city: "杭州",
    bio: "喜欢把日常拍成短片，用颗粒和慢门留住时间。",
    works: 34,
    followers: 12800,
    tags: ["影视编导", "创意视觉"],
    accent: SWATCHES[0],
  },
  {
    id: "budaoman",
    name: "卜道满",
    title: "AIGC 创作者",
    city: "广州",
    bio: "在生成模型里找可控的意外。",
    works: 88,
    followers: 45200,
    tags: ["AIGC", "动画"],
    accent: SWATCHES[1],
  },
  {
    id: "young",
    name: "YOUNG",
    title: "品牌设计师",
    city: "上海",
    bio: "做能落地的品牌全案，也做不能落地的实验。",
    works: 120,
    followers: 60300,
    tags: ["品牌全案", "LOGO设计"],
    accent: SWATCHES[3],
  },
  {
    id: "tangyu",
    name: "唐雨",
    title: "平面 / 字体设计",
    city: "成都",
    bio: "汉字结构与现代排版的长期练习者。",
    works: 41,
    followers: 9600,
    tags: ["平面设计", "海报设计"],
    accent: SWATCHES[4],
  },
];

export type Course = {
  id: string;
  title: string;
  teacher: string;
  level: string;
  lessons: number;
  duration: string;
  price: string;
  cover: string;
  intro: string;
  chapters: { title: string; duration: string; done?: boolean }[];
};

export const courses: Course[] = [
  {
    id: "aigc-storyboard",
    title: "AIGC 分镜：从文本到可拍摄的镜头表",
    teacher: "卜道满",
    level: "进阶",
    lessons: 12,
    duration: "6 小时 20 分",
    price: "¥399",
    cover: COVER,
    intro: "用一致性人物与场景资产，把一段文字稳定地变成 18 组分镜。",
    chapters: [
      { title: "01 分镜语言的三种基本单位", duration: "26:14", done: true },
      { title: "02 角色一致性：参考图与 LoRA", duration: "31:02", done: true },
      { title: "03 场景连续性：镜头间的空间逻辑", duration: "28:40" },
      { title: "04 从分镜到动态预览", duration: "35:11" },
      { title: "05 调色与交付规范", duration: "22:08" },
    ],
  },
  {
    id: "brand-system",
    title: "品牌系统：从符号到落地物料",
    teacher: "YOUNG",
    level: "中级",
    lessons: 16,
    duration: "9 小时 05 分",
    price: "¥599",
    cover: COVER,
    intro: "一套完整的品牌系统是怎么被拆解、验证并交付给客户的。",
    chapters: [
      { title: "01 品牌识别的三层结构", duration: "24:30", done: true },
      { title: "02 符号的极限缩放测试", duration: "19:55" },
      { title: "03 色彩系统的可访问性", duration: "27:12" },
      { title: "04 物料延展与规范文档", duration: "33:48" },
    ],
  },
  {
    id: "type-basics",
    title: "汉字排版基础：字距、行距与灰度",
    teacher: "唐雨",
    level: "入门",
    lessons: 10,
    duration: "4 小时 40 分",
    price: "¥259",
    cover: COVER,
    intro: "不依赖复杂技巧，先把一行中文排舒服。",
    chapters: [
      { title: "01 中文字体的骨架", duration: "21:06", done: true },
      { title: "02 字距与行距的呼吸", duration: "25:33" },
      { title: "03 版面灰度的控制", duration: "23:19" },
    ],
  },
];

export type Competition = {
  id: string;
  title: string;
  sponsor: string;
  prize: string;
  deadline: string;
  status: "进行中" | "已结束";
  entrants: number;
  brief: string;
  cover: string;
};

export const competitions: Competition[] = [
  {
    id: "ai-love",
    title: "「AI=爱」创意创作大赛",
    sponsor: "Uidea × 幻境实验室",
    prize: "¥200,000",
    deadline: "2026-12-31",
    status: "进行中",
    entrants: 2864,
    brief: "用 AI 表达一件关于「爱」的具体小事：一个人、一段时间，或一次告别。",
    cover: COVER,
  },
  {
    id: "city-signal",
    title: "城市信号：夜景影像征集",
    sponsor: "Uidea × AURA",
    prize: "¥80,000",
    deadline: "2026-11-15",
    status: "进行中",
    entrants: 1129,
    brief: "拍下你所在城市夜里最亮的那一块，霓虹、车灯或一扇没关的窗。",
    cover: COVER,
  },
  {
    id: "type-2025",
    title: "汉字新生：字体设计奖",
    sponsor: "Uidea × 标量实验厂牌",
    prize: "¥50,000",
    deadline: "2026-08-30",
    status: "已结束",
    entrants: 764,
    brief: "为数字界面重新设计一套可读的中文字体。",
    cover: COVER,
  },
];

export const leaderboard = [
  { rank: 1, name: "卜道满", work: "没发出去", score: 98.6, likes: 1543 },
  { rank: 2, name: "cwy", work: "她不是第一次来到这里", score: 97.2, likes: 1280 },
  { rank: 3, name: "YOUNG", work: "百变雪王", score: 96.4, likes: 1876 },
  { rank: 4, name: "橙子君", work: "五福镇年曲", score: 95.1, likes: 2210 },
  { rank: 5, name: "利涉大川", work: "恐龙馆奇妙夜", score: 93.8, likes: 706 },
  { rank: 6, name: "唐雨", work: "端午", score: 92.0, likes: 488 },
];

export type Task = {
  id: string;
  title: string;
  summary: string;
  company: string;
  companyInitials: string;
  tags: readonly string[];
  applicants: number;
  due: string;
  price: string;
  category: WorkCategory;
};

export const tasks: Task[] = [
  {
    id: "1",
    title: "企业项目宣传简介",
    summary:
      "企业项目简介根据项目资料，进行平面设计。项目内容不能外发，需要本地上门服务。可以按照上门服务收费",
    company: "北京宙晴科技有限公司",
    companyInitials: "宙",
    tags: ["加急", "广州", "C端小程序", "需上门"],
    applicants: 456,
    due: "2026-07-07",
    price: "¥1000",
    category: "平面设计",
  },
  {
    id: "2",
    title: "2025 全球AI短片先导预告片视觉合成",
    summary:
      "针对下半年全球首发的科幻叙事短片，需要导演级概念艺术家。利用 ComfyUI 与 Midjourney 定制一致性人物与深空场景资产，含 18 组 4K 动态镜头。",
    company: "幻境实验室 Vortex Studio",
    companyInitials: "VX",
    tags: ["加急", "北京", "商业预告片", "远程"],
    applicants: 18,
    due: "2026-03-15",
    price: "¥35,000",
    category: "AIGC",
  },
  {
    id: "3",
    title: "智能座舱 3D 粒子交互动效原型",
    summary:
      "为新能源旗舰车型定制驾驶模式切换的多维粒子动画。基于 UE5 Niagara 或 TouchDesigner，输出轻量化着色器资产与高清 Demo。",
    company: "AURA 科技视觉研究中心",
    companyInitials: "AU",
    tags: ["深圳", "3D交互", "HMI"],
    applicants: 24,
    due: "2026-03-20",
    price: "¥68,000",
    category: "3D建模",
  },
  {
    id: "4",
    title: "赛博有机体概念电影动态故事板",
    summary:
      "潜空间流体模拟与概念电影动态故事板。需具备强叙事分镜能力，交付分层合成与调色方案。",
    company: "幻境概念探索工作室",
    companyInitials: "幻",
    tags: ["上海", "分镜", "AIGC"],
    applicants: 31,
    due: "2026-03-10",
    price: "¥28,000",
    category: "影视编导",
  },
  {
    id: "5",
    title: "光子场域与微结构全景音画套件",
    summary:
      "全景音画视觉套件开发，涵盖微结构交互与光子场域表现，适合视听实验室级别交付。",
    company: "斯德哥尔摩视听实验室",
    companyInitials: "SV",
    tags: ["远程", "视听", "全景"],
    applicants: 12,
    due: "2026-03-28",
    price: "¥42,000",
    category: "创意视觉",
  },
  {
    id: "6",
    title: "极简标量字体与符号体系重构",
    summary:
      "程序化拓扑重构极简标量字体与符号体系，输出可变字体与品牌符号规范文档。",
    company: "标量实验厂牌",
    companyInitials: "标",
    tags: ["字体", "品牌"],
    applicants: 9,
    due: "2026-02-28",
    price: "¥18,000",
    category: "LOGO设计",
  },
];
