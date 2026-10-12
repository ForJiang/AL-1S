# W2 DONE — 全套原创 SVG 美术资产（AL-1S）

完成时间：2026-10-11 ｜ 分区：`assets/img/`（仅此目录，未触碰其他 Worker 文件）

## 交付清单（26 个文件，全部原创手写 SVG，无位图/无外链/无字体内嵌）

### 背景图案类（3，浅色线条、透明底、可无缝平铺）
| 文件 | 设计说明 |
|---|---|
| `hex-pattern.svg` | 平顶六边形网格：内部 `<pattern>`（patternUnits="userSpaceOnUse"，单元 60×34.64 = 真晶格周期），stroke #9ad8ff / 1.5px / 透明填充，viewBox 0 0 120 104，平铺严格无缝 |
| `stripe-pattern.svg` | 45° 斜条：`<pattern>` 宽高 28（两条 14px 带）+ patternTransform="rotate(45)"，白 #ffffff 与蓝 #c8e8ff 交替，viewBox 0 0 40 40 |
| `grid-pattern.svg` | 科技网格：直接画满一个 60×60 单元（线在 0/30/60 边界互补成整线），细线 #b9d4f2 1px + 交叉点圆 #6fc0f7 |

### 标识徽章类（5）
| 文件 | 设计说明 |
|---|---|
| `logo-al1s.svg` | 站标：平顶六边框（#e4f2ff 填充 + 6px 深蓝描边 + 内层浅蓝细边），框内机械光环（#ffd94a 圆环 + 四向梯形卡扣 + 中心六边形），下方等宽几何字「AL-1S」（A 三角+横杠 / L 竖+横 / 连字符 / 1 竖+斜头+基座 / S 双弧，全部 4px 深蓝圆角线条） |
| `badge-millennium.svg` | 千年科学学园徽：12 齿齿轮外环（深蓝齿）+ 内环电路折线（#2f8fe8，8 个节点圆）+ 中心四角星（#ffd94a） |
| `badge-cc.svg` | C&C 徽：盾形底（白填充深蓝描边 + 浅蓝内边），几何扫帚（斜柄 + 梯形刷毛 + 3 道刷线）+ 蓝色水滴 + 黄色小闪电 |
| `halo-alice.svg` | 爱丽丝机械光环：白填充圆环（深蓝 6px 描边 + 内缘 3px 线）+ 四向黄色卡扣 + 45° 机械铆点 4 颗 + 环内小六边形，可单独作装饰浮层 |
| `deco-corner.svg` | 科技角饰（左上形态）：深蓝粗 L + 亮蓝 #4aa8f0 细 L 双层 + 浅蓝刻度短线 + 角点圆，页面用 CSS transform 翻转复用 |

### 技能/武器图标类（5，统一 96×96 六边形外框，深蓝描边 + 浅色内底）
| 文件 | 设计说明 |
|---|---|
| `icon-skill-ex.svg` | EX 技能：外框 #ffe886 内底 + #ffc93c 光环，中心圆 + 8 颗放射三角（爆能意象） |
| `icon-skill-basic.svg` | 基础技能：#e4f2ff 内底 + #2f8fe8 光环，三颗并行胶囊弹丸 + 三条速度线（连发射击） |
| `icon-skill-enhanced.svg` | 强化技能：#e4f2ff 内底 + #54e3ff 准星（圆环+四刻度+中心点）+ 两层扫描弧波 |
| `icon-skill-sub.svg` | 辅助技能：白内底 + 白色光环圈（辅以 1px 深蓝定界），8 齿齿轮 + 带四卡扣点的小光环（支援意象） |
| `icon-weapon.svg` | 专属武器（viewBox 0 0 240 120）：原创机枪剪影——枪身/枪管/瞄具/握把/枪托全几何形，深蓝主体 + #6fc0f7/#4aa8f0 高光线 + 六边形黄徽 + 光环环形弹匣（#ffd94a） |

### 星标类（2）
| 文件 | 设计说明 |
|---|---|
| `star.svg` | 蓝色空星：#c8e8ff 填充 + #2f8fe8 描边，viewBox 0 0 24 24 |
| `star-on.svg` | 金黄实星：#ffd94a 填充 + #e8a800 描边，同一星形路径 |

