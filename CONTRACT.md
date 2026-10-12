# AL-1S 项目接口契约（CONTRACT v1.0 — 并行派工前冻结，2026-10-11）

> 本文件是所有 Worker 的唯一接口依据。冻结后如需修改，必须回编排者仲裁，Worker 不许私自偏离。
> 项目：AL-1S —— 蔚蓝档案（Blue Archive）天童爱丽丝（天童アリス / Tendou Alice）主题粉丝站。
> 形态：**纯静态**（无构建、无 Node 依赖、零框架），双击 index.html 或任意静态服务器即可运行。
> 语言：简体中文（默认）/ 日本語 / English 三语即时切换，所有文案与内容走 data.js 的 i18n 数据集。

---

## 0. 站点概念（所有设计与文案的总纲）

网站虚构框架：**「AL-1S」是爱丽丝（机体编号 AL-1）的姊妹机终端**。整站就是一台
「AL-1S TERMINAL / 机能扩充终端」，以蔚蓝档案游戏内 UI 的语言（任务面板、角色卡、
MomoTalk、记忆局限、招募演出）呈现爱丽丝的全部资料。科技感 + 清扫机器人母题 + 夏莱终端风。

- 品牌名：AL-1S（读作 A-L-One-S）。Logo = 六边形 + 爱丽丝的机械光环 + 等宽字体。
- 口号（三语在 data.js）：zh「清扫开始。我是，机器人少女。」ja「掃討、開始します。」en「Sanitization initiated.」
- 免责声明：页脚必须注明非官方粉丝作品，版权归 Nexon Games / Yostar。

## 1. 文件布局与 Worker 分区（互斥）

```
AL-1S/
├─ index.html                  ← 编排者（全部 DOM id/class 以此为准）
├─ serve.py                    ← 编排者（ThreadingTCPServer 本地预览，供门禁/截图）
├─ README.md                   ← 编排者
├─ CONTRACT.md / .ai/          ← 编排者
├─ assets/
│  ├─ css/
│  │  ├─ tokens.css            ← W1（设计令牌：颜色/字体/间距/圆角/阴影/层级）
│  │  ├─ base.css              ← W1（reset、body、排版、滚动条、工具类、动画 keyframes）
│  │  ├─ layout.css            ← W1（导航、页脚、section 外框、容器、响应式栅格）
│  │  ├─ components.css        ← W1（按钮/徽章/星/面板/标签页/滑块/手风琴/MomoTalk/弹层）
│  │  └─ sections.css          ← W1（九大 section 的专属布局 + loading + 彩蛋）
│  ├─ js/
│  │  ├─ data.js               ← W4（三语内容数据集，严格按 §5 schema）
│  │  └─ main.js               ← W3（全部交互，严格按 §6 模块清单 + §4 DOM id）
│  ├─ fonts/                   ← 编排者（Fredoka / M PLUS Rounded 1c / Share Tech Mono 自托管）
│  └─ img/                     ← W2（全部 SVG，严格按 §7 清单与风格规范）
└─ artifacts/                  ← 研究成果（R1/R2 只读产出）
```

**互斥规则**：一个文件同一时刻只属于一个 Worker。W1 只写 5 个 CSS；W2 只写 assets/img/ 下
SVG；W3 只写 assets/js/main.js；W4 只写 assets/js/data.js。发现要动别人分区 → 回报编排者仲裁。

## 2. 设计令牌（tokens.css 必须完整实现这些变量）

### 颜色（蔚蓝档案经典蓝白黄 + 深海军蓝）
```css
--ba-blue-700:#1c6fd0;  --ba-blue-600:#2f8fe8;  --ba-blue-500:#4aa8f0;
--ba-blue-400:#6fc0f7;  --ba-blue-300:#9ad8ff;  --ba-blue-200:#c8e8ff;
--ba-blue-100:#e4f2ff;
--ba-navy-900:#0a1428;  --ba-navy-800:#10203e;  --ba-navy-700:#183054;
--ba-navy-600:#22406e;
--ba-yellow-500:#ffc93c; --ba-yellow-400:#ffd94a; --ba-yellow-300:#ffe886;
--ba-pink-300:#ff9fb2;  --ba-cyan-400:#54e3ff;
--ba-paper:#eef5ff;     --ba-white:#ffffff;
--ba-ink:#13233f;       --ba-ink-soft:#3d5375;  --ba-line:#b9d4f2;
```
派生（由 CSS 自行定义，不强制命名）：文字主色深底上用 `--ba-blue-100`，浅底用 `--ba-ink`。

