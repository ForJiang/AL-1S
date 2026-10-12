# AL-1S 项目协作 SOP（.ai/COLLABORATION.md）

> 依据用户级技能 multi-agent-parallel v1.1.0 + 2026-10-10/11 两次校准：
> **可写分区按文件互斥 + 编排者先冻结接口（CONTRACT.md + index.html 骨架）+ 派活七件事 +
> 时间盒 + DONE.md 制度 + 编排者串行合并跑全量门禁**。只读审计波次另行安排（对抗复核）。

## 档位与分区（v1.0 首发，2026-10-11）

- 档位：**深度档**（新项目全栈：内容研究 × 设计系统 × 前端 × 交互 × 验收）。
- 波次 0（只读并行，后台）：R1 游戏数值研究 / R2 剧情语录研究 → artifacts/R1-* R2-*。
- 波次 1（可写并行）：W1 CSS 设计系统 / W2 SVG 美术包 / W3 JS 交互（三片文件互斥，
  接口由 CONTRACT.md + index.html 冻结）。W4 数据层 data.js 由编排者按 R1/R2 成果写
  （内容准确性是站点核心，不外包）。
- 波次 2（编排者串行）：合并 → 全量门禁 G1-G4 → 本地服务 + 浏览器实测（桌面/移动）
  → 对抗复核（只读 Agent）→ 修复 → README/交接包/zip。

## 互斥分区

| Worker | 只写 | 自测 | 完成标志 |
|---|---|---|---|
| W1 | assets/css/{tokens,base,layout,components,sections}.css | `python3 tools/check_css.py`（url 缺失项可忽略，W2 并行创作中） | artifacts/W1/DONE.md |
| W2 | assets/img/*.svg | XML well-formed + ≤60KB/文件 | artifacts/W2/DONE.md |
| W3 | assets/js/main.js | `node --check` + 自审清单 | artifacts/W3/DONE.md |
| W4 | assets/js/data.js | `python3 tools/check_i18n.py` | artifacts/W4/DONE.md |

## 质量门禁（编排者执行，全绿才算完成）

1. G1 `node --check assets/js/data.js && node --check assets/js/main.js`
2. G2 `python3 tools/check_site.py`（HTML 结构/契约 id/资源引用/i18n 键）
3. G3 `python3 tools/check_i18n.py`（三语齐性 + 数据块完整性）
4. G4 `python3 tools/check_css.py`（花括号/var/url/无下划线）
5. G5 浏览器实测：`python3 serve.py 8017`，桌面 1440×900 + 移动 390×844 逐段截图；
   控制台零报错、零 404；九大 section + boot + 彩蛋全部眼见为实
6. G6 对抗复核（只读 Agent，找静默失效/契约违反/回归风险），发现问题回修复波次

## 真相层级与红线

- L1 实跑 > L2 源码 > L3 需求（CONTRACT）> L4 决策 > L5 研究产物 > L6 推测。
- 游戏数值/官方台词**禁止编造**（研究文件为准，查不到填 null）；粉丝二设必须可识别。
- 链接一律不带下划线；不上传、不 push；`prefers-reduced-motion` 必须被尊重。
