"use client";
import { useEffect, useRef } from "react";
import type gsap from "gsap";

type GsapContext = ReturnType<typeof gsap.context>;

/* Creates and cleans up a GSAP context tied to a container ref */
export function useGsapContext(
  callback: (context: GsapContext) => void,
  deps: React.DependencyList = []
) {
  const containerRef = useRef<HTMLElement | null>(null);
  const ctxRef = useRef<GsapContext | null>(null);

  useEffect(() => {
    let ctx: GsapContext | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current) return;
      ctx = gsap.context(() => callback(ctx!), containerRef.current);
      ctxRef.current = ctx;
    };

    init();

    return () => {
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}