### 主视觉与卡面（10）
| 文件 | 设计说明 |
|---|---|
| `alice-hero.svg` | **核心资产**（viewBox 0 0 600 760）：淡蓝圆形光晕 + 六边形/四角星装饰背景；`<g>` 分组 = bg / halo / hair-back / body / face / hair-front / weapon。机械光环（复用 halo 造型）浮于头顶；银白短发几何块面（锯齿刘海 + 双绺侧发 + 呆毛）；蓝眼（#2f8fe8 虹膜 + 深蓝瞳 + 高光）；黑连衣裙（#10203e）配白领/白下摆饰边 + 黄六边形胸徽；右臂举起持抽象几何机枪（rotate(-30) 组：枪身/枪管/瞄具/握把/光环弹匣 + 持枪手），双腿 + 黑鞋。全线条圆角（linejoin/linecap round） |
| `memoria-1.svg` | ①清扫：#e4f2ff 底，扫帚 + 三层水波弧 + 黄火花 |
| `memoria-2.svg` | ②机械：8 齿齿轮（蓝芯）+ 小光环 + 六边形节点 + 电路折线 |
| `memoria-3.svg` | ③雨水：#c8e8ff 底，8 道斜雨线 + 大水滴 + 白小水滴 + 白色涟漪 |
| `memoria-4.svg` | ④星空：#10203e 夜空，黄/白星点与四角星 + 蓝行星 + 倾斜星环 + 黄六边形 |
| `memoria-5.svg` | ⑤弹仓：六边弹仓框内 3×3 排列弹丸（深蓝弹体 + 黄弹头） |
| `memoria-6.svg` | ⑥夏莱终端：大六边形 + 青色内六边形 + 6 数据节点与连线 + 黄中心节点 |
| （memoria 统一规范） | viewBox 0 0 300 420：上部 2/3 抽象画 + 底部深蓝信息条（#10203e，顶部 5px 黄线、六边形+双抽象线条占位，**无文字**）+ 整卡 2px 深蓝边 |
| `avatar-alice.svg` | 爱丽丝：浅蓝圆底 + 银白短发 + 黄色小光环（四卡扣点）+ 平静脸（蓝眼 + 小嘴），viewBox 0 0 96 96 |
| `avatar-hanako.svg` | 花子：浅黄圆底 + 棕色短发 + 白色贝雷帽（绒球）+ 温柔脸（闭眼弧线 + 微笑 + 粉腮红） |
| `avatar-koharu.svg` | 小春：浅粉圆底 + 黑色短发 + 深蓝护目镜带 + 青色镜片（白色高光弧）+ 张嘴笑 |
| `favicon.svg` | 站点图标（viewBox 0 0 64 64）：深蓝底满铺不透明 + 亮蓝边六边形 + 黄色光环简形（四卡扣 + 中心点） |

## 自测输出（契约 §7 指定脚本，XML 错误 0，missing 为空）

```
missing: []
alice-hero.svg: 7912B OK
avatar-alice.svg: 1403B OK
avatar-hanako.svg: 1396B OK
avatar-koharu.svg: 1308B OK
badge-cc.svg: 1194B OK
badge-millennium.svg: 2121B OK
deco-corner.svg: 607B OK
favicon.svg: 719B OK
grid-pattern.svg: 819B OK
halo-alice.svg: 1207B OK
hex-pattern.svg: 1142B OK
icon-skill-basic.svg: 892B OK
icon-skill-enhanced.svg: 961B OK
icon-skill-ex.svg: 1155B OK
icon-skill-sub.svg: 1703B OK
icon-weapon.svg: 1622B OK
logo-al1s.svg: 1726B OK
memoria-1.svg: 1543B OK
memoria-2.svg: 2471B OK
memoria-3.svg: 1683B OK
memoria-4.svg: 1677B OK
memoria-5.svg: 2265B OK
memoria-6.svg: 2051B OK
star-on.svg: 376B OK
star.svg: 376B OK
stripe-pattern.svg: 504B OK
TOTAL: 40833B (39.9KB), files: 26
```

补充扫描：无 `<image>` / `<script>` / `<foreignObject>` / `<style>` / `class=` / `xlink:href`；无任何外部资源引用（唯一 `http://` 命中为每个文件必需的 `xmlns` 命名空间声明）。单文件最大 7.9KB（≤60KB ✓），总包 39.9KB（≤400KB ✓）。

