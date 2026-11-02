# AL-1S 项目交接包（HANDOFF）

> 更新时间：2026-11-03 ｜ 状态：**Next.js 四语言站已上线并通过全量门禁与对抗复核**
> 协作过程见 `.ai/COLLABORATION.md`；本轮词典 Worker 交付与复核记录见
> `.ai/runs/i18n-2026-11-02/`（W1/W2/W3-DONE.md + REVIEW.md）。

## 一句话现状

Next.js 15 + React 19 + TS + Tailwind 3 四语言（zh-CN/zh-TW/ja/en）粉丝站已部署
https://forjiang.github.io/AL-1S/ ：8 张官方风立绘、全页 GlyphSwell 波浪背景、
按浏览器语言自动跳转、语言切换器、画廊 alt 逐张实读对位。

## 运行

```bash
cd AL-1S
npm run dev          # 本地开发（无 basePath）
./deploy.sh          # 一键构建 + 提交产物到 main 根 + push（Pages 自动发布）
```

## 架构速查

- 路由：`app/[lang]/page.tsx`（四语言 SSG，词典驱动）+ `app/page.tsx`（根跳转：
  navigator.languages → zh-Hant 系→zh-TW，ja→ja，en→en，兜底 zh-CN）。
- 词典：`lib/i18n/`——types.ts 定长元组契约（tsc 静态保证四语言逐位对齐），
  zh-CN.ts 基准，zh-TW/ja/en 三份译文；图片文件名在 config.ts（GALLERY_SRCS），
  词典只放 alt。加新语言 = 加一份词典 + config.ts 的 LANGS 加一行。
- 背景：`components/ui/glyph-swell.tsx` 以 **fixed 视口层**铺全页（宿主自带
  `relative`，外层包 `fixed inset-0 -z-10` div 承担定位）；各分区半透明底色
  （/75 与 /55 交替、引用区 black/85）。`prefers-reduced-motion` 组件内建尊重。
- 部署：Pages 固定 main/root，产物提交到 main 根（含 zh-CN/ zh-TW/ ja/ en/ 四目录）。
  next.config `trailingSlash: true` 是硬要求——没有它 [lang] 会导出成平铺
  en.html，Pages 目录 URL 全 404。

## 已知事项与可选迭代

1. 图片↔alt 对照必须**逐张单读**定锚：批量并行读图后凭印象配对极易错位，
   本轮编排者与复核 Agent 各错过一次（已修，见 REVIEW.md 教训）。
2. GlyphSwell 画布为视口大小（非整页高度），滚动时波浪静止在视口内延续显示；
   若想要「随内容滚动的整页波浪」需改组件布局，未做（当前观感更稳）。
3. 旧纯静态站的 artifacts/、tools/ 已随迁移删除；COLLABORATION.md 的门禁精神
   （互斥分区/冻结接口/DONE 制/对抗复核）沿用，具体命令以本文为准。
4. IAB（内嵌浏览器）实测时 rAF 冻结，波浪动画呈静帧属环境限制，真机正常。
