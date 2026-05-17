"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { CLINIC, NAV_LINKS, SERVICES_MEGA } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/* ─── Animated logo — adaptive to scroll state, no zoom ─── */
function Logo({ scrolled }: { scrolled: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 group"
      aria-label="Dental Point & Implant Centre home"
    >
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        {/* Outer ring */}
        <motion.circle
          cx="20" cy="20" r="18"
          stroke="currentColor" strokeWidth="2"
          className={scrolled ? "text-primary" : "text-white"}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        {/* Inner decorative dashed ring */}
        <motion.circle
          cx="20" cy="20" r="13"
          stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3"
          className={scrolled ? "text-primary/40" : "text-white/30"}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        {/* Tooth arc */}
        <motion.path
          d="M14 25 C14 15 26 15 26 25"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
          className={scrolled ? "text-primary" : "text-white"}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        />
        {/* Crown dot */}
        <motion.circle
          cx="20" cy="14" r="3"
          fill="currentColor"
          className={scrolled ? "text-accent" : "text-[#D8B589]"}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.1, type: "spring" }}
        />
      </motion.svg>

      <div className="flex flex-col justify-center leading-none gap-[3px]">
        <span
          className={cn(
            "font-display text-2xl font-bold lowercase tracking-tight transition-colors duration-300",
            scrolled
              ? "text-ink group-hover:text-primary"
              : "text-white group-hover:text-white/80"
          )}
        >
          dp<span className={scrolled ? "text-primary" : "text-[#D8B589]"}>.</span>
        </span>
        <span
          className={cn(
            "text-[10px] font-body font-medium uppercase tracking-[0.22em] transition-colors duration-300",
            scrolled ? "text-ink-soft" : "text-white/70"
          )}
        >
          dental point
        </span>
      </div>
    </Link>
  );
}

/* ─── Services mega menu ─── */
function MegaMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute top-full left-1/2 -translate-x-1/2 w-[760px] bg-surface rounded-[var(--radius-lg)] shadow-[var(--shadow-lift)] p-8 mt-3 z-50"
          initial={{ opacity: 0, y: -12, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
          exit={{ opacity: 0, y: -12, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-4 gap-6">
            {SERVICES_MEGA.map((col) => (
              <div key={col.category}>
                <p className="eyebrow mb-3">{col.category}</p>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-sm text-ink-soft hover:text-primary transition-colors block py-0.5"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-[var(--color-line)] flex items-center justify-between">
            <p className="text-sm text-muted">Need help choosing? We&apos;ll guide you.</p>
            <Button href="#contact" variant="pill">book a consultation</Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Mobile full-screen overlay ─── */
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-ink flex flex-col"
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="container-site flex items-center justify-between h-[88px]">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl text-white font-bold lowercase">dp.</span>
              <span className="text-[9px] font-body uppercase tracking-[0.18em] text-white/40 self-end mb-0.5">dental point</span>
            </div>
            <button onClick={onClose} aria-label="Close menu" className="text-white p-2">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center container-site pb-16">
            <ul className="space-y-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="font-display text-4xl font-medium text-white/90 hover:text-accent transition-colors lowercase block py-2"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-10 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href={CLINIC.phoneHref}
                className="flex items-center gap-3 text-white/70 hover:text-white mb-4"
              >
                <Phone size={16} />
                <span className="font-body text-lg">{CLINIC.phone}</span>
              </a>
              <Button href="#contact" variant="pill">book now</Button>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════
   NAVBAR — floating island on scroll
   (pattern from anvigation.com)
   ═══════════════════════════════════════ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const openMega = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    megaTimeoutRef.current = setTimeout(() => setMegaOpen(false), 150);
  };

  /* Adaptive text color classes */
  const navTextClass = cn(
    "transition-colors duration-300",
    scrolled
      ? "text-ink-soft hover:text-primary"
      : "text-white/85 hover:text-white"
  );

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 z-50 flex justify-center",
          "transition-all duration-300 ease-out pointer-events-none",
          scrolled ? "top-3" : "top-0"
        )}
      >
        <div
          className={cn(
            "w-full pointer-events-auto transition-all duration-300 ease-out",
            scrolled
              ? [
                  "lg:max-w-5xl lg:mx-6",
                  "lg:rounded-2xl lg:border",
                  "bg-bg/95 backdrop-blur-xl",
                  "border-[rgba(26,36,33,0.1)]",
                  "shadow-[0_8px_32px_rgba(26,36,33,0.1)]",
                ].join(" ")
              : "bg-transparent"
          )}
        >
          <div className="container-site">
            <div
              className={cn(
                "flex items-center justify-between transition-all duration-300",
                scrolled ? "h-16" : "h-[88px]"
              )}
            >
              <Logo scrolled={scrolled} />

              {/* Desktop nav links */}
              <nav
                className="hidden lg:flex items-center gap-0.5"
                aria-label="Main navigation"
              >
                {NAV_LINKS.map((link) =>
                  link.hasMega ? (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={openMega}
                      onMouseLeave={closeMega}
                    >
                      <button
                        className={cn(
                          "flex items-center gap-1 px-3 py-2 text-[13px] font-body font-medium whitespace-nowrap",
                          navTextClass
                        )}
                        aria-expanded={megaOpen}
                        aria-haspopup="true"
                      >
                        {link.label}
                        <motion.span
                          animate={{ rotate: megaOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={13} />
                        </motion.span>
                      </button>
                      <MegaMenu isOpen={megaOpen} />
                    </div>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className={cn(
                        "px-3 py-2 text-[13px] font-body font-medium whitespace-nowrap",
                        navTextClass
                      )}
                    >
                      {link.label}
                    </a>
                  )
                )}
              </nav>

              {/* Desktop right — phone + CTA */}
              <div className="hidden lg:flex items-center gap-3">
                <a
                  href={CLINIC.phoneHref}
                  className={cn(
                    "flex items-center gap-1.5 text-[13px] font-medium whitespace-nowrap",
                    navTextClass
                  )}
                  aria-label={`Call us at ${CLINIC.phone}`}
                >
                  <Phone size={13} />
                  <span className="whitespace-nowrap">{CLINIC.phone}</span>
                </a>
                <Button href="#contact" variant="pill" className="px-4 py-2 text-[13px]">book now</Button>
              </div>

              {/* Mobile hamburger */}
              <button
                className={cn(
                  "lg:hidden p-2 transition-colors",
                  scrolled ? "text-ink hover:text-primary" : "text-white hover:text-white/70"
                )}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
