"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Share2, Globe, Phone, ArrowRight } from "lucide-react";
import { CLINIC } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* ── TextHoverEffect — adapted from footer.com ── */
function TextHoverEffect({ text }: { text: string }) {
  const svgRef   = useRef<SVGSVGElement>(null);
  const [cursor,  setCursor]  = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPos, setMaskPos] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    setMaskPos({
      cx: `${((cursor.x - rect.left) / rect.width) * 100}%`,
      cy: `${((cursor.y - rect.top)  / rect.height) * 100}%`,
    });
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none cursor-default"
    >
      <defs>
        {/* Color gradient revealed on hover under cursor */}
        <linearGradient id="ftGrad" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
          {hovered && (
            <>
              <stop offset="0%"   stopColor="var(--color-accent)" />
              <stop offset="40%"  stopColor="var(--color-mint)" />
              <stop offset="70%"  stopColor="rgba(200,224,214,0.9)" />
              <stop offset="100%" stopColor="var(--color-accent)" />
            </>
          )}
        </linearGradient>

        {/* Radial reveal mask — follows cursor */}
        <radialGradient
          id="ftReveal"
          gradientUnits="userSpaceOnUse"
          r="22%"
          cx={maskPos.cx}
          cy={maskPos.cy}
        >
          <stop offset="0%"   stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>

        <mask id="ftMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#ftReveal)" />
        </mask>
      </defs>

      {/* Hover — static outline that appears when mouse enters */}
      <text
        x="50%" y="50%"
        textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.3"
        style={{
          fill:       "transparent",
          stroke:     "rgba(200,224,214,0.18)",
          fontFamily: "helvetica, sans-serif",
          fontSize:   "4.5rem",
          fontWeight: 700,
          opacity:    hovered ? 0.8 : 0,
          transition: "opacity 0.35s ease",
        }}
      >
        {text}
      </text>

      {/* Animated stroke draw-on (mint, plays once on mount) */}
      <motion.text
        x="50%" y="50%"
        textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.3"
        style={{
          fill:       "transparent",
          stroke:     "rgba(200,224,214,0.4)",
          fontFamily: "helvetica, sans-serif",
          fontSize:   "4.5rem",
          fontWeight: 700,
        }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0,    strokeDasharray: 1000 }}
        transition={{ duration: 4.5, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      {/* Mouse-follow color reveal */}
      <text
        x="50%" y="50%"
        textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.3"
        mask="url(#ftMask)"
        style={{
          fill:       "transparent",
          stroke:     "url(#ftGrad)",
          fontFamily: "helvetica, sans-serif",
          fontSize:   "4.5rem",
          fontWeight: 700,
        }}
      >
        {text}
      </text>
    </svg>
  );
}

/* ── Footer columns data ── */
const footerCols = [
  {
    heading: "services",
    links: [
      { label: "preventive care",  href: "#services" },
      { label: "same-day crowns",  href: "#services" },
      { label: "dental implants",  href: "#services" },
      { label: "invisalign",       href: "#services" },
      { label: "veneers",          href: "#services" },
      { label: "laser fillings",   href: "#services" },
    ],
  },
  {
    heading: "practice",
    links: [
      { label: "about us",         href: "#about" },
      { label: "our doctors",      href: "#about" },
      { label: "3d cbct imaging",  href: "#technology" },
      { label: "patient reviews",  href: CLINIC.googleReviews },
      { label: "emi plans",        href: "#savings" },
      { label: "new patients",     href: "#contact-form" },
    ],
  },
  {
    heading: "office",
    links: [
      { label: "N.C. Hazarika Complex, Dispur", href: CLINIC.addressUrl },
      { label: "Guwahati, Assam 781006",        href: CLINIC.addressUrl },
      { label: CLINIC.phone,                    href: CLINIC.phoneHref  },
      { label: CLINIC.hours,                    href: "#faq-location"   },
    ],
  },
  {
    heading: "review us",
    links: [
      { label: "google reviews", href: CLINIC.googleReviews },
      { label: "facebook",       href: CLINIC.facebook },
    ],
  },
];

