"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

/* ── Major Indian cities + NE India clinic locations ── */
const MARKERS = [
  // Major metros — large, visible from farther out
  { id: "guwahati",  location: [26.14,  91.74] as [number,number], size: 0.08  }, // clinic — biggest
  { id: "delhi",     location: [28.61,  77.21] as [number,number], size: 0.07  }, // New Delhi
  { id: "mumbai",    location: [19.08,  72.88] as [number,number], size: 0.07  }, // Mumbai
  { id: "jaipur",    location: [26.91,  75.79] as [number,number], size: 0.06  }, // Rajasthan
  { id: "kolkata",   location: [22.57,  88.36] as [number,number], size: 0.055 }, // West Bengal
  // NE state capitals — medium
  { id: "shillong",  location: [25.57,  91.88] as [number,number], size: 0.04  },
  { id: "imphal",    location: [24.81,  93.95] as [number,number], size: 0.035 },
  { id: "kohima",    location: [25.67,  94.11] as [number,number], size: 0.03  },
  { id: "itanagar",  location: [27.08,  93.60] as [number,number], size: 0.03  },
  { id: "aizawl",    location: [23.72,  92.71] as [number,number], size: 0.03  },
  { id: "agartala",  location: [23.83,  91.26] as [number,number], size: 0.03  },
  { id: "dibrugarh", location: [27.47,  94.90] as [number,number], size: 0.03  },
  { id: "silchar",   location: [24.82,  92.80] as [number,number], size: 0.025 },
];

/* ── Arcs: patients/travelers flowing to Guwahati ── */
const ARCS = [
  // Major cities → Guwahati
  { id: "arc-delhi",    from: [28.61,  77.21] as [number,number], to: [26.14, 91.74] as [number,number] },
  { id: "arc-mumbai",   from: [19.08,  72.88] as [number,number], to: [26.14, 91.74] as [number,number] },
  { id: "arc-jaipur",   from: [26.91,  75.79] as [number,number], to: [26.14, 91.74] as [number,number] },
  { id: "arc-kolkata",  from: [22.57,  88.36] as [number,number], to: [26.14, 91.74] as [number,number] },
  // NE states → Guwahati
  { id: "arc-kohima",   from: [25.67,  94.11] as [number,number], to: [26.14, 91.74] as [number,number] },
  { id: "arc-imphal",   from: [24.81,  93.95] as [number,number], to: [26.14, 91.74] as [number,number] },
  { id: "arc-itanagar", from: [27.08,  93.60] as [number,number], to: [26.14, 91.74] as [number,number] },
  { id: "arc-aizawl",   from: [23.72,  92.71] as [number,number], to: [26.14, 91.74] as [number,number] },
  { id: "arc-agartala", from: [23.83,  91.26] as [number,number], to: [26.14, 91.74] as [number,number] },
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
    /* Center on India: lon ≈ 80°E avg → phi ≈ −1.4 rad */
    let phi = -1.42;

    function init() {
      const w = canvas!.offsetWidth;
      if (w === 0 || globe) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      globe = createGlobe(canvas!, {
        devicePixelRatio: dpr,
        width:  w * dpr,
        height: w * dpr,
        phi,
        theta:         0.30,
        dark:          0,           // light mode globe
        diffuse:       1.3,
        mapSamples:    16000,
        mapBrightness: 3.5,
        /* Light globe — teal ocean, clearly visible on light bg */
        baseColor:    [0.62, 0.80, 0.74],  // medium mint — visible on white page
        markerColor:  [0.06, 0.30, 0.20],  // deep teal dots
        glowColor:    [0.70, 0.88, 0.80],  // soft mint halo
        arcColor:     [0.78, 0.40, 0.10],  // amber/gold arcs
        arcWidth:        0.65,
        arcHeight:       0.38,
        markerElevation: 0.01,
        scale:           1.15,
        markers: MARKERS,
        arcs:    ARCS,
        opacity: 0.95,
      });

      function animate() {
        if (!isPaused.current) {
          phi += 0.002;
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
          theta: 0.30 + thetaOff.current + dragOffset.current.theta,
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
