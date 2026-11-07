"use client";

/* AL-1S · 天童アリス粉丝站 · © 2026 ForJiang · github.com/ForJiang */
import { LANGS, type Lang } from "@/lib/i18n";

/* 语言切换器：同一网页内原地切换（不跳转、不刷新），当前语言高亮 */
export function LangSwitcher({
  current,
  onSwitch,
}: {
  current: Lang;
  onSwitch: (lang: Lang) => void;
}) {
  return (
    <nav className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full bg-white/80 p-1 shadow-sm backdrop-blur sm:top-6 sm:right-6">
      {LANGS.map(({ lang, label }) =>
        lang === current ? (
          <span
            key={lang}
            aria-current="true"
            className="rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white sm:text-sm"
          >
            {label}
          </span>
        ) : (
          <button
            key={lang}
            type="button"
            onClick={() => onSwitch(lang)}
            className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-black sm:text-sm"
          >
            {label}
          </button>
        ),
      )}
    </nav>
  );
}
