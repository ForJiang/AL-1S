/* AL-1S · 天童アリス粉丝站 · © 2026 ForJiang · github.com/ForJiang */
import type { Lang } from "./types";

export type { Lang };

export const DEFAULT_LANG: Lang = "zh-CN";

/* 切换器四语言并列，label 用各自的母语写法（全语言页面共用，无需翻译） */
export const LANGS: ReadonlyArray<{ lang: Lang; label: string }> = [
  { lang: "zh-CN", label: "简体中文" },
  { lang: "zh-TW", label: "繁體中文" },
  { lang: "ja", label: "日本語" },
  { lang: "en", label: "English" },
];

export function isLang(value: string): value is Lang {
  return LANGS.some((l) => l.lang === value);
}

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const img = (name: string) => `${base}/images/${name}`;
export const langPath = (lang: Lang) => `${base}/${lang}/`;

/* 图片文件名全语言共用（定义在此，词典只放 alt 文案，避免各语言间漂移）。
   w/h 为文件原始尺寸：给 <img> 提供宽高属性，浏览器可提前预留版面（消除 CLS）。 */
export const STORY_IMG = "aris-story.jpg";
export const STORY_DIMS = { w: 1080, h: 1894 };
export const GALLERY_ITEMS: ReadonlyArray<{
  src: string;
  w: number;
  h: number;
}> = [
  { src: "aris-g1.jpg", w: 1854, h: 1080 },
  { src: "aris-g2.jpg", w: 982, h: 1392 },
  { src: "aris-g3.jpg", w: 1536, h: 1080 },
  { src: "aris-g4.jpg", w: 1027, h: 1540 },
  { src: "aris-g5.jpg", w: 1000, h: 1500 },
  { src: "aris-g6.jpg", w: 1400, h: 787 },
  { src: "aris-g7.jpg", w: 947, h: 1500 },
  { src: "aris-g8.jpg", w: 914, h: 1600 },
  /* 原 Hero 主图：惊讶女仆立绘（自 Hero 移入画廊） */
  { src: "aris-hero.jpg", w: 1080, h: 1894 },
];
