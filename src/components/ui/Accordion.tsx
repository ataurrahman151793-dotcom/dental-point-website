"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  q: string;
  a: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <dl className={cn("divide-y divide-[var(--color-line)]", className)}>
      {items.map((item, i) => (
        <div key={i}>
          <dt>
            <button
              className={cn(
                "w-full flex items-center justify-between gap-4 py-6 text-left transition-colors duration-200",
                open === i ? "text-primary" : "text-ink hover:text-primary"
              )}
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faq-answer-${i}`}
            >
              <span className="font-display text-xl font-medium lowercase">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="flex-shrink-0"
              >
                {open === i ? (
                  <X size={20} className="text-primary" />
                ) : (
                  <Plus size={20} />
                )}
              </motion.span>
            </button>
          </dt>

          <AnimatePresence>
            {open === i && (
              <motion.dd
                id={`faq-answer-${i}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
                role="region"
                aria-label={item.q}
              >
                <div
                  className="pb-6 pr-8 text-ink-soft leading-relaxed"
                  style={{ background: "var(--color-mint)", borderRadius: "var(--radius-md)", padding: "1.25rem 1.5rem" }}
                >
                  {item.a}
                </div>
              </motion.dd>
            )}
          </AnimatePresence>
        </div>
      ))}
    </dl>
  );
}