### 字体
```css
--font-display:'Fredoka','M PLUS Rounded 1c','PingFang SC',system-ui,sans-serif;
--font-body:'M PLUS Rounded 1c','Fredoka','PingFang SC','Hiragino Sans GB','Microsoft YaHei',system-ui,sans-serif;
--font-mono:'Share Tech Mono','SFMono-Regular',Consolas,monospace;
```
规则：拉丁展示字用 Fredoka（粗、圆、字距略宽）；日文正文用 M PLUS Rounded 1c；
「系统/终端」文案（启动日志、编号、坐标、等级数字）用 Share Tech Mono。中文回落系统圆体。

### 间距/圆角/阴影/动效（命名即语义）
- 间距 `--sp-1..--sp-12`（4px 步进到 48px）；section 纵向 padding ≥ 96px（桌面）。
- 圆角 `--r-s:10px; --r-m:16px; --r-l:24px; --r-pill:999px`。
- 阴影 `--shadow-panel:0 10px 30px rgba(16,32,62,.12)`、`--shadow-pop:0 18px 50px rgba(10,20,40,.22)`。
- 动效 `--dur-fast:.18s; --dur:.32s; --dur-slow:.6s; --ease-pop:cubic-bezier(.34,1.56,.64,1)`（回弹，BA 味）。
- 斜切面板：统一用 `clip-path` 切角（右上+左下 14px），类名 `.ba-cut`（组合用，不单独依赖）。

## 3. DOM 契约（index.html 已按此写好，Worker 只读 index.html 对照，不得改 id）

- 启动层：`#boot`（含 `#boot-log`/`#boot-bar`/`#boot-pct`/`#boot-title`），`body.booting` 时锁定滚动
- 导航：`header#site-nav`；`.nav-links a[data-nav]`；语言按钮 `#lang-zh/#lang-ja/#lang-en`；汉堡 `#nav-burger`；`#nav-progress`（顶部阅读进度条）
- 区块锚点（section id，一个不少）：
  `#hero` `#profile` `#stats` `#skills` `#weapon` `#stories` `#voices` `#momotalk` `#memoria` `#timeline` `#quiz` `#footer`
- 英雄区：`#hero-logo` `#hero-title` `#hero-sub` `#hero-tagline` `#hero-cta-profile` `#hero-cta-momotalk` `#hero-cta-gacha` `#hero-art` `#hero-badges`
- 档案卡：`#profile-card`（内含 `#profile-stars`、`#profile-rows`、`#profile-quote`）；`#profile-school`/`#profile-club` 为首屏 `#hero-badges` 内的徽章图（契约位置以此为准）
- 数值区：`#stat-level`（range 1..max）`#stat-level-val` `#stat-bars` `#stat-grid` `#stat-formula`
- 技能区：`#skill-tabs`（4 个 tab 按钮）`#skill-detail` `#skill-level`（range 1..10）`#skill-level-val` `#skill-values`
- 武器区：`#weapon-name` `#weapon-icon` `#weapon-desc` `#weapon-stats` `#weapon-skill`
- 羁绊故事：`#story-list`（手风琴容器）`#story-empty`
- 语音：`#voice-tabs` `#voice-list`（每项 `button.voice-item[data-voice]`）`#voice-now`（当前播放条）
- MomoTalk：`#mt-app`（外框）`#mt-sidebar` `#mt-contacts` `#mt-chat`（消息流）`#mt-name` `#mt-status` `#mt-input` `#mt-send` `#mt-typing`（正在输入指示）
- 记忆局限：`#memoria-grid`
- 年表：`#timeline-list`
- 趣味测试：`#quiz-box` `#quiz-progress` `#quiz-result`
- 彩蛋：`#gacha-overlay`（含 `#gacha-burst` `#gacha-card` `#gacha-close`）；全局 `#toast-root`；`#confetti-canvas`
- 页脚：`#footer`（含免责声明节点，data-i18n 键 `footer.disclaimer`）

