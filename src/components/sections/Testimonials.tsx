"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { CLINIC, TESTIMONIALS } from "@/lib/constants";
import Eyebrow from "@/components/ui/Eyebrow";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ── Animated review counter ── */
function ReviewCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    const duration = reducedMotion ? 0 : 1800;
    const start = Date.now();
    const step = () => {
      const elapsed  = Date.now() - start;
      const progress = Math.min(elapsed / duration || 1, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, reducedMotion]);

  return <span ref={ref}>{count}</span>;
}

/* ── Star row ── */
function Stars({ count, light = false }: { count: number; light?: boolean }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={13}
          style={{
            color: light ? "rgba(255,255,255,0.9)" : "var(--color-accent)",
            fill:  i < count
              ? (light ? "rgba(255,255,255,0.9)" : "var(--color-accent)")
              : "transparent",
            opacity: i < count ? 1 : 0.3,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/* ── Initials avatar ── */
function Avatar({ name, light = false, size = "md" }: { name: string; light?: boolean; size?: "sm" | "md" }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const dim = size === "sm" ? "w-9 h-9 text-xs" : "w-11 h-11 text-sm";

  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-body font-bold flex-shrink-0`}
      style={{
        background: light ? "rgba(255,255,255,0.15)" : "rgba(47,93,82,0.1)",
        color:      light ? "white"                  : "var(--color-primary)",
        border:     light ? "1.5px solid rgba(255,255,255,0.25)" : "1.5px solid rgba(47,93,82,0.18)",
      }}
    >
      {initials}
    </div>
  );
}

/* ── Large featured card ── */
function FeaturedCard({ review }: { review: (typeof TESTIMONIALS)[0] }) {
  return (
    <motion.div
      key={review.name}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col justify-between rounded-3xl p-8 md:p-10 overflow-hidden"
      style={{
        background: "var(--color-primary)",
        boxShadow: "0 20px 60px rgba(10,20,18,0.22), 0 4px 16px rgba(10,20,18,0.12)",
        minHeight: 340,
      }}
    >
      {/* Decorative quote mark */}
      <span
        className="absolute right-8 top-6 font-display font-bold select-none pointer-events-none leading-none"
        aria-hidden="true"
        style={{ fontSize: "9rem", color: "rgba(255,255,255,0.06)", lineHeight: 1 }}
      >
        &ldquo;
      </span>

      {/* Stars */}
      <Stars count={review.rating} light />

      {/* Quote */}
      <blockquote className="flex-1 mt-6">
        <p
          className="font-display italic leading-relaxed"
          style={{
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
            color: "rgba(246,244,239,0.92)",
          }}
        >
          &ldquo;{review.text}&rdquo;
        </p>
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 mt-8">
        <Avatar name={review.name} light />
        <div>
          <p className="font-body font-semibold text-sm" style={{ color: "rgba(246,244,239,0.95)" }}>
            {review.name}
          </p>
          <p className="font-body text-xs mt-0.5" style={{ color: "rgba(246,244,239,0.5)" }}>
            verified patient
          </p>
        </div>
      </div>

      {/* Subtle bottom shine */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(200,224,214,0.4), transparent)" }}
      />
    </motion.div>
  );
}

/* ── Small card ── */
function SmallCard({
  review,
  delay,
  onClick,
}: {
  review: (typeof TESTIMONIALS)[0];
  delay: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group text-left flex flex-col gap-3 rounded-2xl p-5 cursor-pointer transition-all duration-300"
      style={{
        background: "var(--color-surface)",
        border: "1.5px solid rgba(200,224,214,0.4)",
        boxShadow: "0 4px 20px rgba(10,20,18,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(47,93,82,0.3)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(10,20,18,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,224,214,0.4)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(10,20,18,0.06)";
      }}
    >
      <div className="flex items-center justify-between">
        <Avatar name={review.name} size="sm" />
        <Stars count={review.rating} />
      </div>
      <p
        className="font-display italic text-sm leading-relaxed line-clamp-3"
        style={{ color: "var(--color-ink-soft)" }}
      >
        &ldquo;{review.text}&rdquo;
      </p>
      <p className="font-body font-semibold text-xs" style={{ color: "var(--color-ink)" }}>
        — {review.name}
      </p>
    </motion.button>
  );
}

/* ═══════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════ */
export default function Testimonials() {
  const reducedMotion = useReducedMotion();
  const headerRef     = useRef<HTMLDivElement>(null);
  const inView        = useInView(headerRef, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

  const total = TESTIMONIALS.length;
  const prev  = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);
  const next  = useCallback(() => setActive((i) => (i + 1) % total), [total]);

  /* Auto-advance every 6 s */
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, reducedMotion]);

  const featured = TESTIMONIALS[active];
  const others   = TESTIMONIALS.filter((_, i) => i !== active);

  return (
    <section
      style={{ background: "var(--color-blush)" }}
      aria-labelledby="reviews-heading"
      className="relative overflow-hidden py-12 md:py-16"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 115%, rgba(200,224,214,0.3) 0%, transparent 65%)",
        }}
      />

      <div className="container-site relative z-10 flex flex-col gap-12">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end gap-6 justify-between"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col gap-3">
            <Eyebrow>patient love</Eyebrow>
            <h2
              id="reviews-heading"
              className="font-display font-normal leading-none"
            >
              <span
                className="block font-body font-medium lowercase tracking-wide mb-1"
                style={{ fontSize: "clamp(0.85rem, 1.4vw, 1rem)", color: "var(--color-ink-soft)" }}
              >
                our patients say it best —
              </span>
              <span
                className="block font-semibold text-ink lowercase"
                style={{ fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)", letterSpacing: "-0.03em" }}
              >
                dental point
              </span>
            </h2>
          </div>

          {/* Rating badge */}
          <div
            className="flex items-center gap-5 px-6 py-4 rounded-2xl shrink-0 self-start sm:self-auto"
            style={{
              background: "var(--color-surface)",
              boxShadow:  "0 4px 24px rgba(10,20,18,0.07), 0 1px 4px rgba(10,20,18,0.05)",
              border:     "1.5px solid rgba(200,224,214,0.45)",
            }}
          >
            <div>
              <p className="font-display text-3xl font-bold text-ink">
                <ReviewCounter target={CLINIC.reviewCount} />+
              </p>
              <p className="text-xs font-body mt-0.5" style={{ color: "var(--color-ink-soft)" }}>
                google reviews
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Stars count={5} />
              <p className="text-xs font-body" style={{ color: "var(--color-ink-soft)" }}>
                {CLINIC.rating} avg rating
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-5 items-stretch">

          {/* Featured */}
          <AnimatePresence mode="wait">
            <FeaturedCard key={active} review={featured} />
          </AnimatePresence>

          {/* 2×2 small cards */}
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence mode="wait">
              {others.slice(0, 4).map((review, i) => (
                <SmallCard
                  key={`${active}-${i}`}
                  review={review}
                  delay={i * 0.06}
                  onClick={() => {
                    const idx = TESTIMONIALS.findIndex((t) => t.name === review.name);
                    setActive(idx);
                  }}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between">

          {/* Dot indicators */}
          <div className="flex gap-2" role="tablist" aria-label="Select testimonial">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width:      i === active ? 28 : 8,
                  height:     8,
                  background: i === active ? "var(--color-primary)" : "rgba(47,93,82,0.2)",
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-2">
            {[
              { fn: prev, label: "Previous testimonial", Icon: ChevronLeft },
              { fn: next, label: "Next testimonial",     Icon: ChevronRight },
            ].map(({ fn, label, Icon }) => (
              <button
                key={label}
                onClick={fn}
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200"
                style={{
                  background:   "var(--color-surface)",
                  border:       "1.5px solid rgba(200,224,214,0.5)",
                  color:        "var(--color-ink)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background   = "var(--color-primary)";
                  el.style.color        = "white";
                  el.style.borderColor  = "var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background   = "var(--color-surface)";
                  el.style.color        = "var(--color-ink)";
                  el.style.borderColor  = "rgba(200,224,214,0.5)";
                }}
              >
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
