"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { FAQS } from "@/lib/constants";
import Accordion from "@/components/ui/Accordion";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="faq"
      ref={ref}
      className="py-16 md:py-20"
      style={{ background: "var(--color-surface)" }}
      aria-labelledby="faq-heading"
    >
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — sticky heading */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>common questions</Eyebrow>
            <h2 id="faq-heading" className="display-section text-ink">
              we&apos;ve got answers
            </h2>
            <p className="text-ink-soft leading-relaxed max-w-xs">
              Still have questions? Our team is always happy to chat — by phone,
              text, or in person.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button href="#contact" variant="primary">book a consult</Button>
              <Button href="tel:+18164295799" variant="ghost">call us</Button>
            </div>
          </div>

          {/* Right — accordion */}
          <div>
            <Accordion items={FAQS} />
          </div>
        </div>
      </div>
    </section>
  );
}
