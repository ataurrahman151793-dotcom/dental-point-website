"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* TODO[CLIENT]: confirm real media features before going live. Replace placeholder logos below. */
const MEDIA = [
  { name: "The Assam Tribune",    abbr: "ASSAM TRIBUNE"    },
  { name: "Times of India",       abbr: "TIMES OF INDIA"   },
  { name: "Northeast Now",        abbr: "NORTHEAST NOW"    },
  { name: "IDA Member",           abbr: "IDA"              },
  { name: "Nobel Biocare Partner",abbr: "NOBEL BIOCARE"    },
  { name: "NABH Standards",       abbr: "NABH"             },
];

export default function FeaturedIn() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-label="As featured in"
      className="py-10 border-t border-b overflow-hidden"
      style={{
        background:   "var(--color-bg)",
        borderColor:  "rgba(26,36,33,0.07)",
      }}
    >
      <div className="container-site">
        <motion.p
          className="text-center text-xs font-body font-semibold uppercase tracking-[0.2em] mb-7"
          style={{ color: "var(--color-ink-soft)", opacity: 0.55 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.55 } : {}}
          transition={{ duration: 0.7 }}
        >
          as featured in &amp; certified by
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {MEDIA.map((m, i) => (
            <motion.span
              key={m.name}
              title={m.name}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-body font-bold uppercase tracking-widest select-none"
              style={{
                fontSize: "clamp(10px, 1.2vw, 13px)",
                letterSpacing: "0.18em",
                color: "var(--color-ink-soft)",
                opacity: 0.42,
                filter: "grayscale(1)",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.42")}
            >
              {m.abbr}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
