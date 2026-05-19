"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

/* ── NE India clinic locations — shown as markers on globe ── */
const MARKERS = [
  { id: "guwahati",   location: [26.14,  91.74] as [number,number], size: 0.06 }, // primary (clinic)
  { id: "shillong",   location: [25.57,  91.88] as [number,number], size: 0.03 },
  { id: "imphal",     location: [24.81,  93.95] as [number,number], size: 0.03 },
  { id: "kohima",     location: [25.67,  94.11] as [number,number], size: 0.025 },
  { id: "itanagar",   location: [27.08,  93.60] as [number,number], size: 0.025 },
  { id: "aizawl",     location: [23.72,  92.71] as [number,number], size: 0.025 },
  { id: "agartala",   location: [23.83,  91.26] as [number,number], size: 0.025 },
  { id: "dibrugarh",  location: [27.47,  94.90] as [number,number], size: 0.025 },
  { id: "silchar",    location: [24.82,  92.80] as [number,number], size: 0.025 },
  { id: "tezpur",     location: [26.63,  92.79] as [number,number], size: 0.02  },
  { id: "jorhat",     location: [26.75,  94.20] as [number,number], size: 0.02  },
];

/* ── Arcs: patients traveling to Guwahati ── */
const ARCS = [
  { id: "a1", from: [25.67, 94.11] as [number,number], to: [26.14, 91.74] as [number,number] },
  { id: "a2", from: [24.81, 93.95] as [number,number], to: [26.14, 91.74] as [number,number] },
  { id: "a3", from: [27.08, 93.60] as [number,number], to: [26.14, 91.74] as [number,number] },
  { id: "a4", from: [23.72, 92.71] as [number,number], to: [26.14, 91.74] as [number,number] },
  { id: "a5", from: [23.83, 91.26] as [number,number], to: [26.14, 91.74] as [number,number] },
  { id: "a6", from: [27.47, 94.90] as [number,number], to: [26.14, 91.74] as [number,number] },
];

export function CobeGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const velocity  = useRef({ phi: 0, theta: 0 });
  const phiOffset = useRef(0);
  const thetaOff  = useRef(0);
  const isPaused  = useRef(false);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPaused.current = true;
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!pointerInteracting.current) return;
    const dx = e.clientX - pointerInteracting.current.x;
    const dy = e.clientY - pointerInteracting.current.y;
    dragOffset.current = { phi: dx / 250, theta: dy / 900 };
    const now = Date.now();
    if (lastPointer.current) {
      const dt = Math.max(now - lastPointer.current.t, 1);
      const cap = 0.12;
      velocity.current = {
        phi:   Math.max(-cap, Math.min(cap, ((e.clientX - lastPointer.current.x) / dt) * 0.3)),
        theta: Math.max(-cap, Math.min(cap, ((e.clientY - lastPointer.current.y) / dt) * 0.08)),
      };
    }
    lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
  }, []);

  const onPointerUp = useCallback(() => {
    if (pointerInteracting.current) {
      phiOffset.current += dragOffset.current.phi;
      thetaOff.current  += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
      lastPointer.current = null;
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPaused.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup",   onPointerUp,   { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup",   onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globe: ReturnType<typeof createGlobe> | null = null;
    let rafId: number;
    /* Start phi centered on India (lon ≈ 91.7°E → ~−1.6 rad) */
    let phi = -1.6;

    function init() {
      const w = canvas!.offsetWidth;
      if (w === 0 || globe) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      globe = createGlobe(canvas!, {
        devicePixelRatio: dpr,
        width:  w * dpr,
        height: w * dpr,
        phi,
        theta: 0.25,
        dark:          1,
        diffuse:       1.4,
        mapSamples:    16000,
        mapBrightness: 2.2,
        /* Site palette */
        baseColor:    [0.12, 0.28, 0.24],   // #1f4840 — dark teal globe
        markerColor:  [0.78, 0.88, 0.84],   // #C8E0D6 — mint markers
        glowColor:    [0.22, 0.45, 0.38],   // soft teal halo
        arcColor:     [0.85, 0.71, 0.54],   // #D8B589 — gold arcs
        arcWidth:        0.6,
        arcHeight:       0.3,
        markerElevation: 0.01,
        markers: MARKERS,
        arcs:    ARCS,
        opacity: 0.85,
      });

      function animate() {
        if (!isPaused.current) {
          phi += 0.003;
          const tMin = -0.35, tMax = 0.35;
          if (Math.abs(velocity.current.phi) > 0.0001 || Math.abs(velocity.current.theta) > 0.0001) {
            phiOffset.current += velocity.current.phi;
            thetaOff.current  += velocity.current.theta;
            velocity.current.phi   *= 0.94;
            velocity.current.theta *= 0.94;
          }
          if (thetaOff.current < tMin) thetaOff.current += (tMin - thetaOff.current) * 0.1;
          if (thetaOff.current > tMax) thetaOff.current += (tMax - thetaOff.current) * 0.1;
        }
        globe!.update({
          phi:   phi + phiOffset.current + dragOffset.current.phi,
          theta: 0.25 + thetaOff.current + dragOffset.current.theta,
        });
        rafId = requestAnimationFrame(animate);
      }
      animate();
      setTimeout(() => { if (canvas) canvas.style.opacity = "1"; });
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) { ro.disconnect(); init(); }
      });
      ro.observe(canvas);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (globe) globe.destroy();
    };
  }, []);

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        style={{
          width: "100%", height: "100%",
          cursor: "grab", opacity: 0,
          transition: "opacity 1.4s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />
    </div>
  );
}
