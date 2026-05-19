"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { GlowCard, GLOW_COLORS } from "@/components/ui/GlowCard";

/* One distinct glow per card — blue, teal (popular), purple, gold */
const CARD_GLOW = ["blue", "teal", "purple", "gold"] as const satisfies (keyof typeof GLOW_COLORS)[];
import { useReducedMotion } from "@/hooks/useReducedMotion";

const PLANS = [
  {
    category: "General Care",
    name: "Cleaning & Check-up",
    from: "₹800",
    unit: "per visit",
    description: "Your foundation for a healthy smile — thorough, gentle, and fast.",
    features: [
      "Digital X-rays included",
      "Scaling & polishing",
      "Oral health report",
      "Personalised care plan",
    ],
    popular: false,
    cta: "book a visit",
  },
  {
    category: "Restorative",
    name: "Dental Implants",
    from: "₹28,000",
    unit: "per tooth",
    description: "Permanent, natural-looking teeth with computer-guided precision.",
    features: [
      "3D CBCT scan planning",
      "Titanium implant + crown",
      "Zero-pain procedure",
      "0% EMI available",
    ],
    popular: true,
    cta: "get a free quote",
  },
  {
    category: "Cosmetic",
    name: "Clear Aligners",
    from: "₹65,000",
    unit: "full treatment",
    description: "Straighten your teeth invisibly — no wires, no discomfort.",
    features: [
      "Invisible & removable",
      "12–18 month timeline",
      "Monthly progress reviews",
      "Retainers included",
    ],
    popular: false,
    cta: "start your plan",
  },
  {
    category: "Smile Design",
    name: "Veneers",
    from: "₹6,000",
    unit: "per tooth",
    description: "Transform your smile with precision-crafted porcelain shells.",
    features: [
      "Porcelain or composite",
      "Shade-matched to you",
      "Minimal tooth removal",
      "10+ year durability",
    ],
    popular: false,
    cta: "design my smile",
  },
];

interface PlanCardProps {
  plan: (typeof PLANS)[0];
  index: number;
  glowColor: (typeof CARD_GLOW)[number];
}

function PlanCard({ plan, index, glowColor }: PlanCardProps) {
  const isPopular = plan.popular;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <GlowCard
        glowColor={glowColor}
        bg={isPopular ? "rgba(47,93,82,0.28)" : "rgba(255,255,255,0.04)"}
        border={isPopular ? "rgba(200,224,214,0.35)" : "rgba(255,255,255,0.08)"}
        className={`flex flex-col p-6 md:p-7 h-full overflow-hidden${isPopular ? " pricing-popular-glow" : ""}`}
      >
        {/* Popular radial glow overlay */}
        {isPopular && (
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(200,224,214,0.14) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
        )}

        {/* All content above the overlay */}
        <div className="relative z-10 flex flex-col h-full">

          {/* Popular badge */}
          {isPopular && (
            <span
              className="absolute top-0 right-0 text-[9px] font-body font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: "var(--color-accent)", color: "var(--color-ink)" }}
            >
              most popular
            </span>
          )}

          {/* Category */}
          <p className="font-body text-[10px] uppercase tracking-widest mb-4"
            style={{ color: "rgba(200,224,214,0.5)" }}>
            {plan.category}
          </p>

          {/* Service name */}
          <h3
            className="font-display font-semibold lowercase leading-tight mb-2"
            style={{
              fontSize: "clamp(1.1rem, 1.7vw, 1.3rem)",
              color: isPopular ? "rgba(246,244,239,0.98)" : "rgba(246,244,239,0.85)",
            }}
          >
            {plan.name}
          </h3>

          {/* Price */}
          <div className="flex items-end gap-1.5 mb-3">
            <span className="font-body text-xs font-medium"
              style={{ color: "rgba(200,224,214,0.45)", lineHeight: 2 }}>
              from
            </span>
            <span
              className="font-display font-bold leading-none"
              style={{
                fontSize: "clamp(1.55rem, 2.4vw, 1.9rem)",
                color: isPopular ? "rgba(246,244,239,0.98)" : "rgba(246,244,239,0.88)",
              }}
            >
              {plan.from}
            </span>
            <span className="font-body text-xs mb-0.5"
              style={{ color: "rgba(200,224,214,0.4)" }}>
              {plan.unit}
            </span>
          </div>

          {/* Description */}
          <p className="font-body text-sm leading-relaxed mb-5"
            style={{ color: "rgba(200,224,214,0.55)" }}>
            {plan.description}
          </p>

          {/* Divider */}
          <div className="h-px mb-5"
            style={{ background: isPopular ? "rgba(200,224,214,0.18)" : "rgba(255,255,255,0.06)" }}
          />

          {/* Features */}
          <ul className="flex flex-col gap-2.5 mb-7 flex-1">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <Check size={13} className="mt-0.5 flex-shrink-0"
                  style={{ color: isPopular ? "rgba(200,224,214,0.9)" : "rgba(200,224,214,0.55)" }}
                />
                <span className="font-body text-sm"
                  style={{ color: "rgba(246,244,239,0.6)" }}>
                  {f}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 rounded-xl py-3 font-body font-semibold text-sm transition-all duration-200 group"
            style={
              isPopular
                ? { background: "var(--color-accent)", color: "var(--color-ink)" }
                : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(246,244,239,0.75)" }
            }
            onMouseEnter={(e) => {
              if (!isPopular) {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(246,244,239,0.95)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isPopular) {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(246,244,239,0.75)";
              }
            }}
          >
            {plan.cta}
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </GlowCard>
    </motion.div>
  );
}