### i18n 绑定方式（W3 与 W4 的唯一约定）
- 静态文本：任意元素加 `data-i18n="点分键路径"` → main.js 写 textContent
- 占位符：`data-i18n-ph="键"` → 写 input/textarea 的 placeholder
- 富文本：`data-i18n-html="键"` → 写 innerHTML（仅限契约内的安全静态串）
- 列表渲染：JS 按 §5 schema 取数后生成 DOM，生成元素同样可带 data-i18n（由 main.js 二次 apply）
- 语言持久化：`localStorage['al1s-lang']`；首访按 `navigator.language` 推断（zh→zh，ja→ja，其余→en？否：默认 **zh**）
- `<html lang>` 随语言切换更新

## 4. 类名规范（BEM-lite，`ba-` 组件 / `sec-` 区块 / `mt-` MomoTalk / `v-` 语音）

组件（components.css 必须提供）：`ba-panel` `ba-panel--dark` `ba-cut` `ba-btn` `ba-btn--primary`
`ba-btn--ghost` `ba-btn--yellow` `ba-badge` `ba-badge--school` `ba-badge--club` `ba-star`
`ba-star--on` `ba-tag` `ba-tabs` `ba-tab` `ba-tab.is-active` `ba-meter`（条形容器）`ba-meter-fill`
`ba-slider`（range 皮肤）`ba-acc`（手风琴）`ba-acc-item` `ba-acc-head` `ba-acc-body`
`ba-card` `ba-divider` `sec-head` `sec-head-kicker` `sec-head-title` `sec-head-sub`
`mission-tag` `hex-bg` `stripe-bg` `grid-bg` `reveal`（IO 入场初始态：opacity/translate）
`mt-app` `mt-sidebar` `mt-contact` `mt-contact.is-active` `mt-avatar` `mt-chat` `mt-msg`
`mt-msg--in` `mt-msg--out` `mt-bubble` `mt-time` `mt-typing` `v-item` `v-item.is-playing`
`gacha-overlay` `gacha-card` `toast` `toast.is-show`。

**交互态一律 class 驱动**（`:hover`/`.is-active`/`.is-open`/`.is-playing`），main.js 不写内联样式
（进度条宽度等必要数值除外，且必须走 CSS 变量）。

## 5. data.js schema（W4 严格遵守；W3 只依赖此 schema，不依赖具体数值）

