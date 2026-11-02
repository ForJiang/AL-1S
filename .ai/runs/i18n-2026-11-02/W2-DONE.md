# W2-DONE — ja 词典

状态：完成。lib/i18n/ja.ts 已整文件重写为日本語词典，按 zh-CN 基准逐位置对齐（basics 9 行、combat 7 行、personality 2 段、story 5 段、skills 4 条、relationships 4 条、gallery.alts 6 条），无 STUB 残留，未触碰其他文件。

## 自测命令与输出

```
$ cd /Users/jianghaoda/.zcode/workspace/default/AL-1S && export PATH="$HOME/local/node/bin:$PATH" && npx tsc --noEmit 2>&1 | grep "ja.ts" ; echo "grep_exit=$?"
grep_exit=1
```

grep 无输出、grep_exit=1 → ja.ts 类型全绿。附带验证：`npx tsc --noEmit` 全项目零报错（exit 0）；`grep -c "STUB" lib/i18n/ja.ts` → 0。

## 关键译名选择（均按术语表 / 日服官方表记）

- 天童アリス、ミレニアムサイエンススクール、ゲーム開発部、見習い勇者、モモイ/ミドリ/ユズ、キー、リオ、先生（センセイ）、セミナー、キヴォトス、名もなき司祭、名もなき神の姫、ブルーアーカイブ、ストライカー、アタッカー/バック、AR（アサルトライフル）、神秘、特殊装甲、⭐⭐⭐（星3）、火力特化、レトロゲーム、経験値
- 光环 → ハロー（日服官方）
- 暴击 → クリティカル（日服官方）
- skills.items 的 type / name 全部逐字保留英文原文（EX Skill / Full Burst Time 等）
- quote.text 使用「」：「私は見習い勇者、仲間とともに進む勇者なのだ」

## 适配说明（非虚构，仅本地化手法）

- basics[0] 全名值：zh 基准为「天童アリス（天童爱丽丝）」（片假名+中文写法并记）；日语中二者本就同形，故采用「天童アリス（てんどう ありす）」（假名读音并记），避免与下一行「英語名 Tendou Aris」重复。
- combat 标签：职业 → タイプ、定位 → ポジション（日服攻略站对 Striker/Special 与 Attacker/Back 的惯用栏位名）；社团 → 部活（值是 ゲーム開発部）。
- EX卷 → EX編（日语更自然的分卷写法）。

## uncertain 清单

- basics[0] 全名值改为假名读音并记（上述适配，无法从基准直接直译，如需改为纯「天童アリス」请编排者裁定）
- combat[0]/[1] 标签用 タイプ / ポジション（日服无单一官方栏目名，取攻略站惯用）
- relationships[1].desc 中 EX卷 → EX編 的写法

其余术语均有官方表记依据，uncertain: 无硬性不确定项（以上三条为风格取舍，已标注）。
