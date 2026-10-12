# W3 交付报告 — assets/js/main.js（全部交互逻辑）

- 文件：`/Users/jianghaoda/.zcode/workspace/default/AL-1S/assets/js/main.js`
- 行数：**1737 行**（单 IIFE + `'use strict'`，纯原生 ES2020，无框架/无构建/无 import）
- 数据来源：只读 `window.AL1S`（data.js 由 W4 提供，此刻尚不存在，已按 null/缺字段全路径防御）
- 未改动任何其他文件；未创建 data.js。

---

## 1. 16 模块实现清单

| # | 模块 | 实现要点 | 降级路径 |
|---|---|---|---|
| 0 | 工具/状态 | `qs/qsa/ce/img/asset/setVar/getPath/data/L/T/num/clamp/reduced/store/detectLang`；`state.lang` 全局语言态 | `data()` 恒返回对象；`setVar` try/catch；`store` 隐私模式静默失败 |
| 1 | **boot** | `#boot-log` 逐行打印 `ui.boot.lines`（180–320ms 随机间隔），`--pct` CSS 变量同步写 `#boot`+`#boot-bar`，`#boot-pct` textContent 同步；末行后停 400ms → 移除 `body.booting` + `#boot` 加 `.is-done`/`hidden`/`display:none` | reduced-motion 或 `lines` 为空 → 立即 `finishBoot()`；**6s 硬超时兜底** + `init()` 整体 try/catch 再兜底，任何异常都不会把页面锁在遮罩里 |
| 2 | **i18n** | `applyLang(lang)`：`[data-i18n]`→textContent、`[data-i18n-ph]`→placeholder、`[data-i18n-html]`→innerHTML；`<html lang>`(zh-CN/ja-JP/en)；`.lang-btn.is-active`；localStorage `al1s-lang`；重渲染全部 10 个动态列表；绑定 `#lang-zh/#lang-ja/#lang-en` | 键缺失 → 保留 HTML 默认文案；非法 lang → 'zh'；首访 `navigator.language` 推断（ja→ja、zh→zh、**其余→zh**） |
| 3 | **nav** | scroll 事件 rAF 节流：视口顶部 40% 处的 section → `.nav-links a[data-nav].is-active`；`#nav-progress` 宽度走 `--w`；`#nav-burger` 切 `#mobile-menu.is-open` + `aria-expanded`；点任意 `a[data-nav]`（页眉/移动菜单/页脚）关菜单；`#back-top` 回顶（reduced-motion 用 auto） | 元素缺失全部跳过；平滑滚动交给 CSS `scroll-behavior` |
| 4 | **stats** | `#stat-level` min/max 取 `stats.levels` 首尾；**相邻档位线性插值**（整数档四舍五入、小数保留 2 位、null 字段显式 `—`）；`#stat-bars` 每行 `label + .ba-meter>.ba-meter-fill(--w) + 数值`；`#stat-grid` 数字卡；`#stat-formula` 支持字符串/对象两种 schema，缺失显示 `—`；input 事件即时刷新（不依赖过渡） | `levels`/`byLevel` 为空 → 禁用滑块 + 空态 + `—` |
| 5 | **skills** | `#skill-tabs` 按 `data.skills` 重建 4 页签（id 优先，回落 SKILL_ORDER 索引）；`#skill-detail` 图标/名称/cost/desc；`#skill-level` 1..10（数据有更高档则放宽）；`#skill-values` 表头=`valueLabels`、数据行=`values[level]`，**level>max 用 max 档并追加 `ui.skills.maxLabel` 标注**；嵌套对象按 valueLabels 顺序展平成点路径（`dmg.pct`）取值 | skills 为空 → 页签/详情/表格全部 `—`；values 缺级 → 回落低档或 max 档 |
| 6 | **weapon** | `#weapon-name/#weapon-desc/#weapon-icon`；`#weapon-levels` 两个按钮（`data-wlv="1"/"max"`）切 `.is-active`；`#weapon-stats` 按 `statLabels` 网格；`#weapon-skill-name/#weapon-skill-desc` | weapon/stats 缺失 → `—` 空态；`statLabels` 数组/对象两种 schema 都支持 |
| 7 | **stories** | `#story-list` 渲染 `.ba-acc-item`（编号 padStart + title + source 标签 official→`ui.stories.officialTag`/summary→`ui.stories.summaryTag`）；head 为 button 带 `aria-expanded`/`aria-controls`；`.ba-acc-body` 按 `\n\n` 分段；head 点击切 `.is-open`，title 切 `openHint/closeHint`；`#story-empty` 空态 | body 为空 → `—` 段；stories 为空 → 显示 `#story-empty` |
| 8 | **voices** | `#voice-tabs` = all + 数据中实际出现的分类；`#voice-list` 渲染 `button.v-item[data-voice]`（jp 大字 + zh/en 小字 + note）；点击 → `speechSynthesis`（`lang='ja-JP'`, rate 0.95, pitch 1，先 cancel 再 speak）；`onstart/onend` 维护 `#voice-now` 显示、`.is-playing`、`#voice-stop` | **不支持 TTS → toast `ui.voices.ttsHint`（不静默失败）**；空列表 → `.voice-empty`；onend 不可靠时有 `text.length*320+2.5s` 兜底计时器 |
| 9 | **momotalk** | `#mt-contacts` 渲染头像/名称/末条摘要/未读徽标（**alice 与首个联系人之外各 1 条未读，读过清零**）；点联系人切 `#mt-avatar/#mt-name/#mt-status` + `#mt-chat` 渲染 `threads[id]`（`.mt-msg--in/--out` + `.mt-bubble` + `.mt-time`，按当前语言取 text）；`#mt-form` 提交：空 → 按钮 disabled + toast；否则追加 out → `#mt-typing` 800–1600ms → 从 `replies` 随机取一条（当前语言）作 in 追加 → 滚到底 | **清空策略：保留对方首条 in 消息；若该线程无任何 in 消息则补一条「……」系统问候**（二选一已选定，见 §4）；线程数据克隆到 `state.mtThreads`，不污染 `window.AL1S`，语言切换可无损重渲染 |
| 10 | **memoria** | `#memoria-grid` 渲染卡片：`<img>` 背景 art、rarity 星（`star-on.svg`×rarity + `star.svg` 补位）、title、desc | **art 缺失 → `.memoria-art--empty` 渐变占位**（避免内联 background-image）；rarity 钳制 0–3 |
| 11 | **timeline** | `#timeline-list` 渲染 `events[]`：等宽日期 + `mission-tag--release/event/story/rerun` 变体 + title + desc | 未知 type → `mission-tag--other`；空 → `.timeline-empty` |
| 12 | **quiz** | `#quiz-box` 当前题（`.quiz-q-idx` + 文本 + `.quiz-opt` 单选 `.is-selected` + prev/next 导航）；`#quiz-progress` 进度走 `--w`；答完最后一题点 next → `#quiz-result`（resultTitle + 总分/满分 + results 按 min/max 分档 title/desc + `ui.quiz.restart` 重开）；已答可返回修改 | 无题目 → `.quiz-empty` + 进度 0%；分档不命中 → 取最后一个 min≤score 的档 |
| 13 | **gacha 彩蛋** | `#hero-logo` 3s 内连击 5 次 → `#gacha-overlay` 去 hidden + `.is-open`、`#gacha-burst`/`#gacha-card` 加 `.is-run` 重放演出、`#confetti-canvas` 2D 粒子雨 2.5s（BA 蓝黄粉白四色，rAF，按 dpr 设置 backing store）；`#hero-cta-gacha` 直接触发同一演出；`#gacha-close`/点遮罩/Esc 关闭；播放期间可选朗读 `profile.intro`（ja-JP） | **reduced-motion → 跳过粒子只显示卡片**；canvas/ctx 缺失 → 静默跳过；语音失败忽略；彩蛋播语音不与语音区播放抢占 |
| 14 | **reveal** | `.reveal` IntersectionObserver（threshold 0.15，触发一次加 `.is-in` 后 unobserve） | **无 IO 或 reduced-motion → 全部直接 `.is-in`**；IO 构造异常 → 同样全开 |
| 15 | **toast** | `showToast(text)`：`#toast-root` 追加 `div.toast`（textContent 写入，**不用 innerHTML 防注入**）+ 双 rAF 后 `.is-show`，2.4s 移除，可点击关闭 | 无 `#toast-root` 或空文本 → 直接返回，不抛错 |
| 16 | **通用** | 所有绑定前做元素存在性检查；`DOMContentLoaded`/readyState 双分支初始化；关键路径 try/catch + `console.warn`；**零 `console.error`**（全文仅 2 处 `console.warn`） | — |