```js
window.AL1S = {
  version: '1.0.0',
  model: { code:'AL-1S', base:'AL-1', name:{zh:'…',ja:'…',en:'…'} },
  profile: {                       // 单值对象，三语齐全
    name:{zh,ja,en}, reading:{zh,ja,en}, school:{zh,ja,en}, club:{zh,ja,en},
    role:{zh,ja,en}, position:{zh,ja,en}, weaponType:{zh,ja,en},
    armor:{zh,ja,en}, attackType:{zh,ja,en}, rarity:3, age:'16', birthday:{zh,ja,en},
    height:'155cm'（以研究为准）, hobby:{zh,ja,en}, cv:{zh,ja,en}, illustrator:{zh,ja,en},
    intro:{zh,ja,en},             // 游戏内自我介绍语音原文+译
    modelNote:{zh,ja,en}          // AL-1S 站点虚构设定说明（明确标注为粉丝二设）
  },
  stats: {
    levels:[1,50,80],             // 有数据的档位（以研究为准，可增删）
    byLevel:{ '1':{hp,atk,def,heal,acc,eva,crit,critDmg,cost?}, … },
    max:{…},                      // 最高档
    formulas:{hp:'…',atk:'…'}     // 若 wiki 有成长公式则给，否则 null
  },
  skills:[                        // 恰好 4 个，顺序 EX/Basic/Enhanced/Sub
    { id:'ex', slot:'EX', icon:'icon-skill-ex.svg', name:{zh,ja,en},
      cost:数字|null, desc:{zh,ja,en},
      values:{ '1':{…}, 'max':{…} },        // 各技能等级数值；键为等级字符串
      valueLabels:{zh:[…],ja:[…],en:[…]} }  // 与 values 字段一一对应的标签
  ],
  weapon:{ name:{zh,ja,en}, icon:'icon-weapon.svg', desc:{zh,ja,en},
           stats:{ '1':{…}, 'max':{…} }, statLabels:{zh,ja,en},
           skill:{ name:{zh,ja,en}, desc:{zh,ja,en} } },
  stories:[ { id, title:{zh,ja,en}, body:{zh,ja,en}, source:'official'|'summary' } ],  // ≥4 篇
  voices:[ { id, cat:'login'|'battle'|'interact'|'idle'|'gacha'|'other', jp:'日文原文',
             zh:'中文', en:'英文', note:'出处/说明' } ],   // ≥20 条
  memorias:[ { id, title:{zh,ja,en}, rarity:1|2|3, desc:{zh,ja,en}, art:'memoria-1.svg' } ], // 4-6 张
  events:[ { date:'2021-02-04', title:{zh,ja,en}, desc:{zh,ja,en}, type:'release'|'event'|'story'|'rerun' } ],
  momotalk:{
    contacts:[ { id:'alice', name:{zh,ja,en}, avatar:'avatar-alice.svg', status:{zh,ja,en} }, … ],
    threads:{ alice:[ {from:'in'|'out', text:{zh,ja,en}, time:'09:41'} ], hanako:[…], koharu:[…] },
    replies:[ '… canned reply (当前语言由调用方取 zh/ja/en 三键) …' ]  // 每条 {zh,ja,en}
  },
  quiz:{
    questions:[ { q:{zh,ja,en}, options:[ {text:{zh,ja,en}, score:0..2} ] } ],  // 5 题
    results:[ { min:0, max:20, title:{zh,ja,en}, desc:{zh,ja,en} } ]            // 按总分分档
  },
  ui:{                            // 全站静态文案。键路径即 data-i18n 值
    nav:{ profile:'…', stats:'…', skills:'…', stories:'…', voices:'…', momotalk:'…', memoria:'…', timeline:'…', quiz:'…', lang:'…' },
    boot:{ title:'…', lines:['…系统启动…'] },
    hero:{ kicker,title,sub,tagline,ctaProfile,ctaMomotalk,ctaGacha,scroll,badge1,badge2 },
    profile:{ kicker,title,sub,quoteLabel,starsLabel,modelLabel,schoolLabel,clubLabel },
    stats:{ kicker,title,sub,levelLabel,formulaLabel,barLabels:{hp,atk,def,heal,acc,eva,crit,critDmg} },
    skills:{ kicker,title,sub,tabEX,tabBasic,tabEnhanced,tabSub,costLabel,levelLabel,maxLabel },
    weapon:{ kicker,title,sub,skillLabel,statsLabel },
    stories:{ kicker,title,sub,openHint,closeHint,officialTag,summaryTag,empty },
    voices:{ kicker,title,sub,ttsHint,playing,stop,catNames:{login,battle,interact,idle,gacha,other} },
    momotalk:{ kicker,title,sub,inputPlaceholder,send,typing,clearChat,appName,appStatus },
    memoria:{ kicker,title,sub,rarityLabel },
    timeline:{ kicker,title,sub },
    quiz:{ kicker,title,sub,next,prev,restart,resultTitle,resultScore },
    gacha:{ title,sub,close,hint },
    footer:{ disclaimer,credit,fanNote,backTop,tagline },
    toast:{ missionComplete:'…' }
  }
};
window.AL1S_LANGS=['zh','ja','en'];
```
- 所有 `{zh,ja,en}` 三语必须齐全（门禁有 parity 检查）。
- 数值查不到填 `null` 并保持键存在；**禁止编造游戏数值**（研究文件为准）。
- 粉丝二设内容（AL-1S 设定、MomoTalk 虚构对话、测试题）必须可被读者识别为二创：
  modelNote/momotalk 线程标注 `source` 或在文案中明示。

## 6. main.js 模块清单（W3 全部实现，纯原生 JS，IIFE 包裹，`'use strict'`）

1. **boot**：`#boot-log` 逐行打印（`ui.boot.lines`）+ `#boot-bar` 进度 → 完成移除 `body.booting`、隐藏 `#boot`；进度数字走 `--pct` CSS 变量；`prefers-reduced-motion` 时跳过动画直接进站
2. **i18n**：`applyLang(lang)` 全量刷新（data-i18n / data-i18n-html / 列表重渲染 / `<html lang>` / localStorage / 按钮 `.is-active`）；语言按钮点击绑定
3. **nav**：平滑滚动（scroll-behavior 由 CSS 负责）+ scrollspy（IntersectionObserver 或 scroll 计算）高亮 `data-nav`；`#nav-burger` 移动端菜单开合（`.is-open`）；`#nav-progress` 阅读进度
4. **stats**：`#stat-level` 滑块（1..max，step 1）→ 在 `byLevel` 档位间**线性插值**计算各字段 →
   `#stat-bars` 渲染 `ba-meter`（宽度走 CSS 变量，过渡动画）+ `#stat-grid` 数字；`#stat-formula` 显示公式或「—」
