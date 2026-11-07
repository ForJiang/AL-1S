"use client";

/* AL-1S · 天童アリス粉丝站 · © 2026 ForJiang · github.com/ForJiang
   块状文字揭示动画，效果源自 React Bits TextBlockAnimation（GSAP SplitText）。
   实现改为 React 原生：SplitText 的 DOM 改写与 React 协调及语言切换冲突
   （实测切换后文本节点丢失），故每行包装与揭示块由 React 渲染，GSAP 仅动画。
   两种用法：
   - lines 模式：纯文本数组，逐行各一个揭示块
   - children 模式：单个内容块（可含 <strong> 等富文本），整块一次揭示
   - 尊重 prefers-reduced-motion：直接呈现文本
   - 初始态全可见（隐藏放在时间线内）：动画跑不动的环境优雅降级 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { createElement, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type TextBlockAnimationProps = {
  /** lines 模式：每个元素渲染为一行，各配一个揭示块 */
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

  useGSAP(
    () => {
      const host = containerRef.current;
      if (!host) return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const blocks = host.querySelectorAll<HTMLElement>("[data-reveal-block]");
      const texts = host.querySelectorAll<HTMLElement>("[data-reveal-text]");
      if (!blocks.length) return;

      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        scrollTrigger: animateOnScroll
          ? {
              trigger: host,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          : undefined,
        delay,
      });

      tl.set(texts, { opacity: 0 })
        .to(blocks, {
          scaleX: 1,
          duration,
          stagger,
          transformOrigin: "left center",
        })
        .set(texts, { opacity: 1, stagger }, `<${duration / 2}`)
        .to(
          blocks,
          {
            scaleX: 0,
            duration,
            stagger,
            transformOrigin: "right center",
          },
          `<${duration * 0.4}`,
        );
    },
    {
      scope: containerRef,
      dependencies: [
        animateOnScroll,
        delay,
        blockColor,
        stagger,
        duration,
        lines,
        children,
      ],
    },
  );

  const block = createElement("span", {
    "data-reveal-block": "",
    style: {
      position: "absolute",
      inset: 0,
      backgroundColor: blockColor,
      zIndex: 2,
      transform: "scaleX(0)",
      transformOrigin: "left center",
    },
  });

  const clip = createElement(
    "span",
    { className: "block overflow-hidden" },
    createElement(
      "span",
      { "data-reveal-text": "", className: "block" },
      children !== undefined
        ? children
        : (lines ?? []).map((line, i) =>
            createElement("span", { key: i, className: "block" }, line || "\u00A0"),
          ),
    ),
    block,
  );

  return createElement(
    as,
    { ref: containerRef, className, style: { position: "relative" } },
    clip,
  );
}
