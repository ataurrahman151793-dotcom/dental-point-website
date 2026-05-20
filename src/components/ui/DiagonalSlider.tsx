"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

const SKEW     = 0.12;
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
    const t  = i / segs;
    const px = x1 + dx * t + nx * (Math.random() - 0.5) * 14;
    const py = y1 + dy * t + ny * (Math.random() - 0.5) * 14;
    ctx.lineTo(px, py);
  }
  ctx.lineTo(x2, y2);
}

export interface DiagonalSliderProps {
  leftImage:   string;
  rightImage:  string;
  leftAlt?:    string;
  rightAlt?:   string;
  height?:     number;
  fullscreen?: boolean;
  className?:  string;
}

function SafeImage({
  src, alt, fallbackBg, fallbackLabel,
}: {
  src: string; alt: string; fallbackBg: string; fallbackLabel: string;
}) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: fallbackBg }}>
        <span className="font-body text-sm font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
          {fallbackLabel}
        </span>
      </div>
    );
  }
  return (
    <Image
      src={src} alt={alt} fill
      className="object-cover object-top"
      sizes="(max-width: 640px) 100vw, 50vw"
      onError={() => setErr(true)}
    />
  );
}

export default function DiagonalSlider({
  leftImage,
  rightImage,
  leftAlt   = "Before",
  rightAlt  = "After",
  height    = 420,
  fullscreen = false,
  className  = "",
}: DiagonalSliderProps) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const leftLayerRef  = useRef<HTMLDivElement>(null);
  const rightLayerRef = useRef<HTMLDivElement>(null);
  const lineRef       = useRef<HTMLDivElement>(null);   // mobile glow line
  const handleRef     = useRef<HTMLDivElement>(null);  // mobile drag handle
  const rafRef        = useRef<number>(0);
  const ratioRef      = useRef(0.5);
  const targetRef     = useRef(0.5);
  const dragging      = useRef(false);

  const [isVisible, setIsVisible] = useState(false);
  const [isMobile,  setIsMobile]  = useState(false);
  const [noAnim,    setNoAnim]    = useState(false);
  const [showHint,  setShowHint]  = useState(true);

  /* ── Detect environment ── */
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setNoAnim(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const t = setTimeout(() => setShowHint(false), 3200);
    return () => clearTimeout(t);
  }, []);

  /* ── IntersectionObserver — pause when offscreen ── */
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

  /* ── Canvas pixel sync — desktop only ── */
  useEffect(() => {
    if (isMobile) return;
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const sync = () => {
      const dpr      = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width   = container.offsetWidth  * dpr;
      canvas.height  = container.offsetHeight * dpr;
    };
    const ro = new ResizeObserver(sync);
    ro.observe(container);
    sync();
    return () => ro.disconnect();
  }, [isMobile]);

  /* ── RAF animation loop ── */
  useEffect(() => {
    if (noAnim || !isVisible) {
      cancelAnimationFrame(rafRef.current);
      if (leftLayerRef.current)
        leftLayerRef.current.style.clipPath  = `polygon(0 0,${INIT_TOP}% 0,${INIT_BOT}% 100%,0 100%)`;
      if (rightLayerRef.current)
        rightLayerRef.current.style.clipPath = `polygon(${INIT_TOP}% 0,100% 0,100% 100%,${INIT_BOT}% 100%)`;
      return;
    }

    const leftLayer  = leftLayerRef.current!;
    const rightLayer = rightLayerRef.current!;
    if (!leftLayer || !rightLayer) return;

    function frame() {
      /* Smooth lerp toward target */
      ratioRef.current += (targetRef.current - ratioRef.current) * 0.14;
      const r   = ratioRef.current;
      const ctr = containerRef.current;
      if (!ctr) { rafRef.current = requestAnimationFrame(frame); return; }

      const cssW   = ctr.offsetWidth;
      const offset = SKEW * cssW;
      const topX   = r * cssW - offset / 2;
      const botX   = r * cssW + offset / 2;
      const topPct = (topX / cssW) * 100;
      const botPct = (botX / cssW) * 100;

      /* Update clip-paths — bypasses React render */
      leftLayer.style.clipPath  = `polygon(0 0,${topPct}% 0,${botPct}% 100%,0 100%)`;
      rightLayer.style.clipPath = `polygon(${topPct}% 0,100% 0,100% 100%,${botPct}% 100%)`;

      if (isMobile) {
        /* Mobile: move CSS glow line + drag handle */
        const midPct = `${r * 100}%`;
        if (lineRef.current)   lineRef.current.style.left   = midPct;
        if (handleRef.current) handleRef.current.style.left = midPct;
      } else {
        /* Desktop: draw electric arc on canvas */
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const dpr     = Math.min(window.devicePixelRatio || 1, 2);
            const cw      = canvas.width;
            const ch      = canvas.height;
            const cTopX   = topX * dpr;
            const cBotX   = botX * dpr;

            ctx.clearRect(0, 0, cw, ch);

            ctx.save();
            ctx.shadowColor = "rgba(80,180,255,0.65)";
            ctx.shadowBlur  = 18;
            ctx.strokeStyle = "rgba(120,200,255,0.22)";
            ctx.lineWidth   = 6;
            drawArc(ctx, cTopX, 0, cBotX, ch, 10);
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.shadowColor = "rgba(180,230,255,0.85)";
            ctx.shadowBlur  = 9;
            ctx.strokeStyle = "rgba(200,240,255,0.52)";
            ctx.lineWidth   = 2.5;
            drawArc(ctx, cTopX, 0, cBotX, ch, 14);
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.shadowColor = "rgba(240,252,255,1)";
            ctx.shadowBlur  = 4;
            ctx.strokeStyle = "rgba(235,250,255,0.96)";
            ctx.lineWidth   = 1;
            drawArc(ctx, cTopX, 0, cBotX, ch, 16);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible, isMobile, noAnim]);

  /* ── Pointer helpers ── */
  const getRatio = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return 0.5;
    const rect = el.getBoundingClientRect();
    return Math.max(0.05, Math.min(0.95, (clientX - rect.left) / rect.width));
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    setShowHint(false);
    targetRef.current = getRatio(e.clientX);
  }, [getRatio]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    /* Desktop: follow hover without drag. Mobile: only when dragging. */
    if (isMobile && !dragging.current) return;
    targetRef.current = getRatio(e.clientX);
  }, [isMobile, getRatio]);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
    /* Desktop: animate back to center on release */
    if (!isMobile) targetRef.current = 0.5;
  }, [isMobile]);

  const onPointerLeave = useCallback(() => {
    if (!isMobile) targetRef.current = 0.5;
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none ${className}`}
      style={{
        height:      fullscreen ? "100vh" : `${height}px`,
        cursor:      isMobile ? "grab" : "crosshair",
        touchAction: "none", /* prevent page-scroll conflict on mobile */
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerLeave}
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

      {/* ── Desktop: canvas electric arc ── */}
      {!isMobile && !noAnim && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ width: "100%", height: "100%" }}
        />
      )}

      {/* ── Mobile: CSS glow divider line ── */}
      {isMobile && !noAnim && (
        <div
          ref={lineRef}
          className="absolute top-0 bottom-0 z-10 pointer-events-none"
          style={{
            left:       "50%",
            width:      "2px",
            transform:  "translateX(-50%)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.6) 100%)",
            boxShadow:  "0 0 8px 3px rgba(255,255,255,0.45), 0 0 22px 6px rgba(120,200,255,0.25)",
          }}
        />
      )}

      {/* ── Mobile: drag handle ── */}
      {isMobile && !noAnim && (
        <div
          ref={handleRef}
          className="absolute top-1/2 z-20 pointer-events-none flex items-center justify-center"
          style={{
            left:         "50%",
            transform:    "translateX(-50%) translateY(-50%)",
            width:        44,
            height:       44,
            borderRadius: "50%",
            background:   "rgba(255,255,255,0.97)",
            boxShadow:    "0 2px 16px rgba(0,0,0,0.38), 0 0 0 1.5px rgba(255,255,255,0.6)",
          }}
          aria-hidden="true"
        >
          {/* ← ⟷ → */}
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.5 6H18.5M1.5 6L5 2.5M1.5 6L5 9.5M18.5 6L15 2.5M18.5 6L15 9.5"
              stroke="#2F5D52"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* ── Mobile drag hint — auto-dismisses ── */}
      {isMobile && showHint && (
        <div
          className="absolute bottom-4 left-1/2 z-30 pointer-events-none flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-medium"
          style={{
            transform:      "translateX(-50%)",
            background:     "rgba(0,0,0,0.62)",
            color:          "rgba(255,255,255,0.88)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            whiteSpace:     "nowrap",
            letterSpacing:  "0.02em",
          }}
          aria-hidden="true"
        >
          ← drag to compare →
        </div>
      )}

      {/* ── Static line — reduced motion only ── */}
      {noAnim && (
        <div
          className="absolute pointer-events-none"
          style={{
            width:          "1.5px",
            height:         "140%",
            top:            "-20%",
            left:           "50%",
            transform:      `translateX(-50%) rotate(${Math.atan(SKEW * 0.5) * (180 / Math.PI)}deg)`,
            transformOrigin:"center center",
            background:     "rgba(255,255,255,0.38)",
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
