"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Glyph Swell
 * A quiet grid of monospaced marks, gently breathing in place. Swell rings
 * (pointer-driven and idle-spawned) are removed — the field is a calm,
 * continuous texture with no travelling elements.
 */

type Props = {
  /** Background, ink, crest accent (hex). */
  colors?: [string, string, string];
  /** Glyphs from quiet to loud. */
  ramp?: string;
  /** Cell size in CSS px. */
  cell?: number;
  className?: string;
  children?: ReactNode;
};

export function GlyphSwell({
  colors = ["#07090a", "#9fe6b0", "#e9fff0"],
  ramp = "·:-+=*#",
  cell = 15,
  className = "",
  children,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;display:block";
    host.prepend(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return () => canvas.remove();

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = !matchMedia("(hover: hover) and (pointer: fine)").matches;
    const dpr = Math.min(devicePixelRatio, 2);
    const size = coarse ? Math.round(cell * 0.85) : cell;
    const L = ramp.length;

    // A glyph atlas: every mark pre-drawn once in ink and once in the crest colour.
    const atlas = document.createElement("canvas");
    const S = Math.ceil(size * dpr);
    atlas.width = S * L;
    atlas.height = S * 2;
    const a = atlas.getContext("2d")!;
    const paintAtlas = () => {
      a.clearRect(0, 0, atlas.width, atlas.height);
      a.textAlign = "center";
      a.textBaseline = "middle";
      a.font = `500 ${Math.round(size * 0.82 * dpr)}px "Geist Mono", "JetBrains Mono", ui-monospace, monospace`;
      [colors[1], colors[2]].forEach((c, row) => {
        a.fillStyle = c;
        for (let i = 0; i < L; i++)
          a.fillText(ramp[i], i * S + S / 2, row * S + S / 2 + dpr * 0.5);
      });
    };
    paintAtlas();

    let W = 0,
      H = 0,
      cols = 0,
      rows = 0;
    let raf = 0,
      visible = true,
      last = 0;
    const t0 = performance.now();
    const now = () => (performance.now() - t0) / 1000;

    const resize = () => {
      const w = host.clientWidth,
        h = host.clientHeight;
      if (w === W && h === H) return;
      W = w;
      H = h;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      cols = Math.ceil(W / size) + 1;
      rows = Math.ceil(H / size) + 1;
    };

    const frame = (t: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ox = ((W - (cols - 1) * size) / 2) * dpr,
        oy = ((H - (rows - 1) * size) / 2) * dpr;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          // Idle murmur on every cell, so the texture visibly fills the viewport.
          let v =
            0.12 +
            0.06 * Math.sin(i * 0.37 + t * 0.6) * Math.sin(j * 0.29 - t * 0.45);
          if (v < 0.035) continue;
          const lv = Math.min(L - 1, Math.floor(v * L * 1.05));
          const crest = v > 0.8 ? 1 : 0;
          ctx.globalAlpha = Math.min(1, 0.28 + v * 1.15);
          ctx.drawImage(
            atlas,
            lv * S,
            crest * S,
            S,
            S,
            ox + i * size * dpr - S / 2,
            oy + j * size * dpr - S / 2,
            S,
            S,
          );
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (ms: number) => {
      if (!visible || document.hidden) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
      if (ms - last < (coarse ? 33 : 24)) return;
      last = ms;
      resize();
      frame(now());
    };
    const wake = () => {
      if (!reduced && !raf && visible && !document.hidden)
        raf = requestAnimationFrame(loop);
    };

    // Redraw the atlas once the mono face has loaded, so the marks aren't in a fallback font.
    let alive = true;
    document.fonts?.ready.then(() => {
      if (!alive) return;
      paintAtlas();
      if (reduced) frame(1.4);
    });

    resize();
    if (reduced) frame(1.4);
    else frame(0);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      wake();
    });
    io.observe(host);
    const ro = new ResizeObserver(() => {
      if (reduced) {
        resize();
        frame(1.4);
      }
    });
    ro.observe(host);
    document.addEventListener("visibilitychange", wake);
    if (!reduced) wake();
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      raf = 0;
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", wake);
      canvas.remove();
    };
  }, [colors, ramp, cell]);

  return (
    <div
      ref={hostRef}
      className={`relative isolate overflow-hidden ${className}`}
      style={{ background: colors[0] }}
    >
      {children && <div className="relative z-[1] h-full">{children}</div>}
    </div>
  );
}

export default GlyphSwell;