---

## 2. 自测

### 2.1 语法门禁

```bash
export PATH="/tmp/node-v20.18.1-darwin-arm64/bin:$PATH"
cd /Users/jianghaoda/.zcode/workspace/default/AL-1S
node --check assets/js/main.js && echo "SYNTAX OK"
```
输出：
```
SYNTAX OK
lines:     1737
```

### 2.2 逻辑冒烟（node + 自建迷你 DOM 桩）

data.js 尚不存在，**未创建 data.js**。用 `/tmp/w3-smoke.js`（自建 ~200 行迷你 DOM：HTML 解析器 + 选择器引擎 + 事件冒泡 + classList/style.setProperty 桩）加载真实 `index.html`，`global.window={AL1S:<契约 mock>}` 后 eval 真实 main.js，覆盖 5 个场景：

```bash
export PATH="/tmp/node-v20.18.1-darwin-arm64/bin:$PATH"
for sc in full nodata reduced io tts; do W3_SCENARIO=$sc node /tmp/w3-smoke.js; done
```

| 场景 | 配置 | 结果 |
|---|---|---|
| `full` | 完整 mock 数据（含 null 字段、嵌套 values、art 缺失） | **88 passed, 0 failed** |
| `nodata` | `window.AL1S = null`（模拟 data.js 未加载） | **12 passed, 0 failed** |
| `reduced` | `prefers-reduced-motion: reduce` | **9 passed, 0 failed** |
| `io` | 存在 IntersectionObserver、无 speechSynthesis | **5 passed, 0 failed** |
| `tts` | 存在 IO + speechSynthesis | **10 passed, 0 failed** |

