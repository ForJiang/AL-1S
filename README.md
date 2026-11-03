# AL-1S · 天童アリス粉丝站

蔚蓝档案（Blue Archive）天童アリス（Tendou Aris / AL-1S）的四语言粉丝站：
简体中文 / 繁體中文 / 日本語 / English，根路径按浏览器语言自动跳转。

**线上地址：** https://forjiang.github.io/AL-1S/

## 技术栈

- Next.js 15（App Router，`output: "export"` 静态导出）+ React 19 + TypeScript
- Tailwind CSS 3；背景为深度定制的 GlyphSwell 指针波纹画布（源自 React Bits）
- GitHub Pages 部署：`main` 分支根目录托管构建产物

## 项目结构

- `app/[lang]/page.tsx` — 四语言页面（SSG，词典驱动）
- `app/page.tsx` — 根路径语言侦测跳转（zh-Hant → 繁體，ja → 日本語 …）
- `lib/i18n/` — 定长元组词典契约（tsc 静态保证四语言逐键逐位对齐）
- `components/ui/glyph-swell.tsx` — 背景指针波纹画布
- `.ai/` — 协作 SOP、交接包与运行档案

## 更新与部署

```bash
./deploy.sh   # 构建 → 提交产物与源码到 main → 推送，Pages 自动发布
```

## 署名

**作者 / Author: ForJiang** · [github.com/ForJiang](https://github.com/ForJiang)

© 2026 ForJiang. 保留所有权利。

蔚蓝档案（Blue Archive）及所有角色版权归 NEXON Games 所有，本站为非商业粉丝作品。
