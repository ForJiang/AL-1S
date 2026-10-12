# W1 · CSS 设计系统 — DONE

完成时间：2026-10-11 ｜ Worker：W1 ｜ 分区：assets/css/（5 个文件，互斥写入）

## 1. 交付清单

| 文件 | 行数 | 职责 |
|---|---|---|
| `assets/css/tokens.css` | 208 | 唯一变量来源：契约 §2 全套色板/字体/间距 `--sp-1..12`/圆角/阴影/动效 + 语义派生变量（`--bg-page` `--text-strong` `--panel-bg` 等）+ z-index 层级表 + 资产路径与平铺尺寸 + JS 注入型变量兜底值 |
| `assets/css/base.css` | 481 | reset、`body` 六边形氛围底、全局排版（h1-h4/p/blockquote/dl/table，中文行高 1.7）、`::selection`、`:focus-visible`（2px 蓝描边 + 深色区黄环）、滚动条皮肤、`.hex-bg/.grid-bg/.stripe-bg`、`.container`、`.reveal` 初始态/`.is-in`、15 个 keyframes、`prefers-reduced-motion` 全局降级 |
| `assets/css/layout.css` | 563 | `#site-nav` 固定毛玻璃顶栏（品牌/导航/语言切换/汉堡）、`#nav-progress` 3px 进度条（`--pct`）、`.mobile-menu` 下拉、`main section` 通用外框（min-height / padding ≥96px 桌面 64px 移动 / 深色=hero·stats·momotalk，浅色交替）、`#footer` 深蓝圆角上缘、`scroll-margin-top: 84px`、1080/768/400px 响应式 |
| `assets/css/components.css` | 1564 | 契约 §4 组件全套：`.ba-panel`(+`--dark`/`.ba-cut` 双层 background 描边 + clip-path 切角)、`.ba-btn`(primary/ghost/yellow，`--ease-pop` 回弹、按下 scale(.96))、`.ba-badge`/`.ba-star`/`.ba-tag`/`.ba-tabs`/`.ba-tab`/`.ba-meter`(`--w`)/`.ba-slider`(webkit+moz 双写)/`.ba-acc`(grid 0fr→1fr)/`.ba-card`/`.sec-head`/`.mission-tag`(含 4 种 type 配色)、MomoTalk 全套 `.mt-*`、`.v-item`、`.gacha-overlay`/`.gacha-card`、`.toast`/`.toast-root`、`#confetti-canvas` |
| `assets/css/sections.css` | 1667 | 按 index.html DOM 逐段：`#boot` 启动层（hex 底 + 逐行日志 + 末行闪烁光标 + `--pct` 进度条）、`#hero`（100svh、两栏、三层视差氛围、clamp 大标题多层白描边、光环旋转浮动、弹跳滚动提示）、`#profile`/`#stats`/`#skills`/`#weapon`/`#stories`/`#voices`/`#momotalk`/`#memoria`/`#timeline`/`#quiz`/`#footer` 彩蛋层，及 960/860/720/520/390px 五档响应式 |

合计 4483 行。五个文件顶部各有一行用途注释，内部分节注释。

## 2. 自测输出

```
$ cd /Users/jianghaoda/.zcode/workspace/default/AL-1S && python3 tools/check_css.py
[G4] var 定义 123 / 使用 100；CSS 类 245
[G4] ✅ 通过
---- exit: 0 ----
```

补充自检（非门禁）：花括号/圆括号跨文件配对平衡；所有声明均含 `:`；无 `text-decoration: ... underline`；
`var()` 引用 100% 有定义；HTML 静态类 0 条 WARN（index.html 全部类名均有对应规则）。

**url() 缺失：0 条。** 撰写过程中 W2 已并行产出 `assets/img/` 下全部 SVG，
`hex-pattern.svg`(120×104) / `grid-pattern.svg`(60×60) / `stripe-pattern.svg`(40×40) 均已存在，
我已按 SVG 原生 viewBox 尺寸设置 `--tile-hex/--tile-grid/--tile-stripe`（等比，不变形）。

## 3. 需要编排者转交 W3（main.js）的 DOM 钩子约定

以下类名由 JS 动态生成，CSS 已全部定义，**W3 需按此结构输出**（契约 §5 schema 未规定内部类名，故在此明确）：

