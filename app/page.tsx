"use client";

import { useEffect } from "react";
import GlyphSwell from "@/components/ui/glyph-swell";
import { DEFAULT_LANG, LANGS, langPath, type Lang } from "@/lib/i18n";

/* 根路径语言侦测：按浏览器语言偏好跳到对应语言页（replace 保证回退键不卡在跳板页）。
   无 JS 时显示四个语言链接兜底。 */
function detectLang(): Lang {
  if (typeof navigator === "undefined") return DEFAULT_LANG;
  for (const tag of navigator.languages ?? []) {
    const t = tag.toLowerCase();
    if (t.startsWith("zh")) {
      return /tw|hk|mo|hant/.test(t) ? "zh-TW" : "zh-CN";
    }
    if (t.startsWith("ja")) return "ja";
    if (t.startsWith("en")) return "en";
  }
  return DEFAULT_LANG;
}

export default function RootLanding() {
  useEffect(() => {
    window.location.replace(langPath(detectLang()));
  }, []);

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-12 px-8">
      {/* 与内页一致的 GlyphSwell 全页波浪背景（外层 fixed div 承担定位） */}
      <div className="fixed inset-0 -z-10">
        <GlyphSwell
          colors={["#eef1f6", "#2563eb", "#1e3a8a"]}
          className="h-full w-full"
        />
      </div>
      <div className="text-center">
        <h1 className="text-5xl font-black tracking-tighter sm:text-6xl">
          天童アリス
        </h1>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[2px] text-blue-600">
          Tendou Aris · AL-1S
        </p>
        <p className="mt-10 text-gray-600">
          选择语言 · 選擇語言 · 言語を選択 · Choose your language
        </p>
      </div>
      <nav className="flex flex-wrap justify-center gap-3">
        {LANGS.map(({ lang, label }) => (
          <a
            key={lang}
            href={langPath(lang)}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-black hover:text-white"
          >
            {label}
          </a>
        ))}
      </nav>
    </main>
  );
}
