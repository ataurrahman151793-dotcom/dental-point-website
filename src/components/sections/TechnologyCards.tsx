"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Scan, Crosshair, Zap } from "lucide-react";
import { TECHNOLOGY } from "@/lib/constants";
import Eyebrow from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

const TECH_ICONS = [Scan, Crosshair, Zap];
const AUTO_PLAY_INTERVAL = 3500;
const ITEM_HEIGHT = 72;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function TechnologyCards() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  /* once:false so inView goes false when user scrolls away → pauses autoplay */
  const inView       = useInView(ref,       { once: false, margin: "-80px" });
  /* once:true so header animation only fires on first entry */
  const headerInView = useInView(headerRef, { once: true,  margin: "-80px" });

  const total = TECHNOLOGY.length;
  const currentIndex = ((step % total) + total) % total;

  const nextStep = useCallback(() => setStep((prev) => prev + 1), []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + total) % total;
    if (diff > 0) setStep((s) => s + diff);
  };

  /* Pause interval when section is off-screen or user is hovering */
  useEffect(() => {
    if (isPaused || !inView) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused, inView]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = total;
    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;
    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <section
      ref={ref}
      id="technology"
      className="py-16 md:py-20"
      style={{ background: "var(--color-bg)" }}
      aria-labelledby="tech-heading"
    >
      <div className="container-site flex flex-col gap-12">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col gap-3">
            <Eyebrow>our technology</Eyebrow>
            <h2 id="tech-heading" className="font-display font-normal text-ink lowercase leading-tight tracking-tight">
              <span className="block text-base md:text-lg text-ink-soft/65 font-body font-medium lowercase tracking-wide mb-1">
                tools that change everything —
              </span>
              <span
                className="block font-semibold text-ink leading-none"
                style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", letterSpacing: "-0.03em" }}
              >
                dental point
              </span>
            </h2>
          </div>
          <p className="text-ink-soft max-w-xs text-sm leading-relaxed sm:text-right">
            We invest in technology so you experience less pain, fewer visits,
            and results that last.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[3.5rem] flex flex-col lg:flex-row border"
          style={{
            minHeight: "500px",
            borderColor: "var(--color-line)",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left — scrolling pill list */}
          <div
            className="w-full lg:w-[40%] relative z-30 flex flex-col items-start justify-center overflow-hidden px-10 md:px-14"
            style={{
              minHeight: "280px",
              background: "var(--color-primary)",
            }}
          >
            {/* Top fade */}
            <div
              className="absolute inset-x-0 top-0 h-16 z-40 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, var(--color-primary) 0%, transparent 100%)",
              }}
            />
            {/* Bottom fade */}
            <div
              className="absolute inset-x-0 bottom-0 h-16 z-40 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, var(--color-primary) 0%, transparent 100%)",
              }}
            />

            <div className="relative w-full h-full flex items-center justify-start z-20 py-16">
              {TECHNOLOGY.map((tech, index) => {
                const isActive = index === currentIndex;
                const distance = index - currentIndex;
                const wrappedDistance = wrap(-(total / 2), total / 2, distance);
                const Icon = TECH_ICONS[index];

                return (
                  <motion.div
                    key={tech.title}
                    style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                    animate={{
                      y: wrappedDistance * ITEM_HEIGHT,
                      opacity: 1 - Math.abs(wrappedDistance) * 0.4,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 22,
                      mass: 1,
                    }}
                    className="absolute flex items-center justify-start"
                  >
                    <button
                      onClick={() => handleChipClick(index)}
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      className={cn(
                        "relative flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-500 text-left border",
                        isActive
                          ? "bg-white border-white"
                          : "bg-transparent border-white/20 hover:border-white/40"
                      )}
                      style={
                        isActive
                          ? { color: "var(--color-primary)" }
                          : { color: "rgba(255,255,255,0.55)" }
                      }
                    >
                      <Icon size={18} strokeWidth={2} />
                      <span className="font-body font-medium text-sm tracking-wide uppercase whitespace-nowrap">
                        {tech.title}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right — image card panel */}
          <div
            className="flex-1 relative flex items-center justify-center overflow-hidden border-t lg:border-t-0 lg:border-l"
            style={{
              minHeight: "420px",
              background: "var(--color-surface)",
              borderColor: "var(--color-line)",
              padding: "3rem 1.5rem",
            }}
          >
            <div className="relative w-full max-w-[360px] flex items-center justify-center" style={{ aspectRatio: "4/5" }}>
              {TECHNOLOGY.map((tech, index) => {
                const status = getCardStatus(index);
                const isActive = status === "active";
                const isPrev = status === "prev";
                const isNext = status === "next";

                return (
                  <motion.div
                    key={tech.title}
                    initial={false}
                    animate={{
                      x: isActive ? 0 : isPrev ? -90 : isNext ? 90 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.88 : 0.7,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.35 : 0,
                      rotate: isPrev ? -3 : isNext ? 3 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 rounded-[2rem] overflow-hidden origin-center"
                    style={{
                      border: "4px solid var(--color-bg)",
                      boxShadow: "var(--shadow-lift)",
                    }}
                  >
                    <Image
                      src={tech.image}
                      alt={tech.title}
                      fill
                      quality={90}
                      className={cn(
                        "object-cover transition-all duration-700",
                        isActive
                          ? "grayscale-0 blur-0"
                          : "grayscale blur-[2px] brightness-75"
                      )}
                      sizes="(max-width: 768px) 80vw, 35vw"
                    />

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute inset-x-0 bottom-0 p-7 pt-28 flex flex-col justify-end pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(10,20,18,0.93) 0%, rgba(10,20,18,0.55) 55%, transparent 100%)",
                          }}
                        >
                          <div
                            className="px-3 py-1 rounded-full text-[10px] font-body font-semibold uppercase tracking-[0.2em] w-fit mb-3"
                            style={{
                              background: "rgba(200,224,214,0.15)",
                              backdropFilter: "blur(8px)",
                              color: "var(--color-mint)",
                              border: "1px solid rgba(200,224,214,0.2)",
                            }}
                          >
                            {`0${index + 1}`} &bull; {tech.title}
                          </div>
                          <p className="text-white font-display text-lg leading-snug">
                            {tech.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Live dot */}
                    <div
                      className={cn(
                        "absolute top-5 left-5 flex items-center gap-2 transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
                      <span className="text-white/70 text-[10px] font-body uppercase tracking-[0.3em]">
                        advanced tech
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