合计 **124 条断言全绿**。`full` 场景覆盖路径：

- boot：4 行逐行打印、`--pct`/数字同步 100%、`body.booting` 移除、`#boot` hidden + display:none、6s 兜底
- i18n：zh→ja→en→zh 循环切换后 hero 标题/副标题、占位符、`<html lang>`、localStorage、按钮态、stat 行数全部即时刷新
- stats：滑块 min/max 来自 levels、Lv.25 线性插值 HP=3449（1↔50 档）、`--w` 比例 38.32%、公式渲染
- skills：4 页签、EX 名称/cost、表头 2 列、Lv1 数值 300、滑块 max=10、Lv10 超出 max 标注 maxLabel、切 basic 生效
- weapon：Lv.1 两格 → MAX 按钮激活 + 数值 300 → 切回
- stories：2 项、`\n\n` 分 3 段、点击展开 `.is-open` + `aria-expanded`
- voices：3 页签、all→login 过滤 2→1、**无 TTS 时 toast 提示而非静默失败**
- momotalk：2 联系人、未读徽标、读过清零、切联系人、in 消息样式、空输入按钮 disabled、发送 out、typing 800–1600ms、自动回复 in、清空保留首条问候
- memoria：2 卡、rarity 3 → 3 星、art 缺失 → 占位类
- timeline：2 条、release 配色变体
- quiz：初始进度 0% → 选中 → 50% → 下一题 → 返回改选 → 结算（总分/分档）→ 重开
- gacha：连击 5 次打开、卡片演出、任务完成 toast、canvas 尺寸、点遮罩/Esc 关闭、CTA 直触发
- reveal：无 IO → 26 个全部 `.is-in`；toast 挂载
- nav：`--w` 写入、汉堡开菜单 + aria-expanded、点导航链接关菜单

