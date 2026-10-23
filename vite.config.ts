import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // 相对路径：构建后的资源用 ./assets/...，可在 GitHub Pages 子路径(/<repo>/)下正常加载
  base: "./",
  plugins: [react(), tailwindcss()],
  server: {
    host: "127.0.0.1",
    port: 5273,
    strictPort: true,
    // 放行部署反向代理域名（线上预览用）
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    // 部署工具通过 PORT 环境变量注入端口；启动时显式 --port $PORT
    port: Number(process.env.PORT) || 4173,
    strictPort: true,
    allowedHosts: true,
  },
});
