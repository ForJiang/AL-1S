# W1-DONE：zh-TW 词典

## 状态
完成。`lib/i18n/zh-TW.ts` 已整文件重写为台湾繁体译文，与 zh-CN 基准逐位置对齐
（basics 9 行、combat 7 行、personality 2 段、story 5 段、skills 4 条、relationships 4 条、gallery.alts 6 条），
无增删、无调序，无 "STUB" 残留。仅写入本文件与 zh-TW.ts，未触碰其他任何文件。

## 自测
命令：
```
cd /Users/jianghaoda/.zcode/workspace/default/AL-1S && export PATH="$HOME/local/node/bin:$PATH" && npx tsc --noEmit 2>&1 | grep "zh-TW" ; echo "grep_exit=$?"
```
输出：
```
grep_exit=1
```
判定：grep 无输出（grep_exit=1），zh-TW.ts 类型全绿。
附加核查：完整 `npx tsc --noEmit` 退出码 0、零输出（全项目无任何报错）；
`grep -c "STUB" lib/i18n/zh-TW.ts` 无匹配（无残留占位字样）。

## 关键译名选择（按术语表执行）
- 天童アリス/天童爱丽丝→天童愛麗絲、蔚藍檔案、千年科學學園、遊戲開發部、見習勇者、桃井/綠/柚子、
  Key（凱）、Rio（里緒）、老師（Sensei）、研討會、基沃托斯、無名祭司、無名神的公主
- combat 行照表：Striker（前衛）、Attacker/Back（攻擊/後排）、AR（突擊步槍）、Mystic（神秘）、
  Special（特殊裝甲）、⭐⭐⭐（三星）、爆發輸出
- skills.items 的 type/name 保留英文原文（EX Skill / Normal Skill / Passive Skill / Sub Skill、
  Full Burst Time / Continuous Attack / Experience Points / Critical Hit）
- 台湾用语：身分、透過、程式設計、基本資料、興趣、結結巴巴、腳踏車、經驗值、羈絆、辨識出
- quote.text 用「」；全角标点；数字/日期照源文（3月25日、152cm、⭐⭐⭐）
- 判断题：basics「全名」值保留日文原名写作「天童アリス（天童愛麗絲）」，与 zh-CN 基准
  「天童アリス（天童爱丽丝）」结构一致（原名 + 中文译名的资料行）；正文中的称呼一律作「天童愛麗絲」。

## uncertain 清单
- none（术语表未覆盖处均已按台湾通用译法处理，见上「关键译名选择」；无拿不准项）
