#!/usr/bin/env bash
#
# 本地一键部署：构建并把 dist/ 强制推送到 gh-pages 分支。
# 用法（在项目根目录）：
#   GITHUB_TOKEN=ghp_xxx npm run deploy
# 或：
#   GITHUB_TOKEN=ghp_xxx bash scripts/deploy.sh
#
# 注意：GITHUB_TOKEN 需要 repo 权限（经典 token 勾选 repo 即可）。
# 该 token 仅用于本次推送，不会写入任何文件。
set -euo pipefail

: "${GITHUB_TOKEN:?未检测到 GITHUB_TOKEN 环境变量，请先设置（例如 GITHUB_TOKEN=ghp_xxx npm run deploy）}"

OWNER_REPO="LongYingZhang/uidea"
BRANCH="gh-pages"
DIST_DIR="dist"

echo "→ 构建中…"
npm run build

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cp -R "$DIST_DIR"/. "$TMP"/
cd "$TMP"
git init -q
git checkout -q -b "$BRANCH"
git config user.email "deploy@uidea.local"
git config user.name "UIDEA Deploy"
git add -A
git commit -q -m "deploy: $(date +%Y-%m-%dT%H:%M:%S)"
REMOTE="https://x-access-token:${GITHUB_TOKEN}@github.com/${OWNER_REPO}.git"
git remote add origin "$REMOTE"
git push -q -f origin "$BRANCH"

echo "✅ 已部署 → https://${OWNER_REPO%/*}.github.io/${OWNER_REPO#*/}/"