const socialLinks = [
  { href: CLINIC.instagram,  label: "Dental Point on Instagram", icon: <Share2 size={16} /> },
  { href: CLINIC.facebook,   label: "Dental Point on Facebook",  icon: <Globe  size={16} /> },
  { href: CLINIC.phoneHref,  label: `Call ${CLINIC.phone}`,      icon: <Phone  size={16} /> },
];

export default function Footer() {
  const reducedMotion = useReducedMotion();
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "var(--color-ink)" }}
      aria-label="Site footer"
    >
      {/* ── Ambient radial glow — footer.com FooterBackgroundGradient ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, rgba(10,20,18,0.5) 50%, rgba(47,93,82,0.2) 100%)",
        }}
      />

      {/* ── CTA strip ── */}
      <motion.div
        className="relative z-10 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-site py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex flex-col gap-1">
            <p
              className="font-body font-semibold uppercase tracking-[0.2em] text-xs"
              style={{ color: "var(--color-mint)" }}
            >
              dental point & implant centre
            </p>
            <p
              className="font-display font-semibold lowercase leading-tight"
              style={{
                fontSize:      "clamp(1.4rem, 2.8vw, 2.1rem)",
                letterSpacing: "-0.025em",
                color:         "rgba(246,244,239,0.95)",
              }}
            >
              ready to transform your smile?
            </p>
          </div>

          <a
            href="#contact-form"
            className="group flex items-center gap-2.5 shrink-0 px-6 py-3 rounded-full font-body font-semibold text-sm text-white transition-all duration-200"
            style={{
              background: "var(--color-primary)",
              boxShadow:  "0 0 28px rgba(47,93,82,0.4)",
            }}
          >
            book appointment
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </motion.div>

      {/* ── Main content ── */}
      <div className="container-site relative z-10 pt-8 pb-6">

        {/* Logo + tagline + social */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-7 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div>
            <p className="font-display text-3xl font-bold text-white lowercase tracking-tight">
              dp<span style={{ color: "var(--color-accent)" }}>.</span>
            </p>
            <p className="text-sm mt-0.5 font-body" style={{ color: "rgba(246,244,239,0.55)" }}>
              {CLINIC.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.09)", color: "rgba(246,244,239,0.65)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                  e.currentTarget.style.color      = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.color      = "rgba(246,244,239,0.65)";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* 4-column grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          {footerCols.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <p
                className="font-body font-bold uppercase tracking-[0.18em] text-xs"
                style={{ color: "var(--color-mint)" }}
              >
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2" role="list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm font-body transition-colors duration-150"
                      style={{ color: "rgba(246,244,239,0.6)" }}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(246,244,239,0.95)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246,244,239,0.6)")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <p className="text-xs font-body" style={{ color: "rgba(246,244,239,0.38)" }}>
              &copy; {new Date().getFullYear()} {CLINIC.name}. All rights reserved.
            </p>
            <p className="text-xs font-body" style={{ color: "rgba(246,244,239,0.25)" }}>
              Proudly serving Guwahati, Dispur, Beltola, and all of Northeast India since 2013.
            </p>
          </div>
          <div className="flex items-center gap-5">
            {[
              { label: "privacy policy",   href: "/privacy" },
              { label: "terms of service", href: "/terms" },
              { label: "accessibility",    href: "/accessibility" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs font-body transition-colors duration-150"
                style={{ color: "rgba(246,244,239,0.38)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(246,244,239,0.75)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246,244,239,0.38)")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Giant interactive SVG watermark — footer.com TextHoverEffect ── */}
      <div
        className="relative z-[1] w-full pointer-events-auto"
        style={{ height: "clamp(80px, 15vw, 200px)" }}
        aria-hidden="true"
      >
        {!reducedMotion && <TextHoverEffect text="dental point" />}
      </div>
    </footer>
  );
}
