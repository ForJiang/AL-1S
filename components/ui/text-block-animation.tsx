"use client";

/* AL-1S · 天童アリス粉丝站 · © 2026 ForJiang · github.com/ForJiang
   块状文字揭示动画，效果源自 React Bits TextBlockAnimation（GSAP SplitText）。
   实现为纯 CSS keyframes + IntersectionObserver 触发：
   GSAP 的 rAF 时间线在部分预览环境会被冻结（文字永远隐形），CSS 动画由
   合成器驱动不受影响；IO 进入视口后加 .play 播放一次（forwards 保持终态）。
   - 尊重 prefers-reduced-motion：直接呈现文本
   - 播放前文本隐藏：色块扫入 → 文字显现 → 色块扫出 */
import { createElement, useEffect, useRef, type CSSProperties } from "react";

type TextBlockAnimationProps = {
  /** lines 模式：每个元素渲染为一行，各配一个揭示块（错峰 = stagger） */
  lines?: string[];
  /** children 模式：提供时渲染单块揭示，内容可含富文本 */
  children?: React.ReactNode;
  /** 容器标签，保持标题语义（h1/h2/h3）或段落（p） */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  animateOnScroll?: boolean;
  delay?: number;
  blockColor?: string;
  stagger?: number;
  duration?: number;
  className?: string;
};

export default function TextBlockAnimation({
  lines,
  children,
  as = "div",
  animateOnScroll = true,
  delay = 0,
  blockColor = "#000",
  stagger = 0.1,
  duration = 0.6,
  className,
}: TextBlockAnimationProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;
    const play = () => host.classList.add("play");

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      play();
      return;
    }
    if (!animateOnScroll) {
      play();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            play();
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(host);
    return () => io.disconnect();
  }, [animateOnScroll]);

  const lineCount = children !== undefined ? 1 : (lines?.length ?? 0);
  const lineEls = [];
  for (let i = 0; i < lineCount; i++) {
    const lineStyle = {
      "--tba-delay": `${(delay + i * stagger).toFixed(2)}s`,
      "--tba-dur": `${duration}s`,
    } as CSSProperties;
    lineEls.push(
      <span className="tba-line" key={i} style={lineStyle}>
        <span className="tba-text">
          {children !== undefined ? children : (lines && lines[i]) || "\u00A0"}
        </span>
        <span
          aria-hidden="true"
          className="tba-block"
          style={{ backgroundColor: blockColor }}
        />
      </span>,
    );
  }

  return createElement(
    as,
    {
      ref: containerRef,
      className: `tba ${className ?? ""}`,
      style: { position: "relative" },
    },
    lineEls,
  );
}
