"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Star, ChevronDown } from "lucide-react";
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
          style={{
            opacity: active === i ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
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
   HERO
   ══════════════════════════════════════════ */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* Box grows on scroll */
  const boxWidth = useTransform(scrollYProgress, (p) => {
    const start = isMobile ? 90 : 60;
    return `${start + (100 - start) * p}%`;
  });
  const boxHeight = useTransform(scrollYProgress, (p) => {
    const start = isMobile ? 50 : 60;
    return `${start + (100 - start) * p}vh`;
  });
  const boxRadius  = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const boxShadow  = useTransform(scrollYProgress, [0, 0.7, 1], [
    "0 30px 80px rgba(0,0,0,0.4)",
    "0 10px 30px rgba(0,0,0,0.15)",
    "0 0px 0px rgba(0,0,0,0)",
  ]);

  /* Background darkens as scroll starts */
  const bgDark = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.45, 0.7]);

  /* Text fades out */
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <div ref={containerRef} style={{ height: "180vh" }} className="relative">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">

        {/* ── Background image — natural colour, darkens on scroll ── */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-background.png"
            alt=""
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
          {/* Scroll-driven dark overlay — starts transparent */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "#000", opacity: prefersReducedMotion ? 0.4 : bgDark }}
          />
        </div>

        {/* ── Text + CTAs ── */}
        <motion.div
          className="absolute inset-x-0 top-0 z-20 flex flex-col items-center text-center gap-5 pt-24 md:pt-28 px-6"
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
          <div className="flex flex-col sm:flex-row gap-4 items-center">
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

        {/* ── Expanding video box ── */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <motion.div
            style={{
              width:        prefersReducedMotion ? (isMobile ? "90%" : "60%") : boxWidth,
              height:       prefersReducedMotion ? (isMobile ? "50vh" : "60vh") : boxHeight,
              borderRadius: prefersReducedMotion ? 24 : boxRadius,
              boxShadow:    prefersReducedMotion ? "0 30px 80px rgba(0,0,0,0.4)" : boxShadow,
              overflow:     "hidden",
              willChange:   "width, height, border-radius",
            }}
          >
            {!prefersReducedMotion && <SequentialVideo />}
            {prefersReducedMotion && (
              <video
                src={VIDEOS[0]}
                autoPlay muted loop playsInline
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </div>

        {/* ── Scroll hint ── */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white pointer-events-none"
            style={{ opacity: hintOpacity }}
            aria-hidden="true"
          >
            <span className="text-xs font-body uppercase tracking-widest opacity-70">
              scroll to explore
            </span>
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
