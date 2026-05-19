# Dental Point Website — Upgrade Changelog

## PHASE 1 — Template Cleanup
- Renamed doctor images: `dr-jackson.webp` → `dr-dhritiman-borah.webp`, `dr-rund.webp` → `dr-asif-ahmed.webp`
- Updated `constants.ts` image paths to match new filenames
- Fixed `InstagramFeed.tsx`: `@lumendental` → `@dentalpointassam`, aria-label corrected
- Fixed `sitemap.ts`: all 4 `lumendental.com` URLs → `dentalpointguwahati.com`
- Updated `layout.tsx` JSON-LD schema: phone (+919864097338), address (full with Beltola Basistha Road), coordinates (26.139001, 91.789896), opening hours (09:00–21:00), Instagram handle (@dentalpointassam)

## PHASE 2 — 3D Hero Element
- Added `dynamic(() => import("@/components/three/ToothScene"), { ssr: false })` to Hero.tsx
- AuroraSection redesigned into a two-column layout: copy on left, 3D tooth on right (desktop only)
- Tooth fades in with x: 40 → 0 on mount, hidden on mobile via `hidden lg:block`
- Hero subtitle updated: "Guwahati's premier implant centre" → "Northeast India's premier implant centre"

## PHASE 3 — Guwahati / Northeast India Flavor
- New section: `NortheastReach.tsx` — SVG map of NE India with patient-origin dots, 3 stat cards (12+ years, 500+ implants, 50+ NRIs)
- Languages spoken listed: Assamese, Bengali, Hindi, English, Bodo
- Added to page.tsx between `<Testimonials />` and `<ScheduleCTA />`
- Footer bottom bar: added "Proudly serving Guwahati, Dispur, Beltola, and all of Northeast India since 2013."

## PHASE 4 — Micro-Interactions
- `WhatsAppButton.tsx`: red notification dot (top-right), periodic bounce every 8s, "Chat on WhatsApp" tooltip on first session visit (dismissable)
- `Pricing.tsx`: `.pricing-popular-glow` CSS animation added to "most popular" card — soft pulsing box-shadow every 3s
- `globals.css`: added `@keyframes popular-glow` and `.pricing-popular-glow` utility
- `MarqueeIntro.tsx`: added `pauseOnHover` prop
- `ExpertiseMarquee.tsx`: added `hover:[animation-play-state:paused]` to marquee track div
- `Pricing.tsx`: footer note updated with GST transparency note

## PHASE 5 — Trust Elements
- New section: `FeaturedIn.tsx` — "As featured in & certified by" strip with 6 entities (Assam Tribune, TOI, Northeast Now, IDA, Nobel Biocare, NABH); grayscale opacity style
- Added to page.tsx between `<TrustBadges />` and `<InstagramFeed />`
- `constants.ts` DOCTORS: added `experience`, `specializes`, `languages`, `regNo` fields to each doctor
- `Doctors.tsx`: doctor list rows now show experience badge + language chips (Assamese, Bengali, Hindi, English, Bodo)

## PHASE 6 — Mobile UX
- New component: `MobileCTABar.tsx` — fixed bottom bar on mobile only (`flex lg:hidden`), "Call Now" + "WhatsApp" buttons, shows/hides on scroll direction, respects `safe-area-inset-bottom`
- Added to page.tsx after `<WhatsAppButton />`
- `ContactForm.tsx`: phone input → `inputMode="tel"`, email input → `inputMode="email"`

## PHASE 7 — Content Polish
- `ContactForm.tsx`: emergency WhatsApp link added below form subtitle — "Dental emergency? WhatsApp us 24/7 on +91 98640 97338"
- `Pricing.tsx`: GST transparency note — "All prices include GST. No hidden charges. EMI starts from ₹1,500/month."

## PHASE 8 — SEO
- `layout.tsx`: added `other` metadata object with `geo.region: IN-AS`, `geo.placename: Guwahati, Assam`, `geo.position`, and `ICBM` coordinates
- JSON-LD schema: coordinates corrected to 26.139001, 91.789896; phone, address, hours all real data

## PHASE 9 — Smile Score Quiz (Lead Generation)
- New section: `SmileScore.tsx` — 4-question interactive quiz with Framer Motion slide transitions
- Questions: main concern → duration → priority → last dental visit
- Logic produces 5 result types: urgent care, implants, whitening, aligners, check-up
- Each result shows urgency-colored card (red/amber/green), personalized recommendation text, and CTA
- Lead capture: name + phone fields → mock submission with confirmation state
- "Start over" button to reset quiz
- Added to page.tsx between `<Pricing />` and `<ComfortGallery />`
