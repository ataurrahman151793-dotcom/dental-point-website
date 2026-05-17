"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { DOCTORS } from "@/lib/constants";
import Eyebrow from "@/components/ui/Eyebrow";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DottedSurface } from "@/components/ui/DottedSurface";

/* ── 3-D tilt card ── */
function DoctorCard({
  doctor,
  index,
}: {
  doctor: (typeof DOCTORS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* Mouse-tracking values */
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
      whileHover={{
        rotate: 0,
        scale: 1.04,
        zIndex: 10,
        boxShadow: "0 32px 64px rgba(26,36,33,0.25)",
      }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Photo */}
      <Image
        src={doctor.image}
        alt={`Portrait of ${doctor.name}`}
        fill
        quality={90}
        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 80vw, 30vw"
      />

      {/* Credentials badge — top-right */}
      <div
        className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-body font-semibold uppercase tracking-widest text-white"
        style={{ background: "rgba(47,93,82,0.85)", backdropFilter: "blur(8px)" }}
      >
        MDS
      </div>

      {/* Always-visible bottom gradient + name */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,20,18,0.92) 0%, rgba(10,20,18,0.45) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Name + credentials — always visible, slides up on hover */}
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

        {/* "view profile" — appears on hover */}
        <motion.p
          className="text-[11px] text-accent font-medium mt-2 tracking-wide uppercase"
          initial={{ opacity: 0, y: 4 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          view profile →
        </motion.p>
      </motion.div>

      {/* Shine sweep on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, transparent 40%, rgba(200,224,214,0.12) 50%, transparent 60%)",
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

export default function Doctors() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-16 md:py-20 overflow-hidden"
      aria-labelledby="doctors-heading"
    >
      {/* Dark green textured background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/bg-dark-green.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      {/* Darkening overlay */}
      <div
        className="absolute inset-0 bg-[#091410]/25"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />
      {/* Animated dotted wave on top */}
      <DottedSurface className="z-[2]" />

      <div className="container-site relative z-10">
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
                style={{
                  left: i === 0 ? "5%" : "auto",
                  right: i === 1 ? "5%" : "auto",
                  width: "55%",
                }}
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
                  whileHover={{
                    borderColor: "rgba(200,224,214,0.35)",
                    background: "rgba(200,224,214,0.1)",
                    x: 4,
                  }}
                >
                  {/* Avatar with initial */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-display text-lg font-semibold"
                    style={{ background: "var(--color-primary)" }}
                    aria-hidden="true"
                  >
                    {doc.name.split(" ")[1][0]}
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold text-white lowercase">
                      {doc.name.toLowerCase()}
                    </p>
                    <p className="text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: "var(--color-mint)" }}>
                      {doc.credentials}
                    </p>
                    <p className="text-sm text-white/60 line-clamp-2">{doc.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
