#!/bin/bash
# 一键部署：构建 Next.js 并把产物提交到 main 根目录
# （GitHub Pages 固定从 main / root 发布，推送即自动上线）
set -e
cd "$(dirname "$0")"
npm run build
cp -r out/* .
touch .nojekyll
git add index.html 404.html _next images index.txt .nojekyll
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M')" || echo "没有变更需要部署"
git push origin main
echo "已推送，GitHub Pages 将在 1-2 分钟内完成发布"
