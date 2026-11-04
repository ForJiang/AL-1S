# AL-1S · 天童アリス粉丝站

> 蔚蓝档案·天童爱丽丝（Tendou Aris）主题粉丝站 AL-1S：简中/繁中/日本語/English 四语言，按浏览器语言自动跳转；Next.js 15 + React 19 静态导出，GlyphSwell 指针波纹背景，纯静态零依赖
>
> Blue Archive Tendou Aris fan site: 4 languages (zh-Hans/zh-Hant/ja/en) with automatic browser-language redirect; Next.js 15 + React 19 static export, zero-dependency

English intro at the bottom: [English](#english)

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

---

## English

**AL-1S** is a fan site for Tendou Aris (AL-1S) from Blue Archive, available in four languages — 简体中文 (zh-Hans) / 繁體中文 (zh-Hant) / 日本語 (ja) / English (en) — with automatic browser-language redirect at the root path.

**Live site:** https://forjiang.github.io/AL-1S/

### Tech Stack

- Next.js 15 (App Router, `output: "export"` static export) + React 19 + TypeScript
- Tailwind CSS 3; the background is a deeply customized GlyphSwell pointer-ripple canvas (based on React Bits)
- Deployed on GitHub Pages: build artifacts hosted at the root of the `main` branch

### Project Structure

- `app/[lang]/page.tsx` — the four-language page (SSG, dictionary-driven)
- `app/page.tsx` — root-path language detection and redirect (zh-Hant → Traditional Chinese, ja → 日本語 …)
- `lib/i18n/` — fixed-length tuple dictionary contract; `tsc` statically guarantees all four languages are aligned key-for-key, position-for-position
- `components/ui/glyph-swell.tsx` — the background pointer-ripple canvas
- `.ai/` — collaboration SOPs, handoff packages and run archives

### Update & Deploy

```bash
./deploy.sh   # build → commit artifacts and source to main → push; GitHub Pages publishes automatically
```

### Credits

**Author:** ForJiang · [github.com/ForJiang](https://github.com/ForJiang)

© 2026 ForJiang. All rights reserved.

Blue Archive and all related characters are copyrighted by NEXON Games; this site is a non-commercial fan work.
