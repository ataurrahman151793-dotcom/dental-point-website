"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const stages = [
  {
    label: "Stage 01",
    heading: "3D precision planning.",
    body: "Our CBCT scanner creates a detailed 3D map of your jaw, bone density, and nerve positions — so every implant is planned with sub-millimeter accuracy before surgery begins.",
    image: "/images/yomi-stage-01-precision.png",
    alt: "3D CBCT scan showing jaw and implant planning — precision guided surgery",
  },
  {
    label: "Stage 02",
    heading: "guided placement.",
    body: "A custom surgical guide — crafted from your 3D scan — directs the implant to exactly the right position, depth, and angle. Minimal trauma, faster healing.",
    image: "/images/yomi-stage-02-robot-assisted.webp",
    alt: "Computer-guided implant placement with surgical guide — precision dentistry",
  },
  {
    label: "Stage 03",
    heading: "life-changing results.",
    body: "Your permanent implant integrates naturally with your bone. A beautiful, permanent crown is fitted — a smile that looks, feels, and functions exactly like your own teeth.",
    image: "/images/yomi-stage-03-life-changing.webp",
    alt: "Final dental implant crown fitted — natural looking life-changing results",
  },
];

const GAP = 20;

export default function YomiShowcase() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [stride, setStride] = useState(380);

  const total = stages.length;

  /* Measure card width dynamically for correct stride on all screen sizes */
  useEffect(() => {
    const update = () => {
      if (cardRef.current) setStride(cardRef.current.offsetWidth + GAP);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const next = useCallback(
    () => setCurrent((c) => Math.min(total - 1, c + 1)),
    [total]
  );

  return (
    <section
      id="technology"
      ref={ref}
      className="py-16 md:py-20 overflow-hidden"
      style={{ background: "var(--color-ink)" }}
      aria-labelledby="yomi-heading"
    >
      {/* ── Header ── */}
      <motion.div
        className="container-site mb-10 md:mb-14"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <Eyebrow dark>computer-guided implants</Eyebrow>
            <h2
              id="yomi-heading"
              className="font-display font-normal text-white lowercase leading-tight tracking-tight"
            >
              <span className="block text-base md:text-lg text-white/50 font-body font-medium lowercase tracking-wide mb-1">
                precision implants at —
              </span>
              <span
                className="block font-semibold text-white leading-none"
                style={{
                  fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                dental point
              </span>
            </h2>
            <p className="max-w-lg text-sm leading-relaxed" style={{ color: "rgba(246,244,239,0.55)" }}>
              Three meticulously engineered stages — from 3D scan to permanent
              crown — delivering results that look and feel like your natural
              teeth.
            </p>
          </div>

          {/* Arrow buttons (desktop) */}
          <div className="hidden sm:flex shrink-0 gap-2">
            <button
              onClick={prev}
              disabled={current === 0}
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "white" }}
              aria-label="Previous stage"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={current === total - 1}
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "white" }}
              aria-label="Next stage"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Carousel strip — left-aligned with container, overflows right ── */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex"
          style={{
            gap: GAP,
            /* Match container-site left padding */
            paddingLeft: "max(1.5rem, calc((100vw - 1440px) / 2 + 1.5rem))",
          }}
          animate={reducedMotion ? {} : { x: -current * stride }}
          transition={{ type: "spring", stiffness: 220, damping: 32, mass: 1 }}
        >
          {stages.map((stage, i) => (
            <div
              key={i}
              ref={i === 0 ? cardRef : undefined}
              className="flex-shrink-0 rounded-2xl overflow-hidden relative cursor-pointer group"
              style={{
                width: "min(360px, calc(100vw - 3rem))",
                minHeight: "27rem",
              }}
              onClick={() => setCurrent(i)}
              role="button"
              tabIndex={0}
              aria-label={`View ${stage.label}`}
              onKeyDown={(e) => e.key === "Enter" && setCurrent(i)}
            >
              <Image
                src={stage.image}
                alt={stage.alt}
                fill
                quality={88}
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) calc(100vw - 3rem), 360px"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,20,18,0.93) 0%, rgba(10,20,18,0.4) 55%, transparent 100%)",
                }}
                aria-hidden="true"
              />

              {/* Card content */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-7 md:p-8">
                <span
                  className="font-body font-semibold uppercase tracking-[0.18em] mb-3"
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--color-mint)",
                    opacity: 0.75,
                  }}
                >
                  {stage.label}
                </span>
                <h3
                  className="font-display text-white font-semibold mb-3 leading-tight lowercase"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                >
                  {stage.heading}
                </h3>
                <p
                  className="text-sm leading-relaxed line-clamp-2 mb-5"
                  style={{ color: "rgba(246,244,239,0.62)" }}
                >
                  {stage.body}
                </p>
                <div
                  className="flex items-center gap-2 text-sm font-body font-medium transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: "var(--color-accent)" }}
                >
                  learn more
                  <ArrowRight size={15} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Dots + CTA ── */}
      <div className="container-site mt-8 flex items-center justify-between gap-4">
        <div className="flex gap-2" role="tablist" aria-label="Stage navigation">
          {stages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to stage ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 8,
                background:
                  i === current
                    ? "var(--color-accent)"
                    : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        <Button href="#contact" variant="pill">
          learn about our implants
        </Button>
      </div>
    </section>
  );
}
