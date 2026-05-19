"use client";

import { useEffect, useRef, ReactNode } from "react";

/* Glow colours — hue base + spread across viewport width */
const GLOW_COLORS = {
  teal:   { base: 160, spread: 80  },
  green:  { base: 120, spread: 200 },
  blue:   { base: 220, spread: 200 },
  gold:   { base: 40,  spread: 60  },
};

/* Injected once into <head> — all [data-glow] elements share this CSS */
const GLOW_CSS = `
[data-glow]::before,[data-glow]::after{
  pointer-events:none;content:"";position:absolute;
  inset:calc(var(--border-size)*-1);
  border:var(--border-size) solid transparent;
  border-radius:calc(var(--radius)*1px);
  background-attachment:fixed;
  background-size:calc(100% + 2*var(--border-size)) calc(100% + 2*var(--border-size));
  background-repeat:no-repeat;background-position:50% 50%;
  mask:linear-gradient(transparent,transparent),linear-gradient(white,white);
  mask-clip:padding-box,border-box;mask-composite:intersect;
}
[data-glow]::before{
  background-image:radial-gradient(
    calc(var(--spotlight-size)*.75) calc(var(--spotlight-size)*.75) at
    calc(var(--x,0)*1px) calc(var(--y,0)*1px),
    hsl(var(--hue,160) calc(var(--saturation,80)*1%) calc(var(--lightness,55)*1%) / var(--border-spot-opacity,1)),
    transparent 100%
  );
  filter:brightness(2.2);
}
[data-glow]::after{
  background-image:radial-gradient(
    calc(var(--spotlight-size)*.5) calc(var(--spotlight-size)*.5) at
    calc(var(--x,0)*1px) calc(var(--y,0)*1px),
    hsl(0 100% 100% / var(--border-light-opacity,.6)),
    transparent 100%
  );
}
[data-glow]>[data-glow]{
  position:absolute;inset:0;will-change:filter;
  opacity:var(--outer,1);border-radius:calc(var(--radius)*1px);
  border-width:calc(var(--border-size)*20);
  filter:blur(calc(var(--border-size)*10));
  background:none;pointer-events:none;border:none;
}
[data-glow]>[data-glow]::before{inset:-10px;border-width:10px;}
`;

let injected = false;

export interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: keyof typeof GLOW_COLORS;
  /** Card background colour (glass dark) */
  bg?: string;
  /** Border colour when mouse is away */
  border?: string;
}

export function GlowCard({
  children,
  className = "",
  glowColor = "teal",
  bg = "rgba(255,255,255,0.04)",
  border = "rgba(200,224,214,0.14)",
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  /* Inject CSS once */
  useEffect(() => {
    if (injected) return;
    const s = document.createElement("style");
    s.textContent = GLOW_CSS;
    document.head.appendChild(s);
    injected = true;
  }, []);

  /* Sync mouse position → CSS vars on every [data-glow] element */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = (e: PointerEvent) => {
      el.style.setProperty("--x",  e.clientX.toFixed(2));
      el.style.setProperty("--xp", (e.clientX / window.innerWidth).toFixed(2));
      el.style.setProperty("--y",  e.clientY.toFixed(2));
      el.style.setProperty("--yp", (e.clientY / window.innerHeight).toFixed(2));
    };
    document.addEventListener("pointermove", sync);
    return () => document.removeEventListener("pointermove", sync);
  }, []);

  const { base, spread } = GLOW_COLORS[glowColor];

  return (
    <div
      ref={ref}
      data-glow
      className={`relative rounded-2xl ${className}`}
      style={
        {
          "--base":           base,
          "--spread":         spread,
          "--radius":         "14",
          "--border":         "1.5",
          "--size":           "300",
          "--outer":          "1",
          "--saturation":     "80",
          "--lightness":      "60",
          "--border-size":    "calc(var(--border) * 1px)",
          "--spotlight-size": "calc(var(--size) * 1px)",
          "--hue":            "calc(var(--base) + var(--xp, 0) * var(--spread))",
          backgroundImage: `radial-gradient(
            var(--spotlight-size) var(--spotlight-size) at
            calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
            hsl(var(--hue, 160) 70% 65% / 0.09), transparent
          )`,
          backgroundColor:      bg,
          backgroundSize:       "calc(100% + 2*var(--border-size)) calc(100% + 2*var(--border-size))",
          backgroundPosition:   "50% 50%",
          backgroundAttachment: "fixed",
          border:               `var(--border-size) solid ${border}`,
          backdropFilter:       "blur(12px)",
        } as React.CSSProperties
      }
    >
      {/* Inner glow-blur node required by the CSS */}
      <div data-glow aria-hidden="true" />
      {children}
    </div>
  );
}
