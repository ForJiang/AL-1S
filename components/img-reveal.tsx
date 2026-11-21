"use client";

/* AL-1S · 天童アリス粉丝站 · © 2026 ForJiang · github.com/ForJiang
   图片擦除揭示包装：进入视口且图片加载完成后加 .play，CSS keyframes
   从左到右扫出（合成器驱动）。播放只在像素就绪后开始——不会卡在半途。
   prefers-reduced-motion 下由全局媒体查询降级为直接显示。 */
import { useEffect, useRef } from "react";

export default function ImgReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    const img = host?.querySelector("img");
    if (!host || !img) return;
    const play = () => host.classList.add("play");

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      play();
      return;
    }

    // 需要：进入视口 + 图片像素就绪，二者齐备才播放
    let armed = false;
    const maybePlay = () => {
      if (armed && img.complete && img.naturalWidth > 0) play();
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            armed = true;
            maybePlay();
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(host);
    img.addEventListener("load", maybePlay, { once: true });
    maybePlay();
    return () => {
      io.disconnect();
      img.removeEventListener("load", maybePlay);
    };
  }, []);

  return (
    <div ref={ref} className={`img-reveal ${className ?? ""}`}>
      {children}
    </div>
  );
}
