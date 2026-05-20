"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { DOCTORS } from "@/lib/constants";
import Eyebrow from "@/components/ui/Eyebrow";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DottedSurface } from "@/components/ui/DottedSurface";

/* ══════════════════════════════════════════
   MOBILE FLIP CARD — CSS-only, no Framer Motion
   Tap front → flips to credentials/bio
   Tap back  → flips back
   ══════════════════════════════════════════ */
function MobileFlipCard({ doctor }: { doctor: (typeof DOCTORS)[0] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="flex-shrink-0"
      style={{
        width:       "72vw",
        maxWidth:    "280px",
        minWidth:    "220px",
        perspective: "1200px",
        scrollSnapAlign: "center",
      }}
    >
      {/* Flip wrapper — CSS transition only, zero JS per frame */}
      <div
        onClick={() => setFlipped((f) => !f)}
        style={{
          aspectRatio:    "3 / 4",
          position:       "relative",
          transformStyle: "preserve-3d",
          transition:     "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
          transform:      flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          cursor:         "pointer",
          userSelect:     "none",
        }}
      >
        {/* ── FRONT — photo + name ── */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            borderRadius:           "1.75rem",
            backfaceVisibility:     "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Image
            src={doctor.image}
            alt={`Portrait of ${doctor.name}`}
            fill
            quality={80}
            className="object-cover object-top"
            sizes="72vw"
          />

          {/* Dark gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,20,18,0.92) 0%, rgba(10,20,18,0.38) 45%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* MDS badge */}
          <div
            className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-body font-semibold uppercase tracking-widest text-white"
            style={{ background: "rgba(47,93,82,0.9)" }}
          >
            MDS
          </div>

          {/* Tap hint */}
          <div
            className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] text-white/65"
            style={{ background: "rgba(0,0,0,0.45)" }}
            aria-hidden="true"
          >
            tap to flip
          </div>

          {/* Name + credentials */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="font-display text-xl font-semibold text-white lowercase leading-tight">
              {doctor.name.toLowerCase()}
            </p>
            <p className="text-xs text-white/60 mt-1 font-body">{doctor.credentials}</p>
          </div>
        </div>

        {/* ── BACK — bio + details ── */}
        <div
          className="absolute inset-0 flex flex-col p-5"
          style={{
            borderRadius:             "1.75rem",
            backfaceVisibility:       "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform:                "rotateY(180deg)",
            background:               "linear-gradient(145deg, #0a1f17 0%, #1a3328 60%, #0d2018 100%)",
            border:                   "1px solid rgba(200,224,214,0.15)",
          }}
        >
          {/* Avatar initial */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-display text-xl font-bold flex-shrink-0 mb-3"
            style={{ background: "var(--color-primary)" }}
            aria-hidden="true"
          >
            {doctor.name.split(" ")[1]?.[0] ?? doctor.name[0]}
          </div>

          <p className="font-display text-lg font-semibold text-white lowercase leading-tight mb-0.5">
            {doctor.name.toLowerCase()}
          </p>
          <p
            className="text-[11px] font-medium uppercase tracking-wide mb-3"
            style={{ color: "var(--color-mint)" }}
          >
            {doctor.credentials}
          </p>

          {/* Experience badge */}
          <span
            className="self-start text-[10px] font-body font-bold uppercase tracking-widest px-2 py-0.5 rounded mb-3"
            style={{ background: "rgba(200,224,214,0.12)", color: "var(--color-mint)" }}
          >
            {doctor.experience}
          </span>

          <p className="text-sm text-white/65 leading-relaxed flex-1 line-clamp-5 mb-3">
            {doctor.bio}
          </p>

          {/* Language chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {doctor.languages.map((lang) => (
              <span
                key={lang}
                className="text-[10px] font-body px-2 py-0.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(246,244,239,0.5)" }}
              >
                {lang}
              </span>
            ))}
          </div>

          {/* Flip-back hint */}
          <p className="text-[9px] text-white/25 text-center tracking-widest uppercase">
            tap to flip back
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   DESKTOP 3-D TILT CARD — unchanged
   ══════════════════════════════════════════ */
function DoctorCard({
  doctor,
  index,
}: {
  doctor: (typeof DOCTORS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300, damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300, damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-pointer overflow-hidden rounded-[var(--radius-lg)] aspect-[3/4]"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        rotate: index === 0 ? -3 : 2,
        zIndex: index === 0 ? 2 : 1,
        marginTop: index === 1 ? "4rem" : 0,
        boxShadow: "var(--shadow-lift)",
        transformStyle: "preserve-3d",
      }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 10, boxShadow: "0 32px 64px rgba(26,36,33,0.25)" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={doctor.image}
        alt={`Portrait of ${doctor.name}`}
        fill
        quality={90}
        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 80vw, 30vw"
      />

      <div
        className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-body font-semibold uppercase tracking-widest text-white"
        style={{ background: "rgba(47,93,82,0.85)", backdropFilter: "blur(8px)" }}
      >
        MDS
      </div>

      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(10,20,18,0.92) 0%, rgba(10,20,18,0.45) 40%, transparent 70%)" }}
        aria-hidden="true"
      />

      <motion.div
        className="absolute bottom-0 left-0 right-0 p-5"
        initial={{ y: 6 }}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-display text-xl font-semibold text-white lowercase leading-tight">
          {doctor.name.toLowerCase()}
        </p>
        <p className="text-xs text-white/65 mt-1 font-body">{doctor.credentials}</p>
        <motion.p
          className="text-[11px] text-accent font-medium mt-2 tracking-wide uppercase"
          initial={{ opacity: 0, y: 4 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          view profile →
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(115deg, transparent 40%, rgba(200,224,214,0.12) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        initial={{ backgroundPosition: "200% 0" }}
        whileHover={{ backgroundPosition: "-200% 0" }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   ROOT — picks mobile vs desktop after mount
   ══════════════════════════════════════════ */
export default function Doctors() {
  const reducedMotion = useReducedMotion();
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-16 md:py-20 overflow-hidden"
      aria-labelledby="doctors-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "url('/images/bg-dark-green.png')", backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#091410]/25" style={{ zIndex: 1 }} aria-hidden="true" />
      <DottedSurface className="z-[2]" />

      <div className="relative z-10">

        {/* ══ MOBILE — tap-to-flip snap carousel ══ */}
        {isMobile && (
          <div className="flex flex-col gap-8 pb-4">

            {/* Header */}
            <div className="px-6">
              <Eyebrow dark>meet the team</Eyebrow>
              <h2
                id="doctors-heading"
                className="font-display font-normal text-white lowercase leading-tight tracking-tight mt-3"
              >
                <span className="block text-sm text-white/50 font-body font-medium lowercase tracking-wide mb-1">
                  top-rated dentists at
                </span>
                <span
                  className="block font-semibold text-white leading-none"
                  style={{ fontSize: "clamp(2.4rem, 10vw, 3.5rem)", letterSpacing: "-0.03em" }}
                >
                  dental point
                </span>
              </h2>
              <p className="text-white/65 text-sm leading-relaxed mt-4 max-w-xs">
                Our doctors combine cutting-edge training with an unhurried approach to care.
              </p>
            </div>

            {/* Flip card carousel — native scroll, no JS */}
            <div
              className="flex gap-4 pl-6"
              style={{
                overflowX:              "auto",
                scrollSnapType:         "x mandatory",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth:         "none",
                paddingRight:           "1.5rem",
                paddingBottom:          "1rem",
              }}
            >
              {DOCTORS.map((doc) => (
                <MobileFlipCard key={doc.name} doctor={doc} />
              ))}
            </div>

            {/* Scroll hint dots */}
            <div className="flex justify-center gap-1.5 -mt-2" aria-hidden="true">
              {DOCTORS.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: i === 0 ? "var(--color-mint)" : "rgba(255,255,255,0.2)" }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ══ DESKTOP — original overlapping tilt cards ══ */}
        {!isMobile && (
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Left — overlapping doctor cards */}
              <div
                className="relative flex justify-center items-center gap-8 h-[520px] lg:h-[620px]"
                aria-label="Doctor portraits"
              >
                {DOCTORS.map((doc, i) => (
                  <motion.div
                    key={doc.name}
                    className="absolute"
                    style={{ left: i === 0 ? "5%" : "auto", right: i === 1 ? "5%" : "auto", width: "55%" }}
                    initial={reducedMotion ? {} : { opacity: 0, y: 80, scale: 0.95 }}
                    animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: i * 0.18, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <DoctorCard doctor={doc} index={i} />
                  </motion.div>
                ))}
              </div>

              {/* Right — copy + doctor list */}
              <div className="flex flex-col gap-6">
                <motion.div
                  initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Eyebrow dark>meet the team</Eyebrow>
                </motion.div>

                <motion.h2
                  id="doctors-heading"
                  className="font-display font-normal text-white lowercase leading-tight tracking-tight"
                  initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="block text-base md:text-lg text-white/50 font-body font-medium lowercase tracking-wide mb-1">
                    top-rated dentists at
                  </span>
                  <span
                    className="block font-semibold text-white leading-none"
                    style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", letterSpacing: "-0.03em" }}
                  >
                    dental point
                  </span>
                </motion.h2>

                <motion.p
                  className="text-white/70 leading-relaxed max-w-md"
                  initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  Our doctors combine cutting-edge training with an unhurried
                  approach to care. No lecture. No judgment. Just a genuine
                  partnership in your dental health.
                </motion.p>

                <div className="flex flex-col gap-4 mt-4">
                  {DOCTORS.map((doc, i) => (
                    <motion.div
                      key={doc.name}
                      className="flex items-start gap-4 p-5 rounded-[var(--radius-md)] border cursor-pointer transition-all duration-300"
                      style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)" }}
                      initial={reducedMotion ? {} : { opacity: 0, x: 40 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ borderColor: "rgba(200,224,214,0.35)", background: "rgba(200,224,214,0.1)", x: 4 }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-display text-lg font-semibold"
                        style={{ background: "var(--color-primary)" }}
                        aria-hidden="true"
                      >
                        {doc.name.split(" ")[1][0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-display text-base font-semibold text-white lowercase">
                            {doc.name.toLowerCase()}
                          </p>
                          <span className="text-[10px] font-body font-bold uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ background: "rgba(200,224,214,0.15)", color: "var(--color-mint)" }}>
                            {doc.experience}
                          </span>
                        </div>
                        <p className="text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: "var(--color-mint)" }}>
                          {doc.credentials}
                        </p>
                        <p className="text-sm text-white/60 line-clamp-2 mb-2">{doc.bio}</p>
                        <div className="flex flex-wrap gap-1">
                          {doc.languages.map((lang) => (
                            <span key={lang} className="text-[10px] font-body px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(246,244,239,0.5)" }}>
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
