"use client";

/*
 * TODO — add these 8 files to /public/images/before-after/ :
 *   ba-veneers-before.webp   ba-veneers-after.webp
 *   ba-implant-before.webp   ba-implant-after.webp
 *   ba-whitening-before.webp ba-whitening-after.webp
 *   ba-kids-before.webp      ba-kids-after.webp
 *
 * Until they exist, a solid-colour placeholder is shown automatically.
 */

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

const SKEW = 0.12; // diagonal offset as fraction of card width
const INIT_TOP = (0.5 - SKEW / 2) * 100; // 44
const INIT_BOT = (0.5 + SKEW / 2) * 100; // 56

function drawArc(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number,
  x2: number, y2: number,
  segs: number,
) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const nx = -dy / len, ny = dx / len;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  for (let i = 1; i < segs; i++) {
    const t = i / segs;
    const px = x1 + dx * t + nx * (Math.random() - 0.5) * 14;
    const py = y1 + dy * t + ny * (Math.random() - 0.5) * 14;
    ctx.lineTo(px, py);
  }
  ctx.lineTo(x2, y2);
}

export interface DiagonalSliderProps {
  leftImage: string;
  rightImage: string;
  leftAlt?: string;
  rightAlt?: string;
  height?: number;
  fullscreen?: boolean;
  className?: string;
}

function SafeImage({
  src, alt, fallbackBg, fallbackLabel,
}: {
  src: string; alt: string; fallbackBg: string; fallbackLabel: string;
}) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: fallbackBg }}
      >
        <span
          className="font-body text-sm font-semibold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {fallbackLabel}
        </span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover object-top"
      sizes="(max-width: 640px) 100vw, 50vw"
      onError={() => setErr(true)}
    />
  );
}

