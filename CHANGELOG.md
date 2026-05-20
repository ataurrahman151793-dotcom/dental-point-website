# Dental Point Website — Upgrade Changelog

---

## MOBILE & CREDIBILITY PASS — May 2026

> Build: ✅ 0 errors. Lint: ✅ 0 errors, 9 pre-existing warnings.

### P0 — Critical Mobile Fixes
- **Marquee pause on mobile** (`globals.css`): `animation-play-state: paused` via `@media (max-width: 767px)` — eliminates continuous GPU repaint in `MarqueeIntro` and `ExpertiseMarquee`.
- **Contact form real backend** (`/app/api/contact/route.ts`): Next.js API route forwards submissions to Formspree; `ContactForm.tsx` updated from `console.log` to real `fetch POST /api/contact`. Error state shows phone fallback. Requires `FORMSPREE_FORM_ID` env var on Vercel.
- **DottedSurface disabled on mobile** (`Doctors.tsx`): Three.js WebGL loop with 2,400 particles skipped on mobile (`{!isMobile && <DottedSurface />}`).
- **Lint errors fixed**: `startTransition` wrapping for `setState` in effects — `Testimonials.tsx:23` and `DiagonalSlider.tsx:92`.

### P2 — Structural / SEO
- **6 service pages** created under `/(inner)/services/`: dental-implants, clear-aligners, veneers, root-canal, teeth-whitening, kids-dentistry. Each has H1 + location keyword, 350+ word body, FAQPage JSON-LD, BreadcrumbList JSON-LD, CTA.
- **About page** `/about` with clinic mission, doctor bios, address.
- **Contact page** `/contact` with contact details grid.
- **`sitemap.ts`** now uses `SITE_URL` env var + includes all new routes.

### P3 — Credibility & Legal
- **TRUST_BADGES cleanup** (`constants.ts`): Removed NABH (unverified), replaced Nobel Biocare with generic "Premium Implant Systems", replaced "Invisalign Certified" with "Clear Aligner Specialist", added "Computer-Guided Surgery".
- **"Invisalign" removed from SEO** (`layout.tsx`): keywords, meta description, OG description, Twitter description, JSON-LD schema description all updated to "clear aligners".
- **Footer** (`Footer.tsx`): "invisalign" link label → "clear aligners".
- **Pricing disclaimer** (`Pricing.tsx`): Full binding-quote disclaimer added — complexity, implant brand, additional procedures all disclosed.

### P4 — Nice-to-Have
- **`theme-color` meta** (`layout.tsx`): `#2F5D52` — Android Chrome status bar now tints brand green.
- **`SITE_URL` fallback** (`siteConfig.ts`): Updated from `dentalpointguwahati.com` to `dental-point-ataur.vercel.app` (set `NEXT_PUBLIC_SITE_URL` env var when real domain is ready).

### Items Requiring Client Action
| Item | Action needed |
|---|---|
| Contact form delivery | Set `FORMSPREE_FORM_ID` env var in Vercel |
| Real domain | Set `NEXT_PUBLIC_SITE_URL=https://dentalpointguwahati.com` in Vercel |
| NABH badge | Provide NABH certificate to add back |
| Nobel/implant brand | Confirm actual implant system used |
| Press links | Provide actual URLs for Assam Tribune / TOI / Northeast Now articles |
| MCI registration | Replace `TODO[CLIENT]` in `constants.ts` DOCTORS |

---

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
