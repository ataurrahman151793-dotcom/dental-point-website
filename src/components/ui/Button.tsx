"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { HTMLMotionProps } from "framer-motion";

type Variant = "primary" | "ghost" | "pill" | "pill-ghost";

interface ButtonProps extends HTMLMotionProps<"a"> {
  variant?: Variant;
  href?: string;
  as?: "button" | "a";
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover rounded-[var(--radius-md)] px-8 py-4 font-body font-semibold text-base tracking-tight",
  ghost:
    "border border-current text-ink hover:text-primary rounded-[var(--radius-md)] px-8 py-4 font-body font-semibold text-base tracking-tight",
  pill: "bg-primary text-white hover:bg-primary-hover rounded-[var(--radius-pill)] px-6 py-3 font-body font-semibold text-sm tracking-tight",
  "pill-ghost":
    "border border-ink text-ink hover:border-primary hover:text-primary rounded-[var(--radius-pill)] px-6 py-3 font-body font-semibold text-sm tracking-tight",
};

export default function Button({
  variant = "primary",
  href,
  as: Tag = href ? "a" : "button",
  children,
  className,
  ...rest
}: ButtonProps & { as?: "button" | "a" }) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer select-none focus-visible:outline-2",
    variantClasses[variant],
    className
  );

  return (
    <motion.a
      href={href ?? "#"}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      {...(rest as HTMLMotionProps<"a">)}
    >
      {children}
    </motion.a>
  );
}
