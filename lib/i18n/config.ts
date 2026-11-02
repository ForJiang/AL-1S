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

/* 图片文件名全语言共用（定义在此，词典只放 alt 文案，避免各语言间漂移） */
export const HERO_IMG = "aris-hero.jpg";
export const STORY_IMG = "aris-story.jpg";
export const GALLERY_SRCS = [
  "aris-g1.jpg",
  "aris-g2.jpg",
  "aris-g3.jpg",
  "aris-g4.jpg",
  "aris-g5.jpg",
  "aris-g6.jpg",
  "aris-g7.jpg",
  "aris-g8.jpg",
] as const;
