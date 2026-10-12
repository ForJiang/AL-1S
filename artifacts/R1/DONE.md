# R1 DONE — 天童アリス / Tendou Alice（Aris）游戏数据收集

完成时间：2026-10-11 ｜ 状态：**部分完成（核心战斗数据齐全）**

产出文件：
- `/Users/jianghaoda/.zcode/workspace/default/AL-1S/artifacts/R1-game-data.md`
- `/Users/jianghaoda/.zcode/workspace/default/AL-1S/artifacts/R1-data.json`
- `/Users/jianghaoda/.zcode/workspace/default/AL-1S/artifacts/R1/DONE.md`（本文件）

## ✅ 已拿到（来自 SchaleDB = schale.gg 数据源）
1. **基础档案**：日文名 天童アリス / 国际服英文名 **Tendou Aris**（重要：Global 官方译名是 Aris 不是 Alice）、千年科学学园、游戏开发部（C&C）、Striker、**后排 Back**、**武器 RG = 轨道炮（非 MG，纠正任务书假设）**、弹种 Mystic、装甲 Unarmed/轻装甲（uncertain）、★3、1年生、年龄不详、3月25日生、152cm、兴趣游戏(RPG)、CV 田中美海、画师 DoReMi、战地适性（街B/野D/室S）。
2. **数值**：Lv.1 与 Lv.100 全套（HP 1912→14630、攻 421→4212、防 68→408、治 1610→4830、命中690、闪避170、暴击230、暴伤200%、安定值1188、射程850、弹药10/1、COST回复700）。命中/闪避/暴击不随等级变化。
3. **四技能 + 武器被动**：全部中日英名称、原文描述、COST、各级数值（Lv.1/5/10 或 EX 的 Lv.1-5）、图标代号与初步图标描述。
4. **专属武器**：光の剣：スーパーノヴァ / Supernova: The Sword of Light，中日英描述，Lv.1/Lv.100 数值（攻185/HP425 → 攻1850/HP4254）。
5. **语音 56 条**：Normal 16 / Battle 28 / Lobby 12，日文原文 + 英文翻译（Event 分类为空）。

## ❌ 未拿到（原因）
- **Lv.50 / Lv.80 数值表 + 成长公式**：SchaleDB 只发布 Lv.1/Lv.100；bluearchive.wiki（唯一有全等级表的源）本环境 403。
- **羁绊故事（絆ストーリー）正文**：bluearchive.wiki / fandom 均不可达（403 / 连接超时）。
- **语音图标描述**：仅有图标代号（如 SKILLICON_ARIS_PUBLICSKILL），无画面核实。
- **卡池首发日期 / 活动大事件列表 / Memoria 列表**：均依赖 bluearchive.wiki，不可达。已知：**常驻非限定（IsLimited=0）**。
- **简体中文国服译名**：未经官方源核实（标 uncertant，暂用「天童爱丽丝」）。

## 环境限制说明
本环境对 bluearchive.wiki（403 Cloudflare）、schale.gg（503）、fandom（超时）、game8/altema（403）、wikiwiki.jp（超时）、archive.org（超时）均不可达；仅 GitHub raw/api、gamerch.com、gamewith.jp 可达。故改用 **SchaleDB GitHub 数据仓库**（schale.gg 同源数据，社区维护并与 wiki 互相校对）作为主源。所有数值为单一源（SchaleDB），未经第二源交叉验证——引用前建议在有外网的环境用 bluearchive.wiki/wiki/Alice 复核 Lv.50/80 与故事/语音。

## 主要来源 URL
- https://github.com/SchaleDB/SchaleDB
- https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/data/{en,jp}/students.json
- https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/data/{en,jp}/voice.json
- https://schale.gg/char?char=alice （同源网页版，本环境 503）