5. **skills**：`#skill-tabs` 切换 4 技能 → `#skill-detail` 渲染名称/描述/图标/cost；`#skill-level`
   滑块（1..max）→ `#skill-values` 渲染 `valueLabels` 与当级数值；`ui.skills.maxLabel` 边界处理
6. **weapon**：渲染 `weapon.*`；等级档位切换（1/max 两个按钮或与技能共用的滑块，二选一，默认两档按钮）
7. **stories**：`#story-list` 手风琴（一次可开多个；`.is-open`；body 高度过渡；`ui.stories.*` 提示与
   official/summary 标签按 `story.source` 显示）
8. **voices**：`#voice-tabs` 按 `cat` 过滤 → `#voice-list` 渲染 `button.voice-item`；点击 →
   `speechSynthesis`（`lang='ja-JP'`，语速 0.95）朗读 `jp` 字段；播放中给 `.is-playing` 并更新
   `#voice-now`；不支持 TTS 的浏览器显示 `ui.voices.ttsHint` 提示而非静默失败；stop 按钮
9. **momotalk**：`#mt-contacts` 渲染联系人（未读小红点）；点联系人切换 `threads[id]` 渲染
   `mt-msg`（in/out 两种样式 + 时间）；`#mt-send`/回车发送 → out 消息 → `#mt-typing` 显示 0.8~1.6s →
   从 `replies` 随机取一条（按当前语言）作为 in 回复；输入为空时按钮 disabled 并 toast 提示
10. **memoria**：`#memoria-grid` 渲染卡片（art SVG 作背景 + 标题 + 描述 + 星）
11. **timeline**：`#timeline-list` 渲染 `events`（日期用等宽字体；type 映射 `mission-tag` 配色）
12. **quiz**：5 题单选 → `#quiz-progress` 进度 → 结算 `#quiz-result`（按总分取 results 档位 +
    重开按钮）
13. **gacha 彩蛋**：点 `#hero-logo` 5 次 → `#gacha-overlay.is-open`（星爆动画 + `#gacha-card`
    翻出 ★3 爱丽丝剪影卡 + confetti 粒子 canvas `#confetti-canvas`）→ `#gacha-close` 或点遮罩关闭
14. **reveal**：`.reveal` 元素 IO 触发加 `.is-in`（阈值 0.15，只触发一次；reduced-motion 直接全开）
15. **toast**：`showToast(text)` → `#toast-root` 追加 `.toast.is-show`，2.4s 后移除
16. 全部功能做**特性检测降级**（speechSynthesis 不存在、IO 不存在等），任何降级都要有可见提示，
    不许静默失效；控制台零报错（门禁）

## 7. SVG 资产清单与风格（W2 全部原创手绘，禁止描摹官方素材）

风格总纲：扁平几何 + 2px 深蓝描边（`#10203e`）+ BA 蓝黄主色 + 六边形/光环母题；
viewBox 统一、无外部字体依赖（SVG 内文字转路径或用通用几何形替代，**不内嵌字体**）；
单文件 ≤ 60KB；可加 `<title>` 无障碍名。

| 文件 | 用途 | 规格要点 |
|---|---|---|
| `hex-pattern.svg` | 区块平铺背景 | 六边形网格，浅蓝线条透明底，可 tile |
| `stripe-pattern.svg` | 斜纹背景 | 45° 蓝白斜条 |
| `grid-pattern.svg` | 科技网格背景 | 细网格+节点 |
| `logo-al1s.svg` | 站标 | 六边框+机械光环+「AL-1S」几何字 |
| `badge-millennium.svg` | 学园徽 | 原创「千年科学」风格：齿轮+电路+星 |
| `badge-cc.svg` | 社团徽 | 原创 C&C：扫帚+水滴+闪电的几何组合 |
| `halo-alice.svg` | 爱丽丝机械光环 | 圆环+四向卡扣，可作装饰浮层 |
| `alice-hero.svg` | 首屏主视觉 | **原创扁平风爱丽丝立绘**：银白短发、机械光环、黑蓝配色连衣裙、持枪姿态可抽象化；600×760 viewBox；允许几何化/剪影化处理，但须可辨认是「白发光环机器人少女」 |
| `icon-skill-ex.svg` `icon-skill-basic.svg` `icon-skill-enhanced.svg` `icon-skill-sub.svg` | 技能槽 | 统一六边形外框（ex 用黄色、basic 蓝、enhanced 青、sub 白），内部原创几何图标（爆能/连射/扫描/支援意象） |
| `icon-weapon.svg` | 专属武器 | 原创机枪剪影+光环弹匣细节 |
| `star.svg` | 稀有度星 | 蓝色空星；`star-on.svg` 金黄实星 |
| `memoria-1..6.svg` | 记忆局限卡面 | 6 张原创抽象卡面（蓝白黄主色，几何构图，体现「清扫/机器/光环」意象），300×420 |
| `avatar-alice.svg` `avatar-momoi.svg` `avatar-midori.svg` `avatar-yuzu.svg` `avatar-himari.svg` | MomoTalk 头像 | 96×96 圆形扁平脸（爱丽丝：深青双马尾+方框光环；桃：橘棕发+猫耳帽；绿：浅金发+猫耳帽；柚子：长粉发+困眼；日鞠：白长发+花饰），原创简化 |
| `favicon.svg` | 站点图标 | 六边形+光环简形 |
| `deco-corner.svg` | 面板角饰 | 左上/右上 L 形科技角（一对，可翻转复用） |

