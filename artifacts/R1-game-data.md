# R1 研究产物（v2 校正版）——天童爱丽丝游戏数值

> **校正记录（2026-10-12，编排者）**：v1 误将角色识别为「遊丸アリス（游戏开发部废墟少女）」并标注译名
> "Tendou Aris 而非 Alice"存疑。经三服数据 + 官方立绘 + 剧情台词交叉验证：**天童アリス 就是
> 机器人语体少女本人**（"Unit designation: Aris"），所属确为千禧年·游戏开发部，国际服官方译名
> **Tendou Aris**（短名 Aris），国服译名**天童爱丽丝**。v2 按三服数据重建，数值与技能以
> SchaleDB 为准。

## 数据源
- 主源：https://github.com/SchaleDB/SchaleDB （`data/{jp,cn,en}/students.min.json` + `localization.json`，为 schale.gg 的数据源，社区广泛交叉验证）
- 剧情台词：https://github.com/wanony/BlueArchiveDataset （`Formatted/Characters/[aris].txt`，Global 官方英文本）
- **不可达**：bluearchive.wiki（Miraheze 反爬 403）、schale.gg（503）、fandom（超时）、game8（403）、altema。故羁绊故事正文、语音原始音频文本、卡池首发日期、活动列表、Memoria 官方数据未取得，均按 null/不确定处理，未编造。

## 1. 基础档案
| 字段 | 日本語 | 简体中文 | English |
|---|---|---|---|
| 姓名 | 天童アリス | 天童爱丽丝 | Tendou Aris |
| 短名 | アリス | 爱丽丝 | Aris |
| 学园 | ミレニアムサイエンススクール | 千禧年 | Millennium |
| 社团 | ゲーム開発部 | 游戏开发部 | Game Development Department |
| 职能 | STRIKER / アタッカー | 突击 / 输出 | STRIKER / Dealer |
| 站位 | 後方 | 后方 | Back |
| 武器 | RG（レールガン） | 电磁炮 | RG (railgun) |
| 弹种 | 神秘 | 神秘 | Mystic |
| 装甲 | 特殊装甲 | 特殊装甲 | Special |
| 稀有度 | ★3 | ★3 | ★3 |
| 年级 | 1年生 | 1年级 | 1st Year |
| 年龄 | ??歳 | ？？岁 | Unknown |
| 生日 | 3月25日 | 3月25日 | March 25 |
| 身高 | 152cm | 152cm | 152cm |
| 兴趣 | ゲーム（特にRPG） | 游戏（RPG） | Video games (RPGs) |
| CV | 田中美海 | 四白 | Minami Tanaka |
| 画师 | DoReMi | DoReMi | DoReMi |
| 装备槽 | Hat / Hairpin / Charm | 同 | 同 |
| 地形适配 | 市街B / 室外D / 室内S | 同 | 同 |

自我介绍（ProfileIntroduction）三服原文见 `R1-data.json` 的 `profile.intro`。
国服版：「千禧年游戏开发部的成员。在废墟发现的来历不明的少女，无法查到包括年龄在内的所有情报。
一直跟着桃和绿打游戏的她，已经成了重度游戏迷。原本说话很呆板，但现在常常用复古游戏的台词代替。」

## 2. 数值（SchaleDB 仅公开 Lv.1 / Lv.100 两档；成长公式未公开）
| 字段 | Lv.1 | Lv.100 |
|---|---|---|
| HP | 1912 | 14630 |
| 攻击力 | 421 | 4212 |
| 防御力 | 68 | 408 |
| 治疗力 | 1610 | 4830 |
| 命中 | 690 | 690 |
| 闪避 | 170 | 170 |
| 暴击 | 230 | 230 |
| 暴击伤害 | 200% | 200% |
| 稳定值 | 1188 | 1188 |
| 射程 | 850 | 850 |
| 弹匣量 | 10 | 10 |
| 弹耗 | 1 | 1 |
| 回复COST | 700 | 700 |

## 3. 技能（五槽；autoattack 为普攻不进面板）
| 槽位 | 日文 | 中文 | English | COST |
|---|---|---|---|---|
| EX | 世界の 法則が 崩壊します！ | 平衡崩坏！ | Balance Breakdown | 6 |
| 基础 | 光よ！ | 光啊！ | Blinding Light! | — |
| 强化 | 強化魔法です！ | 强化魔法！ | Enhanced Magic! | — |
| 辅助 | 覚醒せよ、スーパーノヴァ！ | 觉醒吧，超新星！ | Supernova Awakening! | — |
| 武器被动 | 強化魔法です！+ | 强化魔法！+ | Enhanced Magic!+ | — |

- EX「平衡崩坏！」：直线范围敌人，攻击力 311%→591%（技能1→5），依能量充能阶段 1.5×/2× 增伤。
- 基础「光啊！」：每 25 秒暴击 +17%→32.3%（20 秒），并为能量充能 1 阶段（上限 2）。
- 强化「强化魔法！」：攻击力 +14%→26.6%。
- 辅助「觉醒吧，超新星！」：EX 发动时暴击 +12.1%→22.9%（20 秒），依充能阶段 1.5×/2×。
- 武器被动「强化魔法！+」：攻击力 +506→960，且再 +14%→26.6%。
各级完整数值（Parameters）见 R1-data.json `skills[].parameters`。

## 4. 专属武器
- 光の剣：スーパーノヴァ / 光之剑：超新星 / Supernova: The Sword of Light
- 描述（中）：「工程部转让给爱丽丝的巨型电磁炮。重量和输出极为惊人，是普通女生携带起来都会非常困难的程度。」
- 地形适配：室内 S；Lv.1 攻 185 / HP 425；Lv.100 攻 1850 / HP 4254。

## 5. 换装与关联
- 10066 アリス（メイド）/ 爱丽丝（女仆）/ Aris (Maid)：同为游戏开发部，RG，CV 同。
- SSRnew 招募台词（JP）：「……その声に喚ばれる時を、ずっと待っていました」

## 6. 正典出处：AL-1S（本站名来源）
官方剧情台词（Global 文本，wanony 数据集 [aris].txt）：
```
<Identity check, are you AL-1S?>
Hmm?
No. I am…me. I am "Aris"
…
Computer, do you know about Al-1S
```
即：游戏中存在对「AL-1S」的身份校验，爱丽丝回答「不，我就是我，我是爱丽丝」。
本站 AL-1S 的概念由此延伸（终端/机体编号的二创框架），已在页面明示为粉丝二设。

## 7. 未取得（留空，不编造）
羁绊故事全文、语音原始文本（仅有剧情台词）、卡池首发日期、活动/复刻列表、官方 Memoria 数据、
好感度加成细则（数值有，展示未做）、Lv.50/80 中间档数值与成长公式。
