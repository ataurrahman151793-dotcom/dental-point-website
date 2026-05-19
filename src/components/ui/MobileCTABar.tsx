"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { CLINIC } from "@/lib/constants";

export default function MobileCTABar() {
  const [visible, setVisible]   = useState(true);
  const lastScrollY              = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const curr = window.scrollY;
      /* Show on scroll up, hide on scroll down */
      setVisible(curr < lastScrollY.current || curr < 100);
      lastScrollY.current = curr;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden"
          style={{
            background:   "var(--color-ink)",
            borderTop:    "1px solid rgba(255,255,255,0.08)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          <a
            href={CLINIC.phoneHref}
            className="flex flex-1 items-center justify-center gap-2.5 py-4 font-body font-semibold text-sm text-white transition-colors active:opacity-80"
            style={{ borderRight: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Phone size={18} aria-hidden="true" />
            Call Now
          </a>
          <a
            href={CLINIC.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2.5 py-4 font-body font-semibold text-sm transition-colors active:opacity-80"
            style={{ background: "#25D366", color: "white" }}
          >
            <MessageCircle size={18} aria-hidden="true" />
            WhatsApp
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