### 角色设定参考（R1/R2 研究校正后，2026-10-12）
**天童爱丽丝（天童アリス / Tendou Aris，学生 ID 10015）**：千禧年（Millennium）· 游戏开发部。
废墟中发现的来历不明少女，年龄不详，说话呆板、爱用复古游戏台词（机器人语体：「Unit
designation: Aris」「Affirmative」「Query」）。**正典依据：主线剧情有身份校验台词
`<Identity check, are you AL-1S?>`（她答「No. I am…me. I am "Aris"」）——本站名 AL-1S 即源于此。**
外观：深青灰长发双马尾、齐刘海、蓝眼；青色圆角方框形光环（取景框感）；千禧年白色连帽
外套（敞怀、黑内衬、青滚边）+黑领带+黑百褶裙+黑过膝袜+白运动鞋；肩扛巨型白色电磁炮
「光之剑：超新星」（白炮身、青色发光屏、MILLENNIUM 标记）。CV：田中美海（JP）/四白（CN）。
数值/技能以 artifacts/R1-* 与 SchaleDB 抓取数据为准（ skills：EX 平衡崩坏！/ 光啊！/ 强化魔法！/ 觉醒吧，超新星！）。

## 8. 门禁命令（编排者执行，全绿才算完成）

```bash
cd /Users/jianghaoda/.zcode/workspace/default/AL-1S
# G1 JS 语法（需 portable node；不存在则先下载，见 node-env-limitation 记忆）
node --check assets/js/data.js && node --check assets/js/main.js
# G2 HTML 结构 + 资源引用完整性 + id/契约一致性（tools/check_site.py，编排者提供）
python3 tools/check_site.py
# G3 i18n 键三方齐性（zh/ja/en 键集合一致）+ {zh,ja,en} 对象无缺语言
python3 tools/check_i18n.py
# G4 CSS 花括号/变量引用完整性（tokens 里定义的变量都被使用、无未定义 var() 引用）
python3 tools/check_css.py
# G5 本地服务 + 浏览器实测（桌面 1440×900 + 移动 390×844 截图逐段核对）
python3 serve.py 8017 &
```
Worker 侧自测：W1 用 `python3 tools/check_css.py`；W2 用 python 校验 XML well-formed +
尺寸/体积上限；W3 用 `node --check` + 在浏览器控制台零报错（编排者复验）；W4 用
`python3 tools/check_i18n.py`（schema 键存在性部分）。

## 9. 红线（所有 Worker）

1. 不编造游戏数值/官方台词——查不到就 null + 标注；二创内容必须可识别。
2. 不改别人分区的文件；不动 index.html / CONTRACT.md。
3. 链接一律**不带下划线**（悬停/点击也不带）——用户站点偏好。
4. 不上传、不 git push、不安装全局依赖；不访问付费/登录态站点。
5. 控制台零报错、零 404（本地资源全部存在）；移动端 390px 无横向滚动。
6. `prefers-reduced-motion: reduce` 时关闭大动画（至少 boot/confetti/reveal）。
7. 时间盒 45 分钟：到点先把已完成的写盘 + 写 DONE.md，不憋完美稿。
8. 完成后写 `artifacts/<W-id>/DONE.md`：改动清单（file:line）+ 自测命令与输出 + 已知问题。
