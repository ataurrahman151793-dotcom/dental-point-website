"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";

const galleryImages = [
  { src: "/images/gallery-reception-area.webp",       label: "reception area" },
  { src: "/images/gallery-treatment-room-1.webp",     label: "treatment room 1" },
  { src: "/images/gallery-waiting-lounge.webp",       label: "waiting lounge" },
  { src: "/images/gallery-cerec-lab.webp",            label: "cerec lab" },
  { src: "/images/gallery-sterilization-center.webp", label: "sterilization center" },
  { src: "/images/gallery-treatment-room-2.webp",     label: "treatment room 2" },
  { src: "/images/gallery-yomi-suite.png",            label: "yomi suite" },
  { src: "/images/gallery-comfort-amenities.png",     label: "comfort amenities" },
  { src: "/images/gallery-panoramic-suite.png",       label: "panoramic suite" },
  { src: "/images/gallery-exterior-entrance.png",     label: "exterior entrance" },
];

const RADIUS     = 680;
const CARD_W     = 280;
const CARD_H     = 390;
const AUTO_SPEED = 0.07;
const ANGLE_PER  = 360 / galleryImages.length;

export default function ComfortGallery() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const inView      = useInView(headerRef, { once: true, margin: "-80px" });

  /* Use a ref for rotation so scroll/RAF don't trigger React re-renders */
  const rotRef      = useRef(0);
  const tickingRef  = useRef(false);  // RAF-throttle flag for scroll
  const scrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafIdRef    = useRef<number>(0);
  const isVisibleRef = useRef(false); // IntersectionObserver flag

  /* Track per-card opacity to know when to re-render */
  const [cards, setCards] = useState(() =>
    galleryImages.map((img, i) => ({ ...img, opacity: i === 0 ? 1 : 0.18 }))
  );

  /* Apply cylinder rotation directly to DOM — no React state update */
  const applyCylinderTransform = useCallback(() => {
    if (cylinderRef.current) {
      cylinderRef.current.style.transform = `rotateY(${rotRef.current}deg)`;
    }
  }, []);

  /* Recompute card opacities (only updates state, called at low frequency) */
  const updateOpacities = useCallback(() => {
    const rot = rotRef.current;
    setCards(galleryImages.map((img, i) => {
      const itemAngle     = i * ANGLE_PER;
      const totalRotation = rot % 360;
      const relAngle      = (itemAngle + totalRotation + 360) % 360;
      const normAngle     = Math.abs(relAngle > 180 ? 360 - relAngle : relAngle);
      return { ...img, opacity: Math.max(0.18, 1 - normAngle / 180) };
    }));
  }, []);

  /* ── Scroll listener — RAF-throttled (max 60fps) ── */
  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress   = scrollable > 0 ? window.scrollY / scrollable : 0;
        rotRef.current   = progress * 360;

        scrollingRef.current = true;
        applyCylinderTransform();
        updateOpacities();

        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          scrollingRef.current = false;
        }, 200);

        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [applyCylinderTransform, updateOpacities]);

  /* ── IntersectionObserver — pause RAF when section is off-screen ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── Auto-rotation RAF — only runs when visible and not scrolling ── */
  useEffect(() => {
    let opacityTimer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (isVisibleRef.current && !scrollingRef.current) {
        rotRef.current += AUTO_SPEED;
        applyCylinderTransform();

        /* Update React state (opacities) at low frequency to avoid re-render storm */
        clearTimeout(opacityTimer);
        opacityTimer = setTimeout(updateOpacities, 150);
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafIdRef.current);
      clearTimeout(opacityTimer);
    };
  }, [applyCylinderTransform, updateOpacities]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="gallery-heading"
      className="relative py-10 md:py-14 overflow-hidden"
      style={{ background: "var(--color-ink)", contain: "layout style" }}
    >
      {/* Ambient radial glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 75%, rgba(47,93,82,0.22) 0%, transparent 70%)",
        }}
      />

      {/* Section header */}
      <motion.div
        ref={headerRef}
        className="container-site relative z-10 flex flex-col gap-4 mb-14"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <Eyebrow dark>designed for comfort</Eyebrow>

        <h2
          id="gallery-heading"
          className="font-display font-normal lowercase leading-tight tracking-tight"
        >
          <span
            className="block font-body font-medium lowercase tracking-wide mb-1"
            style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)", color: "rgba(246,244,239,0.45)" }}
          >
            a space that feels nothing like a dentist office —
          </span>
          <span
            className="block font-semibold leading-none text-white"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
              letterSpacing: "-0.03em",
              textShadow: "0 0 80px rgba(200,224,214,0.12)",
            }}
          >
            dental point
          </span>
        </h2>

        <p
          className="text-sm tracking-widest uppercase mt-1 font-body"
          style={{ color: "rgba(200,224,214,0.45)" }}
        >
          scroll to explore ↓
        </p>
      </motion.div>

      {/* 3-D Circular Gallery */}
      <div
        className="relative w-full z-10"
        style={{ height: "520px", perspective: "2000px" }}
        role="region"
        aria-label="Dental Point clinic photo gallery"
      >
        {/* Rotating cylinder — transform applied directly to DOM via ref */}
        <div
          ref={cylinderRef}
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {cards.map(({ src, label, opacity }, i) => {
            const itemAngle = i * ANGLE_PER;
            const isFront   = opacity > 0.85;

            return (
              <div
                key={src}
                role="group"
                aria-label={`Dental Point — ${label}`}
                className="absolute"
                style={{
                  width:      CARD_W,
                  height:     CARD_H,
                  transform:  `rotateY(${itemAngle}deg) translateZ(${RADIUS}px)`,
                  left:       "50%",
                  top:        "50%",
                  marginLeft: -CARD_W / 2,
                  marginTop:  -CARD_H / 2,
                  opacity,
                  transition: "opacity 0.25s linear",
                  willChange: "opacity",
                }}
              >
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{
                    borderRadius: "1.75rem",
                    border: isFront
                      ? "1px solid rgba(200,224,214,0.35)"
                      : "1px solid rgba(200,224,214,0.12)",
                    boxShadow: isFront
                      ? "0 0 80px rgba(47,93,82,0.5), 0 40px 100px rgba(0,0,0,0.6)"
                      : "0 24px 64px rgba(0,0,0,0.45)",
                  }}
                >
                  <Image
                    src={src}
                    alt={`Dental Point & Implant Centre — ${label}`}
                    fill
                    quality={85}
                    loading="lazy"
                    className="object-cover object-center"
                    sizes="280px"
                    style={{ filter: "brightness(1.1) contrast(1.06) saturate(1.15)" }}
                  />

                  <div
                    className="absolute inset-0 flex flex-col justify-end p-5"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(4,10,8,0.97) 0%, rgba(4,10,8,0.72) 28%, transparent 70%)",
                    }}
                  >
                    <span
                      className="font-body font-semibold uppercase tracking-[0.24em] mb-2"
                      style={{ fontSize: "0.58rem", color: "var(--color-mint)", opacity: 0.8 }}
                    >
                      dental point
                    </span>
                    <h3
                      className="font-display text-white font-semibold lowercase leading-tight"
                      style={{ fontSize: "1.15rem" }}
                    >
                      {label}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Edge fades */}
        <div
          className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, var(--color-ink), transparent)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-32 pointer-events-none z-10"
          style={{ background: "linear-gradient(to left, var(--color-ink), transparent)" }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
