"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EXPERTISE } from "@/lib/constants";
import Eyebrow from "@/components/ui/Eyebrow";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function ExpertiseRow({
  items,
  direction,
  speed,
}: {
  items: string[];
  direction: "left" | "right";
  speed: number;
}) {
  const reducedMotion = useReducedMotion();
  const animClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="overflow-hidden py-1.5">
      <div
        className={`flex w-max ${!reducedMotion ? animClass : ""} hover:[animation-play-state:paused]`}
        style={
          reducedMotion
            ? undefined
            : { animationDuration: `${speed}s`, willChange: "transform" }
        }
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-display font-medium lowercase whitespace-nowrap px-5 cursor-default transition-colors duration-200 hover:text-primary"
            style={{
              fontSize: "clamp(16px, 2vw, 24px)",
              color: "var(--color-ink-soft)",
              lineHeight: 1.4,
            }}
          >
            {item}
            <span
              className="mx-4 text-accent"
              style={{ fontSize: "0.55em", opacity: 0.6 }}
              aria-hidden="true"
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ExpertiseMarquee() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-60px" });

  const row1 = EXPERTISE.slice(0, 5);
  const row2 = EXPERTISE.slice(4);

  return (
    <section
      id="problems"
      className="py-12 overflow-hidden"
      style={{
        background:   "var(--color-bg)",
        borderTop:    "1px solid rgba(47,93,82,0.08)",
        borderBottom: "1px solid rgba(47,93,82,0.08)",
        contain:      "layout style",
      }}
      aria-label="Procedures we offer"
    >
      <motion.div
        ref={headerRef}
        className="container-site mb-7"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between">
          <Eyebrow>procedures we love</Eyebrow>
          <p
            className="text-xs font-body hidden sm:block"
            style={{ color: "var(--color-ink-soft)" }}
          >
            from cleaning to full smile transformation — all under one roof
          </p>
        </div>
      </motion.div>

      <div className="relative">
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24"
          style={{ background: "linear-gradient(to right, var(--color-bg), transparent)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24"
          style={{ background: "linear-gradient(to left, var(--color-bg), transparent)" }}
          aria-hidden="true"
        />

        <div className="flex flex-col gap-1">
          <ExpertiseRow items={row1} direction="left"  speed={28} />
          <ExpertiseRow items={row2} direction="right" speed={34} />
        </div>
      </div>
    </section>
  );
}
