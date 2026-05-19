"use client";

import { Star, Sparkles, Bot, Zap } from "lucide-react";
import Marquee from "@/components/ui/Marquee";

const items = [
  { icon: Star, text: "award-winning care" },
  { icon: Sparkles, text: "computer-guided implants" },
  { icon: Bot, text: "3D CBCT imaging" },
  { icon: Zap, text: "painless laser dentistry" },
  { icon: Star, text: "300+ 5-star reviews" },
  { icon: Sparkles, text: "smile makeovers" },
  { icon: Bot, text: "0% emi available" },
  { icon: Zap, text: "mds specialists" },
];

export default function MarqueeIntro() {
  return (
    <section
      className="py-6 overflow-hidden"
      style={{ background: "var(--color-primary)" }}
      aria-label="Practice highlights"
    >
      <Marquee speed={25} pauseOnHover>
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-8 text-base font-body font-medium"
            style={{ color: "#F6F4EF" }}
          >
            <item.icon
              size={14}
              style={{ color: "var(--color-accent)" }}
              aria-hidden="true"
            />
            {item.text}
            <span
              className="ml-4"
              style={{ color: "var(--color-mint)", opacity: 0.4 }}
              aria-hidden="true"
            >
              /
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
