"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STATS = ["MDS specialists", "0% EMI plans", "Same-week booking"];

const STEPS = [
  {
    id: "step-1",
    title: "Expert MDS-qualified implantologists & cosmetic specialists",
    text: "Our team holds advanced post-graduate qualifications in implantology and cosmetic dentistry — giving you specialist-level care in a single clinic.",
  },
  {
    id: "step-2",
    title: "State-of-the-art 3D CBCT imaging & guided surgery",
    text: "A cone beam CT scanner creates a precise 3D map of your jaw before we begin — so every implant is planned with sub-millimeter accuracy.",
  },
  {
    id: "step-3",
    title: "Painless dentistry with gentle anaesthesia techniques",
    text: "From topical numbing gels to computer-controlled injections, we eliminate the fear of the needle and make every procedure genuinely comfortable.",
  },
  {
    id: "step-4",
    title: "Flexible EMI options — 0% interest plans available",
    text: "Spread the cost of your implant or smile makeover into small monthly payments. We work with leading finance partners to keep your smile affordable.",
  },
];

const PANEL_TABS = [
  { label: "clinic", src: "/images/details-luxury-amenities.webp" },
  { label: "treatment", src: "/images/gallery-treatment-room-1.webp" },
  { label: "suite", src: "/images/gallery-treatment-room-2.webp" },
  { label: "interior", src: "/images/hero-clinic-interior.webp" },
];

function AccordionStep({
  step,
  isOpen,
  onToggle,
  index,
  inView,
  reducedMotion,
}: {
  step: (typeof STEPS)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  inView: boolean;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      className="border-b"
      style={{ borderColor: "var(--color-line)" }}
      initial={reducedMotion ? {} : { opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.08, duration: 0.7 }}
    >
      <button
        className="w-full flex items-center justify-between py-4 text-left gap-4"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-body font-medium text-ink text-sm leading-snug">
          {step.title}
        </span>
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{
            background: isOpen ? "var(--color-primary)" : "var(--color-mint)",
          }}
        >
          {isOpen ? (
            <Minus size={13} color="white" />
          ) : (
            <Plus size={13} style={{ color: "var(--color-primary)" }} />
          )}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-ink-soft leading-relaxed">
              {step.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function DetailsList() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openStep, setOpenStep] = useState<string | null>("step-1");
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="details"
      ref={ref}
      className="py-16 md:py-20 overflow-hidden"
      style={{ background: "var(--color-bg)" }}
      aria-labelledby="details-heading"
    >
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left column */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <Eyebrow>what sets us apart</Eyebrow>
            </motion.div>

            <motion.h2
              id="details-heading"
              className="font-display font-normal text-ink lowercase leading-tight tracking-tight"
              initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.9 }}
            >
              <span className="block text-base md:text-lg text-ink-soft/65 font-body font-medium lowercase tracking-wide mb-1">
                it&apos;s all in the details —
              </span>
              <span
                className="block font-semibold text-ink leading-none"
                style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", letterSpacing: "-0.03em" }}
              >
                dental point
              </span>
            </motion.h2>

            <motion.p
              className="text-ink-soft leading-relaxed max-w-md"
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              From the moment you arrive to the moment you leave, every detail
              is crafted around your comfort and confidence.
            </motion.p>

            {/* Stats chips */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.7 }}
            >
              {STATS.map((stat, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-wide"
                  style={{
                    background: "var(--color-mint)",
                    color: "var(--color-primary)",
                  }}
                >
                  {stat}
                </span>
              ))}
            </motion.div>

            {/* Accordion */}
            <div className="mt-2">
              {STEPS.map((step, i) => (
                <AccordionStep
                  key={step.id}
                  step={step}
                  isOpen={openStep === step.id}
                  onToggle={() =>
                    setOpenStep(openStep === step.id ? null : step.id)
                  }
                  index={i}
                  inView={inView}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 mt-2"
              initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <Button href="#contact">book consultation</Button>
              <Button href="#services" variant="ghost">
                browse services
              </Button>
            </motion.div>
          </div>

          {/* Right column — image panel with tab switcher */}
          <motion.div
            className="relative overflow-hidden rounded-[2rem]"
            style={{
              aspectRatio: "4/5",
              boxShadow: "var(--shadow-lift)",
              border: "1px solid var(--color-line)",
            }}
            initial={reducedMotion ? {} : { opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Images */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              >
                <Image
                  src={PANEL_TABS[activeTab].src}
                  alt={`Dental Point — ${PANEL_TABS[activeTab].label}`}
                  fill
                  quality={85}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Bottom gradient */}
            <div
              className="absolute inset-x-0 bottom-0 h-36 pointer-events-none z-[1]"
              style={{
                background:
                  "linear-gradient(to top, rgba(26,36,33,0.6) 0%, transparent 100%)",
              }}
            />

            {/* Tab controls */}
            <div className="absolute inset-x-0 bottom-5 z-10 flex w-full justify-center">
              <div
                className="flex gap-1.5 rounded-xl p-1"
                style={{
                  background: "rgba(246,244,239,0.82)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(200,224,214,0.35)",
                }}
              >
                {PANEL_TABS.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className="px-4 py-2 rounded-lg text-xs font-body font-semibold uppercase tracking-wide transition-all duration-200"
                    style={
                      i === activeTab
                        ? {
                            background: "var(--color-primary)",
                            color: "white",
                          }
                        : {
                            background: "transparent",
                            color: "var(--color-ink)",
                          }
                    }
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
