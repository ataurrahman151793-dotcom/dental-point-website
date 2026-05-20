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
  { value: "12+",  label: "years in Dispur",  sub: "Serving Guwahati since 2013"     },
  { value: "500+", label: "implants placed",  sub: "Computer-guided precision"        },
  { value: "50+",  label: "NRIs treated",     sub: "Patients from across the globe"  },
];

export default function NortheastReach() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="ne-reach-heading"
      className="relative py-12 md:py-16 overflow-x-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,224,214,0.13) 0%, transparent 70%)",
        }}
      />

      <div className="container-site relative z-10 flex flex-col gap-8 md:gap-10">

        {/* ── Section heading — centered, full width ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-4"
        >
          <Eyebrow>northeast india trusts us</Eyebrow>
          <h2
            id="ne-reach-heading"
            className="font-display font-semibold lowercase leading-tight"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              letterSpacing: "-0.03em",
              color: "var(--color-ink)",
            }}
          >
            500+ patients from<br />
            <em className="not-italic" style={{ color: "var(--color-primary)" }}>
              across the region
            </em>
          </h2>
          <p className="text-base leading-relaxed max-w-lg" style={{ color: "var(--color-ink-soft)" }}>
            From Assam to Arunachal, Meghalaya to Nagaland — families travel to Guwahati specifically for
            Dental Point&apos;s computer-guided implant surgery and smile makeovers.
          </p>
        </motion.div>

        {/* ── Two equal columns ── */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">

          {/* Left — globe + location card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-5"
          >
            {/* Globe — square, max-w-sm */}
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

          {/* Right — orbital services, same visual size as globe */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-3"
          >
            {/* Orbital square — same max-w-sm as globe */}
            <div
              className="relative w-full max-w-sm mx-auto"
              style={{ aspectRatio: "1 / 1" }}
            >
              <OrbitalServices />
            </div>

            <p className="font-body text-xs" style={{ color: "var(--color-ink-soft)", opacity: 0.45 }}>
              Tap any node to explore · click again to close
            </p>

            {/* Languages */}
            <p className="font-body text-sm text-center" style={{ color: "var(--color-ink-soft)" }}>
              Languages spoken:{" "}
              <span style={{ color: "var(--color-ink)" }}>Assamese · Bengali · Hindi · English · Bodo</span>
            </p>
          </motion.div>

        </div>

        {/* ── Stats row — full width, centered ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto w-full"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex sm:flex-col flex-row items-center sm:items-center gap-3 sm:gap-1 p-4 rounded-2xl sm:text-center text-left"
              style={{
                background: "var(--color-bg)",
                border: "1.5px solid rgba(47,93,82,0.2)",
              }}
            >
              <p
                className="font-display font-bold leading-none flex-shrink-0"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--color-primary)" }}
              >
                {stat.value}
              </p>
              <div className="flex flex-col gap-0.5">
                <p className="font-body font-semibold text-xs uppercase tracking-wide" style={{ color: "var(--color-ink)", overflowWrap: "break-word" }}>
                  {stat.label}
                </p>
                <p className="font-body text-xs leading-snug" style={{ color: "var(--color-ink-soft)", overflowWrap: "break-word" }}>
                  {stat.sub}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
