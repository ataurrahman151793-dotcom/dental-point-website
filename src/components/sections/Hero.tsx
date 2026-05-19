"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import { Phone, Star, ChevronDown } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { CLINIC } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";

const ToothScene = dynamic(() => import("@/components/three/ToothScene"), { ssr: false });

/* ─── Site palette aurora colours ─── */
const AURORA_COLORS = ["#2F5D52", "#C8E0D6", "#D8B589", "#5B8C7E"];

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

/* ─── Aurora content section (after sticky scroll zone) ─── */
function AuroraSection() {
  const color = useMotionValue(AURORA_COLORS[0]);

  useEffect(() => {
    const controls = animate(color, AURORA_COLORS, {
      ease: "easeInOut",
      duration: 8,
      repeat: Infinity,
      repeatType: "mirror",
    });
    return controls.stop;
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #0D1A17 50%, ${color})`;
  const border          = useMotionTemplate`1px solid ${color}`;
  const boxShadow       = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-8 py-24 md:px-16"
    >
      {/* Star field */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={600} factor={4} fade speed={1.2} />
        </Canvas>
      </div>

      {/* Two-column layout — text left, 3D tooth right on desktop */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

        {/* Left — copy */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8 flex-1">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-body uppercase tracking-widest text-white/70">
            Northeast India&apos;s premier implant centre
          </span>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            precision care,{" "}
            <span className="bg-gradient-to-r from-[#D8B589] to-[#C8E0D6] bg-clip-text text-transparent">
              crafted
            </span>{" "}
            for your comfort
          </h2>

          <p className="text-lg text-white/65 leading-relaxed max-w-lg">
            Computer-guided implants, same-day crowns, and painless laser treatment — all delivered by MDS-qualified specialists who genuinely care about your smile.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button href="#contact" variant="primary">schedule now</Button>
            <motion.a
              href={CLINIC.phoneHref}
              style={{ border, boxShadow }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="group flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-white/90 transition-colors hover:bg-white/10 text-sm font-medium"
            >
              <Phone size={15} />
              call {CLINIC.phone}
            </motion.a>
          </div>

          <AvatarStack />
        </div>

        {/* Right — 3D Tooth (hidden on mobile) */}
        <motion.div
          className="hidden lg:block flex-shrink-0"
          style={{ width: 380, height: 440 }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <ToothScene />
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   HERO — sticky scroll-expand (300 vh zone)
   ═══════════════════════════════════════════ */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const EXP = 0.88;

  /* Box expands from small → full screen */
  const mediaWidth  = useTransform(scrollYProgress, [0, EXP], [300, 2400]);
  const mediaHeight = useTransform(scrollYProgress, [0, EXP], [400, 1400]);
  const radius      = useTransform(scrollYProgress, [0, EXP], [16, 0]);

  /* Dark tint lifts as box fills screen */
  const boxOverlay = useTransform(scrollYProgress, [0, EXP], [0.3, 0]);

  /* Background video fades out */
  const bgOpacity = useTransform(scrollYProgress, [0, EXP * 0.6], [1, 0]);

  /* Title splits apart */
  const amt = useTransform(scrollYProgress, [0, EXP], [0, 160]);
  const tL  = useMotionTemplate`translateX(-${amt}vw)`;
  const tR  = useMotionTemplate`translateX(${amt}vw)`;

  /* Scroll hint fades on first scroll */
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <>
      {/* ── 300 vh sticky scroll zone ── */}
      <div ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-[100dvh] overflow-hidden">

          {/* Background video (video2 + video3) */}
          <motion.div className="absolute inset-0 z-0" style={{ opacity: bgOpacity }}>
            {/* TODO[ASSET]: add poster="/images/hero-poster.jpg" (1920×1080) once asset is ready */}
            <video
              src="/videos/bg-video.mp4"
              autoPlay muted loop playsInline preload="metadata"
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.7) 100%)",
              }}
            />
          </motion.div>

          {/* Expanding box (video1 + video4) */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              style={{
                width: mediaWidth,
                height: mediaHeight,
                borderRadius: radius,
                maxWidth: "100vw",
                maxHeight: "100dvh",
                boxShadow: "0 0 80px rgba(0,0,0,0.45)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <video
                src="/videos/box-video.mp4"
                autoPlay muted loop playsInline preload="metadata"
                className="w-full h-full object-cover"
              />
              {/* lighter box tint — starts at 0.3 (was 0.55) */}
              <motion.div
                className="absolute inset-0 bg-black pointer-events-none"
                style={{ opacity: boxOverlay }}
              />
            </motion.div>
          </div>

          {/* Splitting headline */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-3 mix-blend-difference pointer-events-none">
            <motion.h1
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white lowercase"
              style={{
                transform: tL,
                textShadow: "0 2px 30px rgba(0,0,0,0.4)",
              }}
            >
              elevate
            </motion.h1>
            <motion.h1
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white lowercase"
              style={{
                transform: tR,
                textShadow: "0 2px 30px rgba(0,0,0,0.4)",
              }}
            >
              your smile
            </motion.h1>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white z-30"
            style={{ opacity: hintOpacity }}
            aria-hidden="true"
          >
            <span className="text-xs font-body uppercase tracking-widest opacity-70">
              scroll to expand
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={22} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Aurora section — slides in after sticky zone ── */}
      <AuroraSection />
    </>
  );
}
