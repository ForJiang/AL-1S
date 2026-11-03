#!/bin/bash
# AL-1S · 天童アリス粉丝站 · © 2026 ForJiang · github.com/ForJiang
# 一键部署：构建 Next.js 并把产物提交到 main 根目录
# （GitHub Pages 固定从 main / root 发布，推送即自动上线）
# 产物含四语言目录（zh-CN / zh-TW / ja / en），git add -A 连同源码一起提交
set -e
cd "$(dirname "$0")"
npm run build
cp -r out/* .
touch .nojekyll
git add -A .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M')" || echo "没有变更需要部署"
git push origin main
echo "已推送，GitHub Pages 将在 1-2 分钟内完成发布"