export default function Pricing() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        backgroundImage: "url('/images/bg-dark-green.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay to deepen contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "rgba(5,18,13,0.45)" }}
      />

      {/* Subtle center radial glow to lift the cards */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(47,93,82,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="container-site relative z-10 flex flex-col gap-12">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end gap-6 justify-between"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col gap-3 max-w-lg">
            <Eyebrow style={{ color: "rgba(200,224,214,0.65)" }}>
              transparent pricing
            </Eyebrow>
            <h2
              id="pricing-heading"
              className="font-display font-semibold lowercase leading-tight"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                letterSpacing: "-0.03em",
                color: "rgba(246,244,239,0.96)",
              }}
            >
              honest prices,
              <br />
              <em
                className="not-italic"
                style={{ color: "var(--color-accent)" }}
              >
                no surprises.
              </em>
            </h2>
            <p
              className="font-body text-sm leading-relaxed max-w-sm"
              style={{ color: "rgba(200,224,214,0.55)" }}
            >
              Every quote is confirmed after your consultation. EMI options
              available on all major treatments.
            </p>
          </div>

          {/* EMI callout */}
          <div
            className="flex items-center gap-4 px-5 py-4 rounded-2xl shrink-0 self-start sm:self-auto"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1.5px solid rgba(200,224,214,0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-sm"
              style={{ background: "var(--color-accent)", color: "var(--color-ink)" }}
            >
              0%
            </div>
            <div>
              <p
                className="font-body font-semibold text-sm"
                style={{ color: "rgba(246,244,239,0.9)" }}
              >
                0% interest EMI
              </p>
              <p
                className="font-body text-xs mt-0.5"
                style={{ color: "rgba(200,224,214,0.5)" }}
              >
                available on implants & smile makeovers
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} glowColor={CARD_GLOW[i]} />
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          className="text-center flex flex-col gap-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-body text-xs" style={{ color: "rgba(200,224,214,0.35)" }}>
            Prices shown are starting estimates. Final cost confirmed after your free consultation.
          </p>
          <p className="font-body text-xs font-medium" style={{ color: "rgba(200,224,214,0.5)" }}>
            All prices include GST. No hidden charges. EMI starts from ₹1,500/month.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
