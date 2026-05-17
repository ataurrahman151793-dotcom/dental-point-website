"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICES_SPLIT } from "@/lib/constants";
import Eyebrow from "@/components/ui/Eyebrow";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const bgGradients = [
  "linear-gradient(135deg, #C8E0D6 0%, #F6F4EF 100%)",
  "linear-gradient(135deg, #2F5D52 0%, #1A2421 100%)",
  "linear-gradient(135deg, #F4DCD0 0%, #D8B589 100%)",
];

function ServiceRow({
  service,
  index,
}: {
  service: (typeof SERVICES_SPLIT)[0];
  index: number;
}) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
    >
      {/* Image side */}
      <motion.div
        className={`relative overflow-hidden rounded-[var(--radius-lg)] aspect-[4/3] ${
          isEven ? "lg:order-1" : "lg:order-2"
        }`}
        style={{ boxShadow: "var(--shadow-lift)" }}
        initial={reducedMotion ? {} : { opacity: 0, x: isEven ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Service image */}
        <div className="absolute inset-0 transition-transform duration-700 hover:scale-105" aria-hidden="true">
          <Image
            src={service.image}
            alt={service.heading}
            fill
            quality={85}
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Tint overlay */}
          <div className="absolute inset-0" style={{ background: bgGradients[index], opacity: 0.18 }} />
        </div>

        {/* Giant number in background */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <span
            className="font-display font-bold select-none"
            style={{
              fontSize: "clamp(120px, 20vw, 220px)",
              lineHeight: 1,
              color: "rgba(255,255,255,0.08)",
              letterSpacing: "-0.05em",
            }}
          >
            {service.number}
          </span>
        </div>
      </motion.div>

      {/* Copy side */}
      <motion.div
        className={`flex flex-col gap-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}
        initial={reducedMotion ? {} : { opacity: 0, x: isEven ? 50 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Eyebrow>{service.category}</Eyebrow>
        <h2 className="display-section text-ink">{service.heading}</h2>
        <p className="text-ink-soft leading-relaxed max-w-md">{service.body}</p>

        <motion.a
          href={service.link}
          className="inline-flex items-center gap-2 text-primary font-medium group w-fit mt-2"
          whileHover="hover"
        >
          <span>explore</span>
          <motion.span
            variants={{ hover: { x: 6 } }}
            transition={{ duration: 0.25 }}
          >
            <ArrowRight size={18} />
          </motion.span>
        </motion.a>
      </motion.div>
    </div>
  );
}

export default function ServicesSplit() {
  return (
    <section
      id="services"
      className="py-16 md:py-20"
      style={{ background: "var(--color-surface)" }}
      aria-labelledby="services-heading"
    >
      <div className="container-site flex flex-col gap-16">
        <div className="flex flex-col gap-3">
          <Eyebrow>what we offer</Eyebrow>
          <h2 id="services-heading" className="font-display font-normal text-ink lowercase leading-tight tracking-tight">
            <span className="block text-base md:text-lg text-ink-soft/65 font-body font-medium lowercase tracking-wide mb-1">
              care for every stage of your smile —
            </span>
            <span
              className="block font-semibold text-ink leading-none"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", letterSpacing: "-0.03em" }}
            >
              dental point
            </span>
          </h2>
        </div>

        {SERVICES_SPLIT.map((service, i) => (
          <ServiceRow key={service.number} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