`nodata` 场景验证：`window.AL1S=null` 时 init 不抛错、boot 正常结束、页面可交互、stats/skills/stories/memoria/timeline/quiz/momotalk/voices 全部走可见空态、语言切换仍可用、无异常 toast。

> 注：冒烟中发现并修复了一个真实问题——技能 `values` 为嵌套对象（如 `{dmg:{pct:300}}`）时原实现取不到值，已改为按 `valueLabels` 顺序展平为点路径取值；同时 `#skill-level` 上限从「数据最大数字档」改为「max(10, 数据最大档)」，避免只有 `'1'`/`'max'` 两档数据时滑块卡在 1。

---

## 3. 需要编排者协调的事项

### 3.1 CSS（W1）需要提供的类/变量

main.js **不写任何内联样式**，唯一例外是进度数值 CSS 变量。以下类名/变量需要 W1 的 CSS 配套，否则只有结构没有视觉：

| 用途 | main.js 产出 | 需要的 CSS |
|---|---|---|
| boot 进度 | `#boot`/`#boot-bar` 上 `--pct: N%` | `.boot-bar { width: var(--pct) }`（或 `transform: scaleX()`） |
| 阅读进度 | `#nav-progress` 上 `--w: N%` | `#nav-progress { width: var(--w) }` |
| 数值条 | `.ba-meter > .ba-meter-fill` + 子元素 `--w: N%` | `.ba-meter-fill { width: var(--w) }` + 过渡 |
| 检定进度 | `#quiz-progress` 上 `--w: N%` | `#quiz-progress { --w }` 消费（背景渐变/伪元素宽度） |
| 手风琴 | `.ba-acc-item.is-open > .ba-acc-body` | 展开高度过渡（max-height/grid-rows 任选） |
| 彩蛋演出 | `#gacha-burst.is-run`、`#gacha-card.is-run` | 星爆/卡片弹出动画；`#gacha-overlay.is-open` 显示（`hidden` 属性已被 main.js 同步置位，CSS 需保证 `[hidden]` 不被 `display:flex` 覆盖，main.js 已额外 `display:none` 双保险） |
| 语音项 | `.v-item`（同时挂了 `voice-item` 兼容 CONTRACT §6 写法）、`.v-item.is-playing`、`.v-jp/.v-sub/.v-zh/.v-en/.v-note`、`.voice-empty` | 排版 + `.is-playing` 高亮 |
| 数值行/卡 | `.stat-bar-row/.stat-bar-label/.stat-bar-val/.stat-cell/.stat-cell-k/.stat-cell-v/.stat-formula-k` | 其中 `.stat-bar-val`、`.stat-cell-v`、`#stat-level-val`、`.timeline-date` 建议用 `var(--font-mono)` |
| 技能表 | `.skill-values-table/.skill-values-head/.skill-values-body/.skill-values-num/.skill-values-note/.skill-values-empty` | 表头/等宽数字 |
| 武器 | `.weapon-stat/.weapon-stat-k/.weapon-stat-v/.weapon-stats-empty` | 网格 |
| 故事 | `.ba-acc-idx/.ba-acc-title/.ba-tag--official/.ba-tag--summary/.ba-acc-body-inner` | 编号等宽 + 标签配色 |
| MomoTalk | `.mt-contact-meta/.mt-contact-name/.mt-contact-last/.mt-unread/.mt-empty` | 未读小红点、摘要截断 |
| 记忆局限 | `.memoria-art/.memoria-art-img/.memoria-art--empty/.memoria-art-ph/.memoria-body/.memoria-stars/.memoria-title/.memoria-desc/.memoria-empty` | **`.memoria-art--empty` 渐变占位** |
| 年表 | `.timeline-item/.timeline-date/.timeline-body/.timeline-title/.timeline-desc/.timeline-empty` + `.mission-tag--release/--event/--story/--rerun/--other` | 四色变体（release 黄/event 蓝/story 青/rerun 灰） |
| 检定 | `.quiz-q/.quiz-q-idx/.quiz-q-text/.quiz-opts/.quiz-opt/.quiz-opt-key/.quiz-opt-text/.quiz-nav/.quiz-prev/.quiz-next/.quiz-empty/.quiz-result-head/.quiz-result-label/.quiz-score/.quiz-score-num/.quiz-score-max/.quiz-result-title/.quiz-result-desc/.quiz-restart` | 选项单选态、结算排版 |
| 联系人空态 | `.mt-contacts-empty`、`.ba-tabs-empty` | — |
| 星 | `.ba-star--off`（main.js 补位空星用） | 与 `.ba-star` 区分 |
| toast | `div.toast` + `.toast.is-show` | 2.4s 过渡（main.js 用 setTimeout 兜底移除） |

