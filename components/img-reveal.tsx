"use client";

/* AL-1S · 天童アリス粉丝站 · © 2026 ForJiang · github.com/ForJiang
   图片擦除揭示包装：进入视口加 .play，CSS clip-path 从左到右扫出（合成器友好）。
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
    if (!host) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            host.classList.add("play");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`img-reveal ${className ?? ""}`}>
      {children}
    </div>
  );
}
