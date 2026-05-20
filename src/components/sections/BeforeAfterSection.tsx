"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import DiagonalSlider from "@/components/ui/DiagonalSlider";

const CARDS = [
  {
    id: "veneers",
    name: "Veneers",
    result: "Gaps closed, brand-new smile",
    before: "/images/before-after/ba-veneers-before.webp",
    after:  "/images/before-after/ba-veneers-after.webp",
  },
  {
    id: "implants",
    name: "Dental Implants",
    result: "Missing teeth, fully restored",
    before: "/images/before-after/ba-implant-before.webp",
    after:  "/images/before-after/ba-implant-after.webp",
  },
  {
    id: "whitening",
    name: "Teeth Whitening",
    result: "Several shades brighter",
    before: "/images/before-after/ba-whitening-before.webp",
    after:  "/images/before-after/ba-whitening-after.webp",
  },
  {
    id: "kids",
    name: "Kids Dentistry",
    result: "Straight, healthy first smile",
    before: "/images/before-after/ba-kids-before.webp",
    after:  "/images/before-after/ba-kids-after.webp",
  },
] as const;

export default function BeforeAfterSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="ba-heading"
      className="relative py-16 md:py-20 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0a1f17 0%, #1a3328 40%, #0d2018 70%, #060f0b 100%)",
      }}
    >
      {/* Radial centre glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(47,93,82,0.22) 0%, transparent 70%)",
        }}
      />

      <div className="container-site relative z-10 flex flex-col gap-10">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-4"
        >
          <Eyebrow style={{ color: "rgba(200,224,214,0.65)" }}>real results</Eyebrow>
          <h2
            id="ba-heading"
            className="font-display font-semibold lowercase leading-tight"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              letterSpacing: "-0.03em",
              color: "#F6F4EF",
            }}
          >
            real smiles,{" "}
            <em className="not-italic" style={{ color: "var(--color-primary)" }}>
              real transformations
            </em>
          </h2>
          <p
            className="text-base leading-relaxed max-w-lg"
            style={{ color: "rgba(246,244,239,0.55)" }}
          >
            <span className="hidden sm:inline">Hover over</span>
            <span className="sm:hidden">Drag</span>
            {" "}each card to reveal real patient transformations — from first visit to final smile.
          </p>
        </motion.div>

        {/* ── 2 × 2 Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.1 + i * 0.08,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col gap-3"
            >
              {/* Card */}
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: 20,
                  boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                }}
              >
                <DiagonalSlider
                  leftImage={card.before}
                  rightImage={card.after}
                  leftAlt={`${card.name} — before treatment`}
                  rightAlt={`${card.name} — after treatment`}
                  height={360}
                />
              </div>

              {/* Caption row */}
              <div className="flex items-center justify-between px-1">
                <p
                  className="font-body font-semibold text-sm"
                  style={{ color: "#F6F4EF" }}
                >
                  {card.name}
                </p>
                <p
                  className="font-body text-xs"
                  style={{ color: "rgba(200,224,214,0.6)" }}
                >
                  {card.result}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mt-2"
        >
          <Button
            href="#contact"
            style={{
              background: "var(--color-accent)",
              color:      "var(--color-ink)",
              padding:    "1.125rem 2.75rem",
              fontSize:   "1rem",
            }}
          >
            book your transformation
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
