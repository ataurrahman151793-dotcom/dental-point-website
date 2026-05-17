"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  pauseOnHover?: boolean;
}

export default function Marquee({
  children,
  speed = 30,
  direction = "left",
  className,
  pauseOnHover = false,
}: MarqueeProps) {
  const reducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const duration = `${speed}s`;
  const animClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div
      className={cn("overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className={cn(
          "flex w-max",
          !reducedMotion && animClass,
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={reducedMotion ? undefined : { animationDuration: duration, willChange: "transform" }}
      >
        {/* Duplicate for seamless loop */}
        <span className="flex items-center gap-0">{children}</span>
        <span className="flex items-center gap-0" aria-hidden="true">
          {children}
        </span>
      </div>
    </div>
  );
}
