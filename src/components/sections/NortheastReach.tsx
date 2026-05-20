"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import OrbitalServices from "@/components/ui/OrbitalServices";

const CobeGlobe = dynamic(
  () => import("@/components/ui/CobeGlobe").then((m) => ({ default: m.CobeGlobe })),
  { ssr: false }
);

const LOCATION = {
  name:    "Dental Point & Implant Centre",
  address: "N.C. Hazarika Complex, Beltola Basistha Road",
  city:    "near Last Gate, Dispur, Guwahati — 781006",
  mapsUrl: "https://maps.google.com/?q=26.139001,91.789896",
};

const STATS = [
  { value: "12+",  label: "years in Dispur"  },
  { value: "500+", label: "implants placed"  },
  { value: "50+",  label: "NRIs treated"     },
];

export default function NortheastReach() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="ne-reach-heading"
      className="relative py-20 md:py-28"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 80% 50%, rgba(200,224,214,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="container-site relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Left: interactive globe + location card ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative w-full max-w-sm mx-auto">
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(100,180,155,0.22) 0%, transparent 70%)",
                  transform: "scale(1.1)",
                }}
                aria-hidden="true"
              />
              <CobeGlobe className="w-full" />
            </div>

            {/* Location card */}
            <a
              href={LOCATION.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-sm flex items-start gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group"
              style={{
                background: "var(--color-bg)",
                border: "1.5px solid rgba(47,93,82,0.2)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(47,93,82,0.45)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(47,93,82,0.2)")}
            >
              <div
                className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(47,93,82,0.12)" }}
              >
                <MapPin size={15} style={{ color: "var(--color-primary)" }} />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="font-body font-semibold text-sm" style={{ color: "var(--color-ink)" }}>
                  {LOCATION.name}
                </p>
                <p className="font-body text-xs leading-relaxed" style={{ color: "var(--color-ink-soft)" }}>
                  {LOCATION.address}
                </p>
                <p className="font-body text-xs" style={{ color: "var(--color-ink-soft)" }}>
                  {LOCATION.city}
                </p>
                <p
                  className="font-body text-xs font-medium mt-1 group-hover:underline"
                  style={{ color: "var(--color-primary)" }}
                >
                  Open in Google Maps →
                </p>
              </div>
            </a>
          </motion.div>

          {/* ── Right: heading + orbital services ── */}
          <div className="flex flex-col gap-6">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              <Eyebrow>what we offer</Eyebrow>
              <h2
                id="ne-reach-heading"
                className="font-display font-semibold lowercase leading-tight"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  letterSpacing: "-0.03em",
                  color: "var(--color-ink)",
                }}
              >
                treatments that bring<br />
                <em className="not-italic" style={{ color: "var(--color-primary)" }}>
                  patients from across india
                </em>
              </h2>
            </motion.div>

            {/* Orbital services */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <OrbitalServices />
            </motion.div>

            {/* Mini stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-8 pt-1"
            >
              {STATS.map((stat, i) => (
                <div key={stat.label} className="flex flex-col items-center gap-0.5">
                  <span
                    className="font-display font-bold"
                    style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", color: "var(--color-primary)" }}
                  >
                    {stat.value}
                  </span>
                  <span className="font-body text-xs uppercase tracking-wide" style={{ color: "var(--color-ink-soft)" }}>
                    {stat.label}
                  </span>
                  {i < STATS.length - 1 && (
                    <div
                      className="hidden"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
