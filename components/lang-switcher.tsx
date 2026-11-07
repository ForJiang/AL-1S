"use client";

/* AL-1S · 天童アリス粉丝站 · © 2026 ForJiang · github.com/ForJiang */
import { useLayoutEffect } from "react";
import { LANGS, langPath, type Lang } from "@/lib/i18n";

const SCROLL_KEY = "al1s-lang-scroll";

/* 语言切换器：点击时记录当前滚动位置，目标语言页加载后在原位恢复
   （图片都带 width/height 属性，各语言文档高度在首帧即稳定，恢复位置准确）。
   useLayoutEffect 在绘制前恢复，避免先到顶部再跳动的闪烁。 */
export function LangSwitcher({ current }: { current: Lang }) {
  useLayoutEffect(() => {
    const y = sessionStorage.getItem(SCROLL_KEY);
    if (y !== null) {
      sessionStorage.removeItem(SCROLL_KEY);
      window.scrollTo({ top: Number(y), behavior: "instant" });
    }
  }, []);

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
          <a
            key={lang}
            href={langPath(lang)}
            onClick={() => {
              sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
            }}
            className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-black sm:text-sm"
          >
            {label}
          </a>
        ),
      )}
    </nav>
  );
}
