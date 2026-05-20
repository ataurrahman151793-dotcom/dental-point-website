"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MapPin, Phone, Clock, ArrowRight, Plus, Minus } from "lucide-react";
import { FAQS, CLINIC } from "@/lib/constants";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

const ClinicMap = dynamic(() => import("@/components/ui/ClinicMap"), { ssr: false });

/* ── Inline accordion — dashed dividers, clean expand ── */
function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <dl className="mt-10 flex-1">
      {FAQS.map((item, i) => (
        <div
          key={i}
          className="border-t border-dashed"
          style={{ borderColor: "rgba(26,36,33,0.12)" }}
        >
          <dt>
            <button
              className="w-full flex items-start justify-between gap-4 py-5 text-left group"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faqloc-answer-${i}`}
            >
              <span
                className="font-display text-lg font-medium lowercase leading-snug transition-colors duration-200 group-hover:text-primary"
                style={{ color: open === i ? "var(--color-primary)" : "var(--color-ink)" }}
              >
                {item.q}
              </span>
              <span
                className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{
                  background: open === i ? "var(--color-primary)" : "var(--color-mint)",
                  color:      open === i ? "#fff" : "var(--color-primary)",
                }}
                aria-hidden="true"
              >
                {open === i ? <Minus size={13} /> : <Plus size={13} />}
              </span>
            </button>
          </dt>

          <AnimatePresence initial={false}>
            {open === i && (
              <motion.dd
                id={`faqloc-answer-${i}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
                role="region"
                aria-label={item.q}
              >
                <p
                  className="pb-5 pr-8 leading-relaxed text-base"
                  style={{ color: "var(--color-ink-soft)" }}
                >
                  {item.a}
                </p>
              </motion.dd>
            )}
          </AnimatePresence>
        </div>
      ))}
      {/* Bottom border */}
      <div
        className="border-t border-dashed"
        style={{ borderColor: "rgba(26,36,33,0.12)" }}
      />
    </dl>
  );
}

export default function FAQLocation() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  const contactItems = [
    {
      icon:      MapPin,
      label:     "address",
      content:   CLINIC.address,
      href:      CLINIC.addressUrl,
      linkLabel: "get directions",
    },
    {
      icon:      Phone,
      label:     "phone",
      content:   CLINIC.phone,
      href:      CLINIC.phoneHref,
      linkLabel: "call now",
    },
    {
      icon:      Clock,
      label:     "hours",
      content:   CLINIC.hours,
      href:      undefined,
      linkLabel: undefined,
    },
  ];

  return (
    <section
      id="faq-location"
      ref={sectionRef}
      aria-label="FAQ and location"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="grid lg:grid-cols-2 min-h-[80vh]">

        {/* ══ LEFT — FAQ ══════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col px-8 py-12 md:px-16 md:py-16"
          style={{ background: "var(--color-surface)" }}
          id="faq"
        >
          {/* Header block */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-2">
            <div>
              <Eyebrow>common questions</Eyebrow>
              <h2
                className="display-section mt-4"
                style={{ color: "var(--color-ink)" }}
                id="faq-heading"
              >
                frequently<br />asked
              </h2>
            </div>
            <p
              className="text-base leading-relaxed max-w-xs lg:text-right lg:pb-2"
              style={{ color: "var(--color-ink-soft)" }}
            >
              Still have questions? Our team is always happy to chat — call, text, or drop in.
            </p>
          </div>

          {/* Accordion — flex-1 so it fills available vertical space */}
          <FAQAccordion />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Button href="#contact" variant="primary">book a consult</Button>
            <Button href={CLINIC.phoneHref} variant="ghost">call us</Button>
          </div>
        </motion.div>

        {/* ══ RIGHT — Location ════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col px-8 py-12 md:px-16 md:py-16"
          style={{ background: "var(--color-bg)" }}
          id="contact"
        >
          <Eyebrow>find us</Eyebrow>
          <h2
            className="display-section mt-4 mb-12"
            style={{ color: "var(--color-ink)" }}
          >
            we&apos;re easy<br />to find
          </h2>

          {/* Contact cards */}
          <div className="flex flex-col gap-6 mb-10">
            {contactItems.map(({ icon: Icon, label, content, href, linkLabel }) => (
              <div key={label} className="flex gap-4 items-start">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--color-mint)" }}
                  aria-hidden="true"
                >
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="eyebrow mb-1">{label}</p>
                  <p className="font-medium" style={{ color: "var(--color-ink)" }}>{content}</p>
                  {href && linkLabel && (
                    <a
                      href={href}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors mt-1"
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {linkLabel}
                      <ArrowRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Map — react-leaflet, dark CartoDB tiles */}
          <div
            className="relative overflow-hidden flex-1 min-h-[320px]"
            style={{
              borderRadius: "var(--radius-lg)",
              boxShadow:    "var(--shadow-lift)",
            }}
          >
            <ClinicMap />
          </div>

          <Button href="#contact-form" variant="primary" className="mt-8">
            request an appointment
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
