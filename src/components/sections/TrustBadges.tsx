"use client";

import Marquee from "@/components/ui/Marquee";
import { TRUST_BADGES } from "@/lib/constants";

export default function TrustBadges() {
  return (
    <section
      className="py-16 border-y"
      style={{
        background: "var(--color-surface)",
        borderColor: "var(--color-line)",
      }}
      aria-label="Professional affiliations and certifications"
    >
      <Marquee speed={40} pauseOnHover>
        {TRUST_BADGES.map((badge) => (
          <div
            key={badge.abbr}
            className="inline-flex items-center gap-3 px-10 cursor-default group"
          >
            {/* Badge logo placeholder — replace with real SVG logos */}
            <div
              className="flex items-center justify-center px-5 py-3 rounded-[var(--radius-sm)] transition-all duration-300"
              style={{
                background: "var(--color-bg)",
                minWidth: 100,
              }}
              title={badge.label}
            >
              <span
                className="font-body font-bold text-sm tracking-wide transition-colors duration-300 group-hover:text-primary"
                style={{ color: "var(--color-muted)" }}
                /* Placeholder: replace text with real badge SVG at /images/badges/{badge.abbr.toLowerCase()}.svg */
              >
                {badge.abbr}
              </span>
            </div>
            <span
              className="text-muted/30 text-sm"
              aria-hidden="true"
            >
              /
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