export default function DiagonalSlider({
  leftImage,
  rightImage,
  leftAlt = "Before",
  rightAlt = "After",
  height = 420,
  fullscreen = false,
  className = "",
}: DiagonalSliderProps) {
  const containerRef    = useRef<HTMLDivElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const leftLayerRef    = useRef<HTMLDivElement>(null);
  const rightLayerRef   = useRef<HTMLDivElement>(null);
  const rafRef          = useRef<number>(0);
  const ratioRef        = useRef(0.5);
  const targetRatioRef  = useRef(0.5);

  const [isVisible,     setIsVisible]     = useState(false);
  const [isMobile,      setIsMobile]      = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  /* Detect environment on mount */
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /* IntersectionObserver — pause canvas when card is offscreen */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setIsVisible(e.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Sync canvas pixel dimensions to CSS dimensions */
  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const sync = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = container.offsetWidth  * dpr;
      canvas.height = container.offsetHeight * dpr;
    };
    const ro = new ResizeObserver(sync);
    ro.observe(container);
    sync();
    return () => ro.disconnect();
  }, []);

  /* Animation loop — runs only when visible, desktop, not reduced-motion */
  useEffect(() => {
    const shouldAnimate = !isMobile && !reducedMotion && isVisible;
    if (!shouldAnimate) {
      cancelAnimationFrame(rafRef.current);
      /* Reset clip-paths to center when idle */
      if (leftLayerRef.current)
        leftLayerRef.current.style.clipPath = `polygon(0 0,${INIT_TOP}% 0,${INIT_BOT}% 100%,0 100%)`;
      if (rightLayerRef.current)
        rightLayerRef.current.style.clipPath = `polygon(${INIT_TOP}% 0,100% 0,100% 100%,${INIT_BOT}% 100%)`;
      return;
    }

    const canvas     = canvasRef.current;
    const leftLayer  = leftLayerRef.current;
    const rightLayer = rightLayerRef.current;
    if (!canvas || !leftLayer || !rightLayer) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function frame() {
      /* Ease ratio smoothly toward cursor */
      ratioRef.current += (targetRatioRef.current - ratioRef.current) * 0.1;
      const r  = ratioRef.current;
      const cw = canvas!.width;
      const ch = canvas!.height;

      const offset  = SKEW * cw;
      const topX    = r * cw - offset / 2;
      const botX    = r * cw + offset / 2;
      const topXPct = (topX / cw) * 100;
      const botXPct = (botX / cw) * 100;

      /* Update clip-paths directly — bypasses React render cycle */
      leftLayer!.style.clipPath  = `polygon(0 0,${topXPct}% 0,${botXPct}% 100%,0 100%)`;
      rightLayer!.style.clipPath = `polygon(${topXPct}% 0,100% 0,100% 100%,${botXPct}% 100%)`;

      /* Draw electric arc */
      ctx!.clearRect(0, 0, cw, ch);

      /* Outer glow */
      ctx!.save();
      ctx!.shadowColor = "rgba(80,180,255,0.65)";
      ctx!.shadowBlur  = 18;
      ctx!.strokeStyle = "rgba(120,200,255,0.22)";
      ctx!.lineWidth   = 6;
      drawArc(ctx!, topX, 0, botX, ch, 10);
      ctx!.stroke();
      ctx!.restore();

      /* Mid glow */
      ctx!.save();
      ctx!.shadowColor = "rgba(180,230,255,0.85)";
      ctx!.shadowBlur  = 9;
      ctx!.strokeStyle = "rgba(200,240,255,0.52)";
      ctx!.lineWidth   = 2.5;
      drawArc(ctx!, topX, 0, botX, ch, 14);
      ctx!.stroke();
      ctx!.restore();

      /* Bright core */
      ctx!.save();
      ctx!.shadowColor = "rgba(240,252,255,1)";
      ctx!.shadowBlur  = 4;
      ctx!.strokeStyle = "rgba(235,250,255,0.96)";
      ctx!.lineWidth   = 1;
      drawArc(ctx!, topX, 0, botX, ch, 16);
      ctx!.stroke();
      ctx!.restore();

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible, isMobile, reducedMotion]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    targetRatioRef.current = Math.max(0.1, Math.min(0.9, (e.clientX - rect.left) / rect.width));
  }, []);

  const onMouseLeave = useCallback(() => {
    targetRatioRef.current = 0.5;
  }, []);

  const showCanvas = !isMobile && !reducedMotion;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none cursor-crosshair ${className}`}
      style={{ height: fullscreen ? "100vh" : `${height}px` }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* ── LEFT — BEFORE ── */}
      <div
        ref={leftLayerRef}
        className="absolute inset-0"
        style={{ clipPath: `polygon(0 0,${INIT_TOP}% 0,${INIT_BOT}% 100%,0 100%)` }}
      >
        <SafeImage src={leftImage} alt={leftAlt} fallbackBg="#111d18" fallbackLabel="Before" />
      </div>

      {/* ── RIGHT — AFTER ── */}
      <div
        ref={rightLayerRef}
        className="absolute inset-0"
        style={{ clipPath: `polygon(${INIT_TOP}% 0,100% 0,100% 100%,${INIT_BOT}% 100%)` }}
      >
        <SafeImage src={rightImage} alt={rightAlt} fallbackBg="#1e3d32" fallbackLabel="After" />
      </div>

      {/* ── Canvas — electric arc (desktop only) ── */}
      {showCanvas && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ width: "100%", height: "100%" }}
        />
      )}

      {/* ── Static diagonal line (mobile / reduced-motion) ── */}
      {!showCanvas && (
        <div
          className="absolute pointer-events-none"
          style={{
            width: "1.5px",
            height: "140%",
            top: "-20%",
            left: "50%",
            transform: `translateX(-50%) rotate(${Math.atan(SKEW * 0.5) * (180 / Math.PI)}deg)`,
            transformOrigin: "center center",
            background: "rgba(255,255,255,0.38)",
          }}
        />
      )}

      {/* ── Label badges ── */}
      <span
        className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full font-body text-xs font-semibold tracking-widest uppercase"
        style={{ background: "rgba(0,0,0,0.62)", color: "rgba(255,255,255,0.82)", backdropFilter: "blur(6px)" }}
      >
        Before
      </span>
      <span
        className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full font-body text-xs font-semibold tracking-widest uppercase"
        style={{ background: "rgba(47,93,82,0.82)", color: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)" }}
      >
        After
      </span>
    </div>
  );
}
