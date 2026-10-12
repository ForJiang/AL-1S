<div align="center">

# AL-1S

**天童爱丽丝（天童アリス / Tendou Aris）· 机能扩充终端**

蔚蓝档案（Blue Archive）主题粉丝网站 —— 纯静态 · 零依赖 · 零构建 · 三语（中/日/EN）

*「肯定。爱丽丝是本机体的识别名。」*

</div>

---

## 这是什么

**AL-1S** 是一个关于《蔚蓝档案》角色 **天童爱丽丝**（千禧年 · 游戏开发部）的粉丝向资料终端。

站名来自官方剧情中的那段身份校验：

```
<Identity check, are you AL-1S?>
Hmm?
No. I am…me. I am "Aris"
```

本站以「AL-1S 机能扩充终端」为虚构框架（已明示为粉丝二设），用蔚蓝档案游戏内的 UI 语言——任务面板、角色卡、技能槽、MomoTalk、记忆局限、招募演出——呈现爱丽丝的全部资料。

## 站点内容

| 区块 | 内容 |
|---|---|
| 🖥️ 系统启动 | BA 风格 BIOS 启动动画（日志逐行打印 + 进度条，6 秒硬超时兜底） |
| 🏠 首屏 | AL-1S Logo（连点 5 次触发招募彩蛋）、原创立绘、学园/社团徽章 |
| 📇 角色档案 | ★3 角色卡：15 项资料、登录语音、机体型号说明 |
| 📊 战斗数值 | Lv.1 → Lv.100 滑块实时插值（8 项数值条 + 数字网格） |
| ⚔️ 技能 | 四技能页签 + 技能等级滑块 + 各级数值表（EX 上限 5 级，其余 10 级） |
| 🔫 专属武器 | 光之剑：超新星 · Lv.1/MAX 双档 + 武器被动 |
| 📖 剧情章节 | 六章官方剧情台词（手风琴展开，Global 英文原文 + 中日粉丝译制） |
| 🔊 语音台词 | 26 条分类台词，点击用浏览器语音合成朗读日文 |
| 💬 MomoTalk 模拟 | 5 位联系人、气泡对话、发送消息 + 机器人语体自动回复 |
| 🃏 记忆局限 | 6 张粉丝二创概念卡（原创 SVG 卡面） |
| 🕘 登场记录 | 官方剧情节点年表 |
| 🎮 机器人检定 | 5 题趣味测试，计算你的「机器人纯度」 |
| 🎉 招募彩蛋 | 连点 Logo 5 次 → ★3 招募演出 + 粒子雨 |

## 运行

无需任何构建步骤，两种方式：

```bash
# 方式一：直接用浏览器打开
open index.html

# 方式二：本地服务（推荐，字体/缓存行为与线上一致）
python3 serve.py 8017        # 然后访问 http://127.0.0.1:8017/
```

## 项目结构

```
AL-1S/
├─ index.html                  # 单页 DOM（11 个 section + 启动层 + 彩蛋层）
├─ serve.py                    # ThreadingHTTPServer 本地预览
├─ assets/
│  ├─ css/
│  │  ├─ tokens.css            # 设计令牌（BA 蓝白黄色板/字体/间距/动效）
│  │  ├─ base.css              # reset、排版、reveal 动画、reduced-motion
│  │  ├─ layout.css            # 导航/页脚/section 外框/响应式
│  │  ├─ components.css        # 按钮/徽章/面板/滑块/手风琴/MomoTalk 等组件
│  │  ├─ sections.css          # 各 section 专属布局
│  │  └─ integration.css       # 合并期补丁（动态类名/进度条变量/pre-line）
│  ├─ js/
│  │  ├─ data.js               # 三语内容数据集（档案/数值/技能/台词/对话/检定）
│  │  └─ main.js               # 全部交互（16 模块，原生 ES2020，防御式降级）
│  ├─ fonts/                   # 自托管字体（按实际字符子集化）
│  │  ├─ fredoka-*.woff2       # 拉丁展示圆体
│  │  ├─ mplus-rounded-1c-*.woff2  # 日文圆体（子集化，1520 字形/档）
│  │  └─ share-tech-mono-*.woff2   # 终端等宽字体
│  └─ img/                     # 26 个原创 SVG（立绘/徽章/图标/卡面/头像/图案）
├─ tools/                      # 门禁脚本（CSS/HTML/i18n/字体子集化/类名核对）
├─ artifacts/                  # 研究产物与各 Worker 交付报告
└─ .ai/                        # 协作 SOP
```

## 数据来源与准确性

- **档案/数值/技能/武器**：[SchaleDB](https://github.com/SchaleDB/SchaleDB) 社区数据库（schale.gg 数据源，三服 `students.json` 交叉核对）。SchaleDB 仅公开 Lv.1 与 Lv.100 两档数值，站点滑块在两档间线性插值。
- **剧情台词**：[BlueArchiveDataset](https://github.com/wanony/BlueArchiveDataset)（官方 Global 剧情文本）。英文为官方原文；中文与日文为粉丝译制（页面已标注）。
- **MomoTalk 对话 / 记忆局限 / 检定题**：粉丝二创（页面已标注）。
- 查不到的数据一律留空或标注，**未编造任何游戏数值**。

## 设计

- **配色**：蔚蓝档案经典蓝白黄 + 深海军蓝面板（`#2f8fe8` / `#ffd94a` / `#0a1428`）
- **母题**：六边形网格、斜纹、科技角饰、爱丽丝的圆角方框光环
- **字体**：Fredoka（展示）/ M PLUS Rounded 1c（日文）/ Share Tech Mono（终端），全部自托管并按实际用字子集化（~510KB 总量）
- **无障碍**：`:focus-visible` 全键盘可达、`prefers-reduced-motion` 全局降级、语义化标签与 aria 属性
- **插画**：站内全部插画与图标均为原创 SVG，未使用任何官方素材

## 质量门禁

```bash
export PATH="/tmp/node-v20.18.1-darwin-arm64/bin:$PATH"   # node --check 需要
node --check assets/js/data.js && node --check assets/js/main.js   # G1 语法
python3 tools/check_site.py        # G2 HTML 结构 / 契约 id / 资源引用 / i18n 键
python3 tools/check_i18n.py        # G3 三语齐性 + 数据块完整性
python3 tools/check_css.py         # G4 CSS 花括号 / var / url / 无下划线
python3 tools/check_js_classes.py  # JS 动态类名 vs CSS 定义差集
python3 tools/subset_fonts.py      # 字体按内容字符重新子集化
```

## 免责声明

本站为非官方粉丝作品，与 **Nexon Games、Yostar** 及其关联公司无关。《蔚蓝档案》(Blue Archive) 的角色、名称、设定等相关权利归原权利人所有。站内全部插画与图标均为原创 SVG，未使用任何官方素材。字体遵循 SIL OFL 授权。

---

<div align="center">

**AL-1S 终端 · 用爱发电 · 清扫开始。**

</div>
