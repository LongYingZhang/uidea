# 导出 Figma 可编辑 SVG

`node scripts/export-svg-profile.mjs`

流程：
1. 启动 dev server（127.0.0.1:5273）
2. 启动 headless Chrome：`--headless=new --no-sandbox --remote-debugging-port=9222`
3. 运行脚本：注入登录态 + 隐藏侧栏 → 读取 DOM 坐标/字体/颜色 → 输出 SVG

输出：`~/Desktop/Uidea-Profile-作品.svg`
- 文字是真 `<text>`（Figma 里可直接改字）
- 图片已按圆角预裁（不依赖 clip-path）
- 图层结构：Header / Tabs / Sub Tabs / Toolbar / Work Item 01-02

改画布尺寸 / 路由：见脚本顶部 W、H、OFFSET_X/Y 与 navigate 的 hash。
