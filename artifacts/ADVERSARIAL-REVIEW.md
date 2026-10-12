# AL-1S 对抗复核报告（R-ADV · 只读审计）

- 审计时间：2026-10-12 ｜ 审计者：R-ADV（对抗复核 Worker，只读，未修改任何项目文件）
- 审计对象：`/Users/jianghaoda/.zcode/workspace/default/AL-1S/`（蔚蓝档案·天童爱丽丝主题粉丝站，纯静态三语）
- 审计方法：
  1. 全量静态核对：CONTRACT.md / index.html / main.js(1737 行) / data.js / 6 个 CSS / artifacts/R1-game-data.md
  2. 脚本化核对：main.js 全部 `qs('#id')` 引用 vs index.html；main.js 全部 `getPath` 数据路径 vs data.js；index.html 全部 data-i18n 键 vs data.js；全部资源引用（HTML/CSS url()/data.js SVG/字体）存在性
  3. 集成测试：本环境 subagent 不支持浏览器自动化（control-browser 返回 "Browser is not available in subagent"），改用 Node + 自建最小 DOM shim **加载真实 index.html + data.js + main.js** 跑 89 条断言（boot / 三语切换 / stats 插值 / 技能 / 武器 / 手风琴 / 语音 / MomoTalk / 年表 / quiz / 彩蛋 / 导航），结果 **88 过 1 败**（唯一失败即下方 P1-1）
  4. 门禁复跑：G1 node --check / G2 check_site / G3 check_i18n / G4 check_css / check_js_classes 全部通过

---

## 发现列表

### P1-1 ｜ `#story-empty` 空态显隐逻辑反转——有故事时反而显示"暂无章节数据。"

- 严重度：**P1（明显缺陷，全语种全设备必现）**
- 证据：
  - `assets/js/main.js:815`：`setVisible(empty, stories.length > 0);`
    `setVisible(el, visible)` 的语义是 `el.hidden = !visible`（main.js:92-96），因此 stories 有 6 条时 `visible=true` → **空态被显示**；逻辑恰好反了。
  - 集成测试实测（真实 data.js，6 条 stories）：`#story-empty.hidden === false`、`style.display === ''`，即页面在 6 个手风琴项下方会渲染出 `ui.stories.empty`（"暂无章节数据。"）虚线空框。
  - 放大因素：`#story-empty` 带 `data-i18n="ui.stories.empty"`（index.html:241），切换日/英时错误空态文案还会跟着变。
- 修复建议：main.js:815 改为
  `setVisible(empty, stories.length === 0);`
  （一行改动；W3 DONE.md §1-7 自称"stories 为空 → 显示 #story-empty"，实现与自述相反。）

### P2-1 ｜ 彩蛋 `is-run` 类是死代码（动画重放意图静默失效）

- 严重度：P2（当前无视觉影响，属埋雷）
- 证据：main.js:1588-1595 对 `#gacha-card`/`#gacha-burst` 做 `classList.remove('is-run'); void offsetWidth; classList.add('is-run')` 以重放动画，但 `grep -rn "is-run" assets/css/` **零命中**——全站没有任何 `.is-run` CSS 规则，该类名切换不产生任何效果。目前演出仍正常，是因为 overlay 从 `display:none→grid` 时 CSS 动画自然重启（`[hidden]{display:none!important}`，base.css:25）。
- 修复建议：二选一——(a) 删掉 is-run 相关四行，依赖 display 切换重启动画；(b) 在 components.css 补 `.gacha-card.is-run{animation:ba-pop-in .55s var(--ease-pop) both}` 等规则，使意图真实生效。

### P2-2 ｜ 彩蛋语音 `speakIntro` 语言与嗓音不匹配

- 严重度：P2
- 证据：main.js:1563-1576 `speakIntro()` 朗读 `T(profile.intro)`（当前 UI 语言，默认中文）却设 `u.lang = 'ja-JP'`。中文/英文界面下触发招募彩蛋，会用日语嗓音读中文/英文文本（发音怪异或静默回退）。
- 修复建议：改为读日文原文 `let text = (data().profile || {}).intro; text = (text && text.ja) || T(text);`（与语音区一律读 `jp` 字段的做法一致）。

### P2-3 ｜ EX 技能滑块可拖到 Lv.6–10，显示 Lv.5 数值 + "已满级 · Lv.N"

- 严重度：P2（文案与行为不一致）
- 证据：main.js:672 `let maxLv = Math.max(10, probe.max);`——EX 数据仅 1–5 档（data.js:90），滑块上限被抬到 10；拖到 6–10 时 `skillValueRow` 回落 `values['5']`=591 并追加"已满级 · Lv.10"备注（main.js:706-709）。而 `ui.skills.sub` 明言"EX 技能上限 5 级，其余 10 级"（data.js:606-608），用户拖过 5 会看到标注自相矛盾的界面。
- 修复建议：滑块上限改为 `Math.max(1, probe.max)` 或 `probe.max`（数据缺档时再回落 10），使 EX 停于 Lv.5。

