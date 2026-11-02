# W3-DONE — English (en) 词典

- 状态：DONE
- Worker：W3（en）
- 日期：2026-11-02

## 产出

- 整文件重写 `lib/i18n/en.ts`：移除 STUB 占位（grep "STUB" 计数为 0），按 zh-CN 基准逐条翻译，元素按位置一一对应（basics 9 / combat 7 / personality 2 / story 5 / skills 4 / relationships 4 / gallery.alts 6），无增删调序。
- 未改动 types.ts / zh-CN.ts / config.ts / 页面代码。

## 自测

命令（真实执行）：

```
cd /Users/jianghaoda/.zcode/workspace/default/AL-1S && export PATH="$HOME/local/node/bin:$PATH" && npx tsc --noEmit 2>&1 | grep "en.ts" ; echo "grep_exit=$?"
```

输出：

```
grep_exit=1
```

判定：grep 无输出（grep_exit=1）→ en.ts 类型全绿。
补充：整仓 `npx tsc --noEmit` 退出码 0、无任何输出，其他文件也无报错。

## 术语执行

- 全部按指定术语表：Tendou Aris / Millennium Science School / Game Development Department / Apprentice Hero / Momoi, Midori, Yuzu / Key / Rio / Sensei / Seminar / Kivotos / the unnamed priest / princess of the unnamed god / Blue Archive / Striker / Attacker/Back / AR (Assault Rifle) / Mystic / Special (Special Armor) / ⭐⭐⭐ (3-star) / Burst Damage。
- skills.items 的 type 与 name 逐字照抄官方英文：EX Skill / Normal Skill / Passive Skill / Sub Skill；Full Burst Time / Continuous Attack / Experience Points / Critical Hit。
- hero.titleLines = ["Tendou", "Aris"]；subtitle = "天童アリス"（按约定用日文原名副署）。

## uncertain 术语清单

none

## 译名选择备注（非 uncertain，仅备案）

1. basics[0]（全名）基准值为「日文名（中文译名）」双写，英文取 "Tendou Aris (天童アリス)"：主位用英文官名、括注日文原名；basics[1]（英文名）照常直译为 "English Name: Tendou Aris"，与基准结构逐条对应。
2. combat 的 Striker / Attacker/Back / Mystic 按术语表只保留英文官名，未保留中文括注（AR 与 Special 因术语表本身含括注而保留）。
3. relationships[0].desc 中「选择职业」按 RPG 语境译为 "choose her own class"。
4. quote.attribution 译为 "Tendou Aris · AL-1S"（约定仅固定 hero.subtitle 用日文原名，此处按英文页惯例翻译）；footer.copyright 保留日文原名作括注 "Tendou Aris (天童アリス)"。
5. 全文引语使用英文弯引号 "…"（含 quote.text 与正文内引用词）。
