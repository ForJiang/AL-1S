# AL-1S 项目交接包（HANDOFF）

> 生成时间：2026-10-12 ｜ 状态：**v1.0.0 已完成并通过全量门禁与对抗复核**
> 协作过程见 `.ai/COLLABORATION.md`；各 Worker 交付报告见 `artifacts/*/DONE.md`。

## 一句话现状
纯静态三语粉丝站已完成：11 个 section、26 个原创 SVG、三语 678 字段数据、16 个交互模块；
G1-G4 门禁全绿，浏览器实测（桌面 1440×900 / 移动 390×844 / 中日程英）通过，控制台零报错、零 404。

## 运行
```bash
cd AL-1S && python3 serve.py 8017     # http://127.0.0.1:8017/
# 或直接用浏览器打开 index.html
```

## 已知事项与后续可选迭代
1. **SchaleDB 仅公开 Lv.1/Lv.100 两档数值**：站点滑块为线性插值（非游戏真实成长曲线），
   介意的话可在 `data.js` 的 `stats.byLevel` 补入 wiki 的中间档。
2. **羁绊故事/官方语音原始文本未取得**（bluearchive.wiki 全源被反爬拦截）：
   `stories` 用官方 Global 剧情台词（en 原文 + 中日粉丝译制）；`voices` 的 jp 为粉丝译制，
   页面均已标注。若日后能访问 wiki，可替换为官方羁绊故事与语音原文。
3. **`ui.stats.formulaLabel` / `ui.weapon.statsLabel` 两个 ui 键无消费方**（预留，无害）。
4. **quiz 允许跳过未答题结算**（设计决策，趣味测试惯例）。
5. `assets/fonts/src/` 存放字体原始 TTF（10MB，重新子集化用；打包 zip 时已排除）。
6. 卡池首发日期/活动复刻时间线未取得，年表以剧情节点（ORIGIN/EP.17/EP.18/ALT/FAN）呈现。

## 门禁速查
```bash
export PATH="/tmp/node-v20.18.1-darwin-arm64/bin:$PATH"
node --check assets/js/data.js && node --check assets/js/main.js
python3 tools/check_site.py && python3 tools/check_i18n.py && python3 tools/check_css.py
python3 tools/subset_fonts.py    # data.js 内容变更后必须重跑（字体按用字子集化）
```

## 文件拓扑
见 README.md「项目结构」。改动入口：内容 → `assets/js/data.js`；行为 → `assets/js/main.js`；
合并期样式补丁 → `assets/css/integration.css`（其余 CSS 为 W1 设计系统，勿混入补丁）。