### P2-4 ｜ 启动日志三语不齐

- 严重度：P2
- 证据：data.js:545-553 `ui.boot.lines` 为 7 条纯英文串（CONTRACT §5 schema 允许字符串，故不违约）；但 ja/zh 界面下开机画面仍是英文日志，与"三语即时切换"的站点承诺有落差。
- 修复建议：将 lines 改为 `{zh,ja,en}` 对象并由 runBoot 按 `state.lang` 取值，或明确接受为"终端 BIOS 恒英文"的设计决策并在 DONE 备案。

### P2-5 ｜ 契约位置漂移：`#profile-school` / `#profile-club`

- 严重度：P2（文档一致性）
- 证据：CONTRACT §3 规定二者"内含于 `#profile-card`"，实际在 `#hero-badges` 的 img 上（index.html:88-89）。main.js 全程不引用这两个 id，**无功能影响**。
- 修复建议：编排者修订 CONTRACT.md 措辞，或把 id 挪进 profile-card（需动 index.html，归编排者）。

### P2-6 ｜ 冗余/无消费方项（无害，登记备查）

- `[hidden]{display:none!important}` 在 base.css:25 与 integration.css:17 重复定义（后者为合并期补丁，功能正常）。
- `ui.nav.lang`、`ui.stats.formulaLabel`、`ui.weapon.statsLabel` 三个 ui 键无任何消费方（W3 DONE.md §3.2 已自报）。
- `#stat-level` 静态 `max="80"`（index.html:159）与数据 levels [1,100] 不一致，init 时被 JS 覆写为 100，仅 boot 期间若被看到会有瞬间不一致（body.booting 锁滚动，实际不可见）。

### P2-7 ｜ quiz 允许跳过未答题直接结算

- 严重度：P2（可选打磨）
- 证据：main.js:1479-1481，最后一题点 next 即 `quizDone=true` 结算，未答题目按 0 分计入（quizScore 跳过 undefined）。进度条只显示"已答数"，不阻止提交。
- 修复建议：如需强制作答，可在 `state.quizIdx === total-1 && quizAnsweredCount() < total` 时禁用 next 并 toast 提示；或维持现状（多数趣味测试允许跳过）。

### P2-8 ｜ 工具缺陷：check_site.py 的"ui 键未被引用"WARN 全量误报

- 严重度：P2（工具问题，非站点问题；但会误导编排者）
- 证据：tools/check_site.py:90-95 以叶子路径（如 `ui.nav.profile.zh`）做 `p not in used and p not in mainjs` 比对，而 HTML 的 data-i18n 只写到 `ui.nav.profile`（无语言叶子），导致 **所有 ui 叶子键都被 WARN**（本次输出上百条）。G2 仍判通过（仅 warning）。
- 修复建议：比对时去掉末段语言叶子（`.zh/.ja/.en`）后再查 `used` 集合。

---

## 验证通过项（无发现）

1. **静默失效类排查（最高优先级）——未发现 P0**：
   - main.js 引用的 **60 个 DOM id 全部存在于 index.html**（脚本核对，0 缺失）。
   - main.js 的 13 处 `getPath(d,'字面路径')` + 模板路径（`ui.stats.barLabels.*` 等）**全部可在 data.js 解析**；index.html 的 **85 个 data-i18n 键全部有对应数据**。
   - `momotalk.threads` 的 5 个 id 与 `contacts` 的 5 个 id **完全对应**；6 个 `memorias[].art`、10 个 data.js SVG 引用、18 个 HTML 资源、9 个字体文件、3 个 CSS url() 平铺图**全部存在（零 404 风险）**。
   - 集成测试实测渲染值抽查：zh/ja/en 三语下 hero 标题、导航、语音页签（ALL/すべて）、MomoTalk placeholder、技能页签（Passive/パッシブ）、quiz 按钮（查看结果/結果を見靠）等均正确落地。
   - check_js_classes.py 报的 27 个"CSS 缺失"类名经人工复核**全为误报或已被其他选择器覆盖**（16 个是属性/localStorage 键；`boot-line`→`#boot-log > *`；`quiz-progress-fill`→`.quiz-progress > *`；`quiz-next/quiz-restart`→`.ba-btn`；`skill-values-head/body`→table th/td；`mission-tag--`/`timeline-item--` 为前缀匹配，四色变体在 CSS 中存在）。唯一真实"无规则"的是 P2-1 的 `is-run`。
