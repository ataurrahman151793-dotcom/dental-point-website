"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function SavingsBand() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="savings"
      ref={ref}
      className="relative overflow-hidden py-16 md:py-20"
      style={{ background: "var(--color-primary)" }}
      aria-labelledby="savings-heading"
    >
      {/* Decorative rings */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -left-32 w-[40vw] h-[40vw] rounded-full border pointer-events-none"
        style={{ borderColor: "rgba(200,224,214,0.07)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -right-24 w-[30vw] h-[30vw] rounded-full border pointer-events-none"
        style={{ borderColor: "rgba(200,224,214,0.05)" }}
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-4">
          <motion.p
            className="eyebrow"
            style={{ color: "var(--color-mint)" }}
            initial={reducedMotion ? {} : { opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            flexible payment plans
          </motion.p>

          <motion.h2
            id="savings-heading"
            className="font-display font-semibold lowercase leading-tight"
            style={{
              color: "#F6F4EF",
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              letterSpacing: "-0.025em",
            }}
            initial={reducedMotion ? {} : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            no lump sum?{" "}
            <em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>
              no problem.
            </em>
          </motion.h2>

          <motion.p
            className="text-base max-w-md leading-relaxed"
            style={{ color: "rgba(246,244,239,0.68)" }}
            initial={reducedMotion ? {} : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.8 }}
          >
            Spread your implant or smile makeover into small monthly
            instalments — 0% interest available. No financial stress, just a
            great smile.
          </motion.p>

          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.28, duration: 0.7 }}
            className="mt-1"
          >
            <Button
              href="#contact"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-ink)",
              }}
            >
              explore emi options
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
