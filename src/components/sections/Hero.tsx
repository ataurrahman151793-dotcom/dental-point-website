"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronDown } from "lucide-react";
import { Star } from "lucide-react";
import { CLINIC } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const VIDEOS = ["/videos/video1.mp4", "/videos/video2.mp4", "/videos/video3.mp4"];

/* ─── Three stacked videos — crossfade on end, no flash ─── */
function SequentialVideo() {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null]);

  const advance = useCallback((finished: number) => {
    const next = (finished + 1) % VIDEOS.length;
    setActive(next);
    videoRefs.current[next]?.play().catch(() => {});
  }, []);

  return (
    <div className="relative w-full h-full" style={{ background: "#000" }}>
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => { videoRefs.current[i] = el; }}
          src={src}
          autoPlay={i === 0}
          muted
          playsInline
          preload={i === 0 ? "auto" : "metadata"}
          onEnded={() => advance(i)}
          aria-label="Dental Point clinic showcase"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: active === i ? 1 : 0, transition: "opacity 0.6s ease" }}
        />
      ))}
    </div>
  );
}

/* ─── Avatar strip ─── */
function AvatarStack() {
  const avatars = ["E", "D", "A", "K"];
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {avatars.map((initial, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center text-xs font-semibold text-white"
            style={{ background: `hsl(${160 + i * 15}, 35%, ${45 + i * 5}%)` }}
            aria-hidden="true"
          >
            {initial}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} className="text-[#D8B589] fill-[#D8B589]" />
          ))}
        </div>
        <span className="text-sm font-medium text-white/60">
          {CLINIC.rating} · {CLINIC.reviewCount}+ google reviews
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MOBILE HERO — full-bleed video, static, no scroll animation
   ══════════════════════════════════════════ */
function MobileHero() {
  return (
    <section className="relative overflow-hidden flex flex-col" style={{ height: "100dvh" }} aria-label="Hero">

      {/* Full-bleed video background */}
      <div className="absolute inset-0 z-0">
        <video
          src={VIDEOS[0]}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Strong gradient — dark at top for text, fades mid, dark at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.62) 40%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.80) 100%)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-[90px] flex-1">

        {/* Eyebrow badge */}
        <span
          className="inline-block rounded-full px-4 py-1.5 text-[10px] font-body uppercase tracking-[0.18em] text-white/80 mb-6"
          style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          Northeast India&apos;s premier implant centre
        </span>

        {/* Headline — large, bold, premium */}
        <h1
          className="font-display font-bold text-white lowercase mb-3"
          style={{
            fontSize: "clamp(3.2rem, 13vw, 4.8rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.025em",
          }}
        >
          elevate<br />your smile
        </h1>

        {/* Gold accent line */}
        <div
          className="w-10 h-[2px] mb-5 mt-1"
          style={{ background: "var(--color-accent)" }}
          aria-hidden="true"
        />

        {/* Subtitle — short and punchy */}
        <p className="text-[14.5px] text-white/72 leading-relaxed mb-7" style={{ maxWidth: 270 }}>
          Computer-guided implants, same-day crowns &amp; painless laser treatment by MDS specialists.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3 w-full mb-7" style={{ maxWidth: 280 }}>
          <Button href="#contact" variant="primary">schedule now</Button>
          <a
            href={CLINIC.phoneHref}
            className="flex items-center justify-center gap-2 rounded-full text-white/90 text-sm font-medium"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.22)",
              padding: "12px 24px",
              minHeight: 48,
            }}
          >
            <Phone size={14} />
            call {CLINIC.phone}
          </a>
        </div>

        {/* Rating strip */}
        <AvatarStack />
      </div>

      {/* Scroll hint — at bottom */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 pb-7 text-white" aria-hidden="true">
        <span className="text-[9px] font-body uppercase tracking-[0.18em] opacity-40">scroll to explore</span>
        <ChevronDown size={16} className="opacity-35" />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   DESKTOP HERO — scroll-driven expanding video box (unchanged)
   ══════════════════════════════════════════ */
function DesktopHero({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const boxWidth  = useTransform(scrollYProgress, (p) => `${60 + 40 * p}%`);
  const boxHeight = useTransform(scrollYProgress, (p) => `${60 + 40 * p}vh`);
  const boxRadius = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const boxShadow = useTransform(scrollYProgress, [0, 0.7, 1], [
    "0 30px 80px rgba(0,0,0,0.4)",
    "0 10px 30px rgba(0,0,0,0.15)",
    "0 0px 0px rgba(0,0,0,0)",
  ]);
  const bgDark      = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.45, 0.7]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <div ref={containerRef} style={{ height: "180vh" }} className="relative">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">

        {/* Background image — natural colour, darkens on scroll */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-background.png"
            alt=""
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
          <motion.div
            className="absolute inset-0"
            style={{ background: "#000", opacity: prefersReducedMotion ? 0.4 : bgDark }}
          />
        </div>

        {/* Text + CTAs */}
        <motion.div
          className="absolute inset-x-0 top-0 z-20 flex flex-col items-center text-center gap-5 pt-28 px-6"
          style={{
            opacity: prefersReducedMotion ? 1 : textOpacity,
            y:       prefersReducedMotion ? 0 : textY,
          }}
        >
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-body uppercase tracking-widest text-white/70">
            Northeast India&apos;s premier implant centre
          </span>
          <h1
            className="font-display font-bold text-white lowercase leading-tight"
            style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}
          >
            elevate<br />your smile
          </h1>
          <p className="text-base md:text-lg text-white/65 leading-relaxed max-w-lg">
            Computer-guided implants, same-day crowns, and painless laser
            treatment — all delivered by MDS-qualified specialists who
            genuinely care about your smile.
          </p>
          <div className="flex gap-4 items-center">
            <Button href="#contact" variant="primary">schedule now</Button>
            <a
              href={CLINIC.phoneHref}
              className="flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-6 py-3 text-white/90 text-sm font-medium hover:bg-white/15 transition-colors"
            >
              <Phone size={15} />
              call {CLINIC.phone}
            </a>
          </div>
          <AvatarStack />
        </motion.div>

        {/* Expanding video box */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <motion.div
            style={{
              width:        prefersReducedMotion ? "60%" : boxWidth,
              height:       prefersReducedMotion ? "60vh" : boxHeight,
              borderRadius: prefersReducedMotion ? 24 : boxRadius,
              boxShadow:    prefersReducedMotion ? "0 30px 80px rgba(0,0,0,0.4)" : boxShadow,
              overflow:     "hidden",
              willChange:   "width, height, border-radius",
            }}
          >
            {!prefersReducedMotion && <SequentialVideo />}
            {prefersReducedMotion && (
              <video src={VIDEOS[0]} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            )}
          </motion.div>
        </div>

        {/* Scroll hint */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white pointer-events-none"
            style={{ opacity: hintOpacity }}
            aria-hidden="true"
          >
            <span className="text-xs font-body uppercase tracking-widest opacity-70">scroll to explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={22} />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ROOT HERO — picks mobile vs desktop after mount
   ══════════════════════════════════════════ */
export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Before hydration — minimal placeholder avoids layout shift */
  if (isMobile === null) {
    return (
      <div
        className="relative"
        style={{ height: "100dvh", background: "#111816" }}
        aria-hidden="true"
      />
    );
  }

  if (isMobile) return <MobileHero />;
  return <DesktopHero prefersReducedMotion={prefersReducedMotion} />;
}
