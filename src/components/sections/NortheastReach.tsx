"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";

const STATS = [
  { value: "12+", label: "years in Dispur", sub: "Serving Guwahati since 2013" },
  { value: "500+", label: "implants placed", sub: "Computer-guided precision" },
  { value: "50+", label: "NRIs treated", sub: "Patients from across the globe" },
];

/* Simple SVG outline of Northeast India with patient-origin dots */
function NEIndiaMap() {
  const dots = [
    { cx: 112, cy: 88,  label: "Guwahati",    r: 5, primary: true  },
    { cx: 145, cy: 72,  label: "Shillong",     r: 3.5 },
    { cx: 168, cy: 60,  label: "Arunachal",    r: 3   },
    { cx: 88,  cy: 60,  label: "Barpeta",      r: 3   },
    { cx: 130, cy: 108, label: "Silchar",       r: 3   },
    { cx: 150, cy: 90,  label: "Nagaland",      r: 3   },
    { cx: 95,  cy: 105, label: "Manipur",       r: 2.5 },
    { cx: 165, cy: 105, label: "Mizoram",       r: 2.5 },
    { cx: 70,  cy: 80,  label: "Kokrajhar",     r: 2.5 },
    { cx: 108, cy: 55,  label: "Tezpur",        r: 2.5 },
  ];

  return (
    <svg
      viewBox="0 0 240 160"
      className="w-full max-w-sm mx-auto"
      aria-label="Map of Northeast India showing patient origins"
      role="img"
    >
      {/* Rough NE India landmass silhouette */}
      <path
        d="M55,55 Q65,30 90,25 Q115,18 140,22 Q165,20 185,35 Q200,50 198,70 Q196,90 185,108 Q170,130 148,138 Q125,145 100,140 Q78,135 65,120 Q48,102 50,82 Z"
        fill="rgba(47,93,82,0.12)"
        stroke="rgba(200,224,214,0.35)"
        strokeWidth="1.2"
      />
      {/* State boundary lines — subtle */}
      <path d="M90,25 Q92,60 88,90" stroke="rgba(200,224,214,0.15)" strokeWidth="0.7" fill="none"/>
      <path d="M140,22 Q138,65 135,100" stroke="rgba(200,224,214,0.15)" strokeWidth="0.7" fill="none"/>
      <path d="M55,82 Q100,78 185,70" stroke="rgba(200,224,214,0.15)" strokeWidth="0.7" fill="none"/>

      {/* Pulse rings for Guwahati */}
      <circle cx="112" cy="88" r="14" fill="rgba(47,93,82,0.12)" className="animate-ping" style={{ animationDuration: "2.5s" }}/>
      <circle cx="112" cy="88" r="9"  fill="rgba(47,93,82,0.18)" />

      {/* Patient-origin dots */}
      {dots.map((dot) => (
        <g key={dot.label}>
          <circle
            cx={dot.cx} cy={dot.cy} r={dot.r}
            fill={dot.primary ? "#2F5D52" : "rgba(200,224,214,0.7)"}
            stroke={dot.primary ? "#C8E0D6" : "rgba(200,224,214,0.4)"}
            strokeWidth="0.8"
          />
        </g>
      ))}

      {/* Guwahati label */}
      <text x="117" y="91" fontSize="5.5" fill="rgba(200,224,214,0.9)" fontFamily="sans-serif" fontWeight="600">
        Guwahati
      </text>
    </svg>
  );
}

export default function NortheastReach() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="ne-reach-heading"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 80% 50%, rgba(200,224,214,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="container-site relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left — map */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <NEIndiaMap />
            <p
              className="text-sm text-center max-w-xs leading-relaxed"
              style={{ color: "var(--color-ink-soft)" }}
            >
              Patients travel from across all 8 states of Northeast India — and beyond — for our computer-guided implant care.
            </p>
          </motion.div>

          {/* Right — copy + stats */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              <Eyebrow>northeast india trusts us</Eyebrow>
              <h2
                id="ne-reach-heading"
                className="font-display font-semibold lowercase leading-tight"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  letterSpacing: "-0.03em",
                  color: "var(--color-ink)",
                }}
              >
                500+ patients from<br />
                <em className="not-italic" style={{ color: "var(--color-primary)" }}>
                  across the region
                </em>
              </h2>
              <p className="text-base leading-relaxed max-w-md" style={{ color: "var(--color-ink-soft)" }}>
                From Assam to Arunachal, Meghalaya to Nagaland — families travel to Guwahati specifically for Dental Point&apos;s computer-guided implant surgery and smile makeovers. We speak your language, understand your concerns, and deliver results that last.
              </p>
              <p className="text-sm font-medium" style={{ color: "var(--color-ink-soft)" }}>
                Languages spoken: <span style={{ color: "var(--color-ink)" }}>Assamese · Bengali · Hindi · English · Bodo</span>
              </p>
            </motion.div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-1 p-4 rounded-2xl"
                  style={{
                    background: "var(--color-bg)",
                    border: "1.5px solid rgba(200,224,214,0.35)",
                  }}
                >
                  <p
                    className="font-display font-bold leading-none"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--color-primary)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-body font-semibold text-xs uppercase tracking-wide" style={{ color: "var(--color-ink)" }}>
                    {stat.label}
                  </p>
                  <p className="font-body text-xs leading-snug" style={{ color: "var(--color-ink-soft)" }}>
                    {stat.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
