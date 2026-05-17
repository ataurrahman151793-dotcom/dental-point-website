/* eslint-disable @typescript-eslint/no-explicit-any */
import type { gsap as GsapType } from "gsap";

type GSAP = typeof GsapType;

/* Section reveal: elements fade up into view on scroll */
export function createSectionReveal(
  gsap: GSAP,
  targets: gsap.TweenTarget,
  ScrollTrigger: any,
  triggerEl: Element
) {
  return gsap.from(targets, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "expo.out",
    stagger: 0.08,
    scrollTrigger: {
      trigger: triggerEl,
      start: "top 75%",
      toggleActions: "play none none none",
    },
  });
}

/* Parallax: element moves at a different speed than scroll */
export function createParallax(
  gsap: GSAP,
  target: gsap.TweenTarget,
  ScrollTrigger: any,
  triggerEl: Element,
  yPercent = -20
) {
  return gsap.to(target, {
    yPercent,
    ease: "none",
    scrollTrigger: {
      trigger: triggerEl,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

/* Marquee velocity: speed changes with scroll direction */
export function createMarqueeVelocity(
  gsap: GSAP,
  track: Element,
  ScrollTrigger: any
) {
  let xPercent = 0;
  let direction = -1;
  let speed = 0.5;

  const ticker = gsap.ticker.add(() => {
    xPercent += speed * direction;
    if (xPercent <= -50) xPercent = 0;
    if (xPercent > 0) xPercent = -50;
    gsap.set(track, { xPercent });
  });

  ScrollTrigger.create({
    trigger: track,
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self: any) => {
      direction = self.direction;
      speed = Math.min(Math.abs(self.getVelocity() / 300) + 0.5, 5);
    },
  });

  return ticker;
}

/* Clip-path stagger reveal for gallery images */
export function createClipReveal(
  gsap: GSAP,
  targets: gsap.TweenTarget,
  ScrollTrigger: any,
  triggerEl: Element
) {
  return gsap.from(targets, {
    clipPath: "inset(100% 0 0 0)",
    duration: 1.2,
    ease: "expo.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: triggerEl,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}

/* Count-up animation for numbers */
export function createCountUp(
  gsap: GSAP,
  obj: { val: number },
  targetVal: number,
  onUpdate: (v: number) => void,
  ScrollTrigger: any,
  triggerEl: Element
) {
  return gsap.to(obj, {
    val: targetVal,
    duration: 2,
    ease: "power2.out",
    onUpdate: () => onUpdate(Math.round(obj.val)),
    scrollTrigger: {
      trigger: triggerEl,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}
