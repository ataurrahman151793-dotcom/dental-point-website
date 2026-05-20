"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Heart, Share2 } from "lucide-react";
import { INSTAGRAM_MOCK, CLINIC } from "@/lib/constants";
import Eyebrow from "@/components/ui/Eyebrow";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const bgGradients = [
  "linear-gradient(135deg, #C8E0D6, #2F5D52)",
  "linear-gradient(135deg, #2F5D52, #1A2421)",
  "linear-gradient(135deg, #D8B589, #F4DCD0)",
  "linear-gradient(135deg, #F4DCD0, #C8E0D6)",
];

export default function InstagramFeed() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-12 md:py-16"
      style={{ background: "var(--color-bg)" }}
      aria-labelledby="instagram-heading"
    >
      <div className="container-site flex flex-col gap-10">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-3">
            <Eyebrow>follow along</Eyebrow>
            <h2 id="instagram-heading" className="font-display text-3xl text-ink lowercase">
              @dentalpointassam
            </h2>
          </div>
          <a
            href={CLINIC.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            aria-label="Follow Dental Point on Instagram"
          >
            <Share2 size={18} />
            <span>follow us</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INSTAGRAM_MOCK.map((post, i) => (
            <motion.a
              key={post.id}
              href={CLINIC.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-[var(--radius-md)] aspect-square block"
              initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              aria-label={`Instagram post: ${post.caption}`}
            >
              {/* Post photo */}
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" aria-hidden="true">
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  quality={80}
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4"
                style={{
                  background: "rgba(26,36,33,0.75)",
                  backdropFilter: "blur(4px)",
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center gap-1.5 text-white">
                  <Heart size={18} style={{ fill: "white" }} aria-hidden="true" />
                  <span className="font-medium text-sm">{post.likes}</span>
                </div>
                <p className="text-white/80 text-xs text-center line-clamp-2">
                  {post.caption}
                </p>
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