1. **#profile-rows**（dl）：每行必须是 `<div><dt>标签</dt><dd>值</dd></div>`（外层 div 不可省，否则网格错位）。
2. **#stat-bars**：每行 `<div class="stat-row"><span class="stat-row-label">HP</span><div class="ba-meter"><div class="ba-meter-fill" style="--w:62%"></div></div><span class="stat-row-val">1234</span></div>`（`--w` 走 CSS 变量，符合契约「不写内联样式，进度除外且必须走变量」）。
3. **#stat-grid**：`<div class="stat-cell"><span class="stat-cell-label">…</span><span class="stat-cell-val">…</span></div>`。
4. **#story-list**：两种等价写法均可 —— 推荐 `ba-acc` 系：`<div class="ba-acc-item"><button class="ba-acc-head">…</button><div class="ba-acc-body"><div class="story-text">…</div></div></div>`；`story-*` 系（`.story-item/.story-head/.story-body/.story-num/.story-title/.story-src`）也已实现同款开合。`ba-acc-body` 内必须有且只有一个子元素（高度过渡依赖它）。
5. **#voice-list**：`<button class="v-item" data-voice="…">`（契约 §4 的 `v-item`）；契约 §3 写的 `voice-item` 我也做了等价别名，两者样式一致。条目内建议结构：`<span><b class="v-jp">…</b><span class="v-zh">…</span><span class="v-en">…</span><span class="v-note">…</span></span><span class="v-play"><span class="v-wave"><span></span>×4</span></span>`。
6. **#mt-contacts**：`<button class="mt-contact"><img/><span class="mt-contact-name">…</span><span class="mt-contact-summary">…</span><span class="mt-unread"></span></button>`（未读红点类名 `.mt-unread` 为新增约定）。
7. **#memoria-grid**：`<article class="memoria-card" style="--art:url('assets/img/memoria-1.svg')"><span class="memoria-rarity">★★★</span><div class="memoria-body"><h3 class="memoria-title">…</h3><p class="memoria-desc">…</p><div class="memoria-stars">…</div></div></article>`。**卡面 art 建议通过 `--art` 变量注入**（我已定义 `--art: none` 兜底），避免直接写 `background-image` 内联。
8. **#timeline-list**：`<li class="timeline-item timeline-item--release"><span class="timeline-date">2021-02-04</span><span class="mission-tag mission-tag--release">…</span><div class="timeline-body"><h3 class="timeline-title">…</h3><p class="timeline-desc">…</p></div></li>`。type → 类名映射：release/event/story/rerun（四种配色已备）。
9. **#quiz-progress**：进度填充直接作为 `#quiz-progress` 的**唯一子元素**即可（`> *` 已设为填充条，宽度走 `--pct`）。`#quiz-box` 内建议：`.quiz-num` + `.quiz-q` + `.quiz-options > button.quiz-option`（选中态加 `.is-picked`）+ `.quiz-nav`；结果卡 `.quiz-result` 内 `.quiz-result-score/.quiz-result-title/.quiz-result-desc`。
10. **#weapon-stats**：`<div class="weapon-stat"><span class="weapon-stat-label">…</span><span class="weapon-stat-val">…</span></div>`。
11. **`--pct` 变量**同时服务于 `#boot-bar`、`#nav-progress`、`.quiz-progress`（tokens.css 已给 0% 兜底）。
12. **`#toast-root`** 的子元素直接 `<div class="toast">文案</div>` + 加 `.is-show` 即可，无需内联样式。

## 4. 已知问题 / 待仲裁

1. **MomoTalk 样式落点分工**：`.mt-*` 组件样式按契约 §4 放在 `components.css` §13（含 860px 侧栏横排断点）；`sections.css` §9 只做区块级 `#mt-app { max-width: 980px; margin-inline: auto }`。两者无冲突，但若编排者希望全部下沉到 sections.css 可告知，我调整。
2. **`.sec-head` 采用左对齐 + 左侧黄/青竖线**（非居中），贴近 BA 任务面板语言；如需居中版可改。
3. **`--sp-6/--sp-8` 在 ≤390px 时被临时调小**（20px/26px，写在 `sections.css` 的 `:root` 媒体查询里），用于极限收紧面板内边距。若认为这会意外影响其他区块间距，可改为只调容器 padding。
4. **`body.booting` 锁定滚动**已实现（`overflow: hidden`）；若 main.js 需要在启动动画结束后同时移除 `.booting` 与 `#boot` 的 `hidden` 属性，CSS 侧无需额外钩子。
5. **未改动任何其他分区文件**；index.html 的 class/id 与契约完全一致，未发现缺 class 的情况（G4 的 HTML 类覆盖检查 0 WARN 可证）。
6. `#hero-cta-gacha`、`#hero-logo` 的 cursor:pointer 已设置；招募彩蛋由点击 `#hero-logo` 5 次触发（W3 负责），CSS 侧 `.gacha-overlay` 已支持 `hidden` 属性显隐。
7. `#voices` 播放条 `#voice-now` 采用 fixed 底部居中（`--z-voice: 950`，低于 nav 的 1000，高于普通内容）。若希望它 sticky 在 section 内而非全局悬浮，告知即可改。

## 5. 红线遵守

- 只写入了上述 5 个 CSS 文件；未触碰 index.html / CONTRACT.md / 其他 Worker 分区。
- 未访问网络、未上传、未 git push。
- 全站链接无下划线（门禁与人工检查均通过）；`:focus-visible` 全覆盖；`prefers-reduced-motion: reduce` 全局降级到 0.01ms 并强制 `.reveal` 直接可见。
- z-index 严格遵循 `#confetti-canvas 9998 < #gacha-overlay 9999 < #toast-root 10000`，`#site-nav 1000`、`.mobile-menu 999`；`#boot` 取 10001（契约未规定，需覆盖全部层级）。