2. **数据准确性（对照 artifacts/R1-game-data.md）——全部一致**：
   - stats：HP 1912/14630、攻 421/4212、防 68/408、治 1610/4830、命中 690、闪避 170、暴击 230、暴伤 200%（两档不变）✓
   - 技能：EX 311→591、基础 17→32.3、强化 14→26.6、辅助 12.1→22.9、武器被动 +506/+14%→+960/+26.6% ✓
   - 武器：Lv.1 攻 185/HP 425 → MAX 1850/4254 ✓
   - profile：身高 152cm、生日 3月25日、年龄 ??、CV 田中美海/四白、画师 DoReMi、RG 轨道炮、特殊装甲、神秘弹种、Striker/后方 ✓
   - （备注：R1/DONE.md 曾记装甲"uncertain"，v2 校正稿与 data.js 定为"特殊装甲/Special"，以 v2 稿为准，非缺陷。）
3. **契约/红线**：
   - 链接全站无下划线（base.css:112-128，含 hover/visited）✓
   - `prefers-reduced-motion`：base.css:446-481 全局降级 + main.js 四处跳过（boot 动画 217 行、confetti 1506 行、reveal 1653 行、back-top auto 359 行）✓
   - `[hidden]` 元素确实不可见（`[hidden]{display:none!important}` 双规则 + main.js setVisible 双保险）✓
   - 三语齐性：check_i18n 678 字段通过；集成测试三语循环切换后静态+动态内容全部刷新，`<html lang>`/localStorage/按钮态正确 ✓
   - 控制台：集成测试全程 **0 console.error、0 render 失败 warn**（真实浏览器未能实测，见方法论限制）✓
   - 移动端 390px：静态核查（body overflow-x:hidden、section overflow:clip、960/860/768/720/520/400/390 七档断点、mission-tag 换行、mt-inputbar wrap）未发现溢出风险，但**未经真实浏览器实测**。
4. **交互完整性（集成测试 88 断言通过）**：boot 逐行+100%+解锁；stat 滑块插值（Lv.50 HP=8207=round(1912+(14630-1912)×49/99)）；技能 4 页签+等级（EX 311/basic 17→32.3/sub 12.1→22.9）+超档备注；武器 Lv.1/MAX 切换+is-active；故事手风琴展开/aria；语音 7 页签过滤（login=3）+无 TTS 时 toast 可见降级（非静默失败）；MomoTalk 发送/typing 0.8–1.6s/自动回复/切换联系人/未读清零/清空保留首条 in；memoria 6 卡+--art 注入；timeline 5 条+type 配色；quiz 五题全流程+分档（3/10→准机器人）+重开；彩蛋 logo 5 连击/CTA 直触发/遮罩关闭/confetti 绘制/toast；回到顶部 scrollTo；scrollspy 高亮+进度条 --pct。
5. **各 Worker DONE.md 自报已知问题复查**：MomoTalk 清空策略（保留首条 in，无则补"……"）、quiz 已答可 prev 回改、TTS onend 不可靠的兜底计时器、彩蛋朗读不抢占语音——均如实存在且与描述相符；W2 删除的 avatar-hanako/koharu **未被 data.js 引用**（无死链）；W1 自报 7 项均为设计决策非缺陷。

---

## 方法论限制（声明）

- 本 subagent 环境**不支持浏览器自动化**（control-browser 技能返回 "Browser is not available in subagent"），因此"浏览器打开读 console / 截图 / 390px 实测 / TTS 实际发声"未能执行；上述结论来自真实文件的 Node 集成测试（DOM shim 忠实实现了 id/类/属性/事件冒泡/CSS 变量写入）与全量静态核对。
- 建议编排者发布前在真实浏览器补跑：console 零报错、390px 无横向滚动、TTS 发声、reduced-motion 实际降级四项 G5 抽查。

---

## 总体结论

**需修复后发布（一行 P1 + 建议顺手处理 P2-1/P2-2）。**

- **P0：0 条**（未发现"代码存在但永不生效/数据取不到/选择器打不中"类静默失效）
- **P1：1 条**（P1-1 `#story-empty` 显隐反转，所有语种必现错误空态）
- **P2：8 条**（P2-1 is-run 死代码 / P2-2 彩蛋语音语言不匹配 / P2-3 EX 滑块越界 / P2-4 boot 日志单语 / P2-5 契约位置漂移 / P2-6 冗余项 / P2-7 quiz 可跳答 / P2-8 门禁工具误报）

项目整体质量高：门禁全绿、数据与研究稿完全一致、三语与红线遵守良好、88 项交互断言通过。P1-1 为 main.js:815 的一行条件反转，修复后即可发布；P2 项可在后续迭代处理。