### 3.2 data.js（W4）字段约定

1. **`ui.profile.rowLabels`**（可选增强）：`#profile-rows` 的 15 个字段标签（reading/school/club/role/position/weaponType/armor/attackType/rarity/age/birthday/height/hobby/cv/illustrator）在 CONTRACT §5 的 `ui.profile` 里没有对应键，main.js 目前用**内置三语标签表**。若 W4 补 `ui.profile.rowLabels.{key}`，main.js 会**自动优先使用**（当前实现是内置表优先——需要我改为 data 优先请告知，一行改动）。
2. `skills[].values` 的键：main.js 取「最大数字档」为 max，`'max'` 键作为超档档位；若 W4 提供 `'1'..'10'` 全档则滑块 1..10 全部有真实数值。
3. `voices[].cat` 只需落在 `login/battle/interact/idle/gacha/other` 六类内即可自动生成页签。
4. `momotalk.contacts` 中 id 为 `alice` 的联系人不会获得初始未读徽标（与首屏激活项一致）。
5. `momotalk.replies` 每条需为 `{zh,ja,en}`（也兼容纯字符串）。
6. `ui.*` 键 main.js 已用**字面全路径**引用的有：`ui.skills.{tabEX,tabBasic,tabEnhanced,tabSub,costLabel,maxLabel}`、`ui.stats.barLabels.*`、`ui.stories.{officialTag,summaryTag,openHint,closeHint,empty}`、`ui.voices.{ttsHint,catNames.*}`、`ui.quiz.{next,prev,restart,resultTitle,resultScore}`、`ui.momotalk.inputPlaceholder`、`ui.memoria.rarityLabel`、`ui.profile.starsLabel`、`ui.gacha.title`、`ui.toast.missionComplete`、`ui.boot.lines`。**未被任何文件引用的 ui 键**（W4 可考虑不加，或告知我消费）：`ui.stats.formulaLabel`、`ui.weapon.statsLabel`、`ui.footer.backTop`（back-top 按钮文案在 index.html 用的是 `ui.footer.backTop`，已引用）。

---

## 4. 已知限制 / 说明

1. **MomoTalk 清空策略**：保留对方首条 in 消息；若该线程没有任何 in 消息，则补一条 `……` 系统问候（三语）。
2. `#weapon-skill`（契约 id）是静态容器，main.js 只写其子节点 `#weapon-skill-name/#weapon-skill-desc`。
3. quiz「已答锁定」实现为：当前题选中后该题选项按钮在当屏不可再点（已选中态），但可通过 prev 返回后改选——与「已答锁定可返回修改」一致。
4. `speechSynthesis` 的 `onend` 在部分浏览器不可靠，已加 `text.length*320+2500ms`（上限 30s）兜底复位。
5. 彩蛋朗读 `profile.intro` 时若语音区正在播放则跳过，避免抢占。
6. 未实现 sessionStorage「已访问过跳过 boot」（派工单标注为可选）。
7. 冒烟测试脚本在 `/tmp/w3-smoke.js`（未写入项目）。