## 已知限制 / 说明
1. **立绘为抽象几何风**：爱丽丝按「可辨认的白发光环机器人少女」目标做扁平剪纸化处理——光环、银白短发块面、蓝眼、黑裙白边、持枪姿态均可辨；五官与服装褶皱均为几何概括，非写实（契约允许"适度抽象/剪纸风"）。
2. logo「AL-1S」为等宽几何字母（矩形+圆形+线条拼合），非真实字体，SVG 内不内嵌任何字体。
3. 花子头发使用了色板外的棕色 `#8a5a33`（契约头像条目明确要求"棕色短发"，色板中无棕色，取最近自然色）；小春黑发用深蓝 `#10203e` 近似。
4. 三个平铺图案均为透明底（favicon 为深蓝满铺不透明），图案类通过 `<pattern>`（hex/stripe）或整单元直绘（grid）保证无缝；CSS 引用时按 viewBox 尺寸 repeat 即可。
5. 记忆局限卡底部信息条按契约不放文字，仅六边形 + 两条抽象横线占位（供 W1/W4 决定是否叠加 DOM 文字）。
6. 未新增其他资产；如需补充（如 gacha 抽卡星光、loading 动画 SVG）请在编排者处登记，不在本包私创。

## 红线遵守
- 仅创建 `assets/img/` 下 26 个 SVG；其他文件只读未改。
- 未描摹/转换任何官方素材，全部原创几何构图。
- 未上传、未 git push、未安装依赖。

---

# 校正记录（2026-10-12，依据官方真实设定重绘）

## 变更内容
1. **重画 `assets/img/alice-hero.svg`**（viewBox 0 0 600 760，仍按 bg/halo/hair-back/body/face/hair-front/weapon 分组）：
   - 发型改为深青灰长发（`linearGradient` #4a6b78→#2e4a56）+ 齐刘海（平直发梢）+ **双马尾垂至腰以下**（两侧长发辫，根部黑色发带）；
   - 眼睛改亮蓝 #3aa7e8，无口表情（嘴为一条直线）；
   - 光环改**青色 #35d0c0 圆角方形空心环**（描边 6px、四角圆润、内衬细线、四边中点深蓝铆点，带 18% 透明度辉光），头顶漂浮；
   - 服装改千禧年白色连帽外套（敞怀、黑色内衬、青色滚边、袖口黑青拼接）+ 黑色领带 + 白衬衫领；黑色百褶裙（折裥线 + 青色裙缘）；黑色过膝袜；白色运动鞋（浅蓝鞋底 + 深蓝描边）；
   - 武器改**巨型白色电磁炮扛于右肩**（rotate(20°) 竖置）：粗大炮口（深蓝口环 + 青色能量芯）、炮身青色屏幕（三条水平亮线）、侧面几何「77」记号与 MILLENNIUM 感方块列、上下青色能量环带、握把；左手扶炮、右手自然下垂；
   - 背景改淡青圆形光晕 + 青色六边形装饰 + 青/黄四角星。
2. **重画 `assets/img/avatar-alice.svg`**：浅青底 + 深青双马尾 + 青色圆角方框光环 + 蓝眼 + 无口直线嘴。
3. **新增 4 个头像**（均 96×96 圆形底、猫耳帽头=连帽猫耳兜帽）：
   - `avatar-momoi.svg` 才羽桃：浅粉底、橘棕短发、黑粉猫耳帽头、金橙眼、开口笑；
   - `avatar-midori.svg` 才羽绿：浅绿底、浅金绿短发、黑绿猫耳帽头、绿眼、温柔微笑；
   - `avatar-yuzu.svg` 花冈柚子：浅橙底、粉色长发、橙眼、困倦半闭眼（橙瞳 + 上睑线）；
   - `avatar-himari.svg` 明星日鞠：浅紫底、白色长发、头侧白色五瓣花饰（黄芯）、紫眼、微笑。
4. **删除** `assets/img/avatar-hanako.svg`、`assets/img/avatar-koharu.svg`（角色设定有误，不再使用）。

## 校正后自测输出（XML 错误 0，missing 为空）
```
missing: []
（28 个文件全部 ET.parse 通过，单文件最大 10.3KB ≤ 60KB）
alice-hero.svg: 10332B OK
avatar-alice.svg: 1533B OK
avatar-himari.svg: 1613B OK
avatar-midori.svg: 1563B OK
avatar-momoi.svg: 1534B OK
avatar-yuzu.svg: 1301B OK
（其余 22 个资产文件同前次自测，均 OK）
TOTAL: 46690B (45.6KB), files: 28
forbidden tokens: []
```

## 校正后已知限制
- 立绘为抽象几何风：双马尾、方框光环、连帽外套、百褶裙、过膝袜、电磁炮等关键识别要素均为几何概括；头身比按"娇小"意向 stylize（非严格 5.5 头身实测），表情为无口。
- 光环辉光使用半透明青色矩形而非滤镜（保持扁平、零外部依赖）。
- W4 若在 data.js 的 momotalk.contacts 中引用了已删除的 hanako/koharu 头像路径，需同步改为上述 5 个头像文件名（W2 不改 W4 分区文件）。
