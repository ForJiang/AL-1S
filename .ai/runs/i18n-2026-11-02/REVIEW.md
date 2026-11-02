# 对抗复核报告：四语言 i18n 词典（2026-11-03）

复核者：只读对抗复核 Agent（独立上下文，逐位置比对 + 目验图片 + tsc 实跑）

## 结论：P0 = 0，P1 = 2，P2 = 1 —— 全部处置完毕

## P1：alt 与图片内容错位（影响四语言）—— 已按逐张实读修正

- 复核发现：`story.imageAlt` 与画廊 alt 存在与图片内容不符。复核员的具体诊断
  （story=紧张立绘 ✓、g1=猫耳摸头）部分正确部分错误：编排者随后**逐张单独实读**
  8 张图建立铁证映射——story=紧张立绘、g1=战斗、g2=猫耳摸头、g3=觉醒特写、
  g4=害羞低头、g5=海边自行车、g6=湖畔冬装。
- 真实错位有两处：`story.imageAlt`（原写成猫耳摸头）与画廊 `alts[0]/alts[1]`
  （原 [猫耳摸头, 战斗]，应为 [战斗, 猫耳摸头]）。
- 处置：四份词典将 story.imageAlt 改为紧张立绘描述，alts[0]/alts[1] 互换。
  浏览器画廊截图复核与实读映射一致。
- **教训（写入记忆）**：图片↔文案对照必须逐张单读定锚；批量并行读图后凭顺序
  凭印象配对极易错位——编排者与对抗复核 Agent 各错了一次，且方向不同。

## P2：zh-TW 白名单字段偏离（unconfirmed）→ 判定为符合设计

- 复核发现：zh-TW 的 hero.titleLines / attribution / copyright 用「天童愛麗絲」，
  而 zh-CN/ja 保留「天童アリス」；zh-TW basics[0] 又保留「天童アリス（天童愛麗絲）」。
- 裁定：符合设计。编排者冻结接口时即规定 zh-TW `titleLines=["天童","愛麗絲"]`、
  `meta.title="天童愛麗絲 - Tendou Aris"`（TW 服官方译名为「愛麗絲」，zh-CN/ja 保留
  日文原名属两语言惯例）。basics[0] 是「官方全名」资料行，保留原名括注正确。
  zh-TW 页内部一致，不构成缺陷。

## 通过项（全绿）

1. 位置对齐：basics 9 / combat 7 / personality 2 / story 5 / skills 4 / relationships 4 /
   alts 6 四语言逐位对齐；tsc 定长元组静态兜底 exit 0。
2. 漏译/未译：四语言值内无残留简体（strict Unicode 扫描）；头部注释含简体不在范围。
3. 白名单字段：skills type/name 四语言逐字一致；en hero.subtitle 保留「天童アリス」。
4. STUB 残留：无。
5. 数值/事实：152cm、3月25日/March 25、⭐⭐⭐/星3/3-star、AL-1S、第二卷第二章、
   EX卷/EX編/EX volume 各语言内部一致，无第三种说法。
6. 术语：zh-TW（千年科學學園/遊戲開發部/見習勇者/蔚藍檔案/研討會等）、
   ja（ミレニアムサイエンススクール/ゲーム開発部/見習い勇者/キヴォトス/セミナー等）、
   en（Millennium Science School/Game Development Department/Apprentice Hero/
   Kivotos/Seminar/Sensei 等）全部命中。
7. 页面接线：[lang]/page.tsx 消费词典全部键，无死键、无硬编码文案。
8. 根跳转：detectLang 对 zh-Hant-TW/zh-HK/zh-Hans/ja-JP/en-US 等分支正确，
   LANGS 四链接齐全。

## 复核附带发现（编排者处置记录）

- ja combat[0] 标签「タイプ」vs zh-CN「职业」：同属性本地化措辞，不计缺陷。
- app/layout.tsx 根 html lang 固定 zh-CN 由内联脚本修正：已知设计。
