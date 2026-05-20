"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ScheduleCTA() {
  const reducedMotion = useReducedMotion();
  const ref   = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-20 overflow-hidden"
      aria-labelledby="cta-heading"
      style={{
        background: "linear-gradient(160deg, #0a1f17 0%, #1a3328 40%, #0d2018 70%, #060f0b 100%)",
      }}
    >
      {/* Soft radial glow — centre lift */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 50%, rgba(47,93,82,0.30) 0%, transparent 70%)",
        }}
      />

      {/* Bottom edge accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(200,224,214,0.18), transparent)",
        }}
      />

      {/* Decorative concentric rings — CSS only, zero JS */}
      {[58, 78, 100].map((size) => (
        <div
          key={size}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
          style={{
            width:       `${size}vw`,
            height:      `${size}vw`,
            borderColor: `rgba(200,224,214,${size === 58 ? 0.07 : size === 78 ? 0.04 : 0.02})`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Content */}
      <div className="container-site relative z-10 flex flex-col items-center text-center gap-8">
        <motion.p
          className="eyebrow"
          style={{ color: "rgba(200,224,214,0.65)" }}
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          your next step
        </motion.p>

        <motion.h2
          id="cta-heading"
          className="display-section max-w-2xl"
          style={{ color: "#F6F4EF" }}
          initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          ready for the dental experience you deserve?
        </motion.h2>

        <motion.p
          className="text-lg max-w-md leading-relaxed"
          style={{ color: "rgba(246,244,239,0.62)" }}
          initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.9 }}
        >
          New patients welcome. Flexible EMI plans available.
          Same-week appointments in Guwahati.
        </motion.p>

        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button
            href="#contact"
            style={{
              background: "var(--color-accent)",
              color:      "var(--color-ink)",
              padding:    "1.25rem 3rem",
              fontSize:   "1.125rem",
            }}
          >
            schedule now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
