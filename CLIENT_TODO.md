# CLIENT_TODO — Dental Point & Implant Centre

Items marked ⚠️ must be resolved before public launch.

---

## PHOTOS (Required)

- [ ] ⚠️ **Dr. Dhritiman Borah** — professional portrait photo → save as `public/images/doctors/dr-dhritiman-borah.webp`
- [ ] ⚠️ **Dr. Asif Ahmed** — professional portrait photo → save as `public/images/doctors/dr-asif-ahmed.webp`
- [ ] **Clinic interior** — reception, treatment room, waiting area (currently using placeholder gallery images)
- [ ] **Before/After patient images** — minimum 3 sets with written patient consent (for a future before/after slider section)
- [ ] **Hero poster frame** — static image fallback for hero video (`/images/hero-poster.jpg`, 1920×1080px)

---

## CREDENTIALS (Required)

- [ ] ⚠️ **Dr. Dhritiman Borah** — MCI / State Dental Council registration number (currently showing "ASD/MCI/XXXXX" as placeholder)
- [ ] ⚠️ **Dr. Asif Ahmed** — MCI / State Dental Council registration number (currently showing "ASD/MCI/XXXXX" as placeholder)

Update these in `src/lib/constants.ts` under each doctor's `regNo` field.

---

## MEDIA FEATURES (Confirm Before Launch)

The "As featured in" strip currently shows these entries — confirm which are real before going live:

- [ ] The Assam Tribune — confirm feature/mention
- [ ] Times of India — confirm feature/mention
- [ ] Northeast Now — confirm feature/mention
- [ ] IDA membership — confirm current membership
- [ ] Nobel Biocare partner status — confirm
- [ ] NABH certification — confirm current status

Update or remove unconfirmed entries in `src/components/sections/FeaturedIn.tsx`.

---

## TESTIMONIALS

- [ ] Provide real patient testimonials with names and permission to publish
- Currently using 5 placeholder testimonials in `src/lib/constants.ts` under `TESTIMONIALS`

---

## BUSINESS INFORMATION (Verify)

- [ ] **Opening hours** — currently showing Mon–Sat 9am–9pm. Confirm this is accurate (Mappls showed 12pm–7pm — sources conflicted)
- [ ] **Google Rating** — currently showing 4.9 / 300+ reviews. Update with real Google Maps rating in `src/lib/constants.ts` (`rating` and `reviewCount`)
- [ ] **Instagram handle** — currently `@dentalpointassam`. Confirm this is the active account
- [ ] **Facebook page** — currently linked to `facebook.com/dentalpointguwahati`. Confirm active

---

## DOMAIN & DEPLOYMENT

- [ ] Register `dentalpointguwahati.com` (or preferred domain)
- [ ] Add custom domain in Vercel: Dashboard → Settings → Domains
- [ ] Update all domain references in `src/app/layout.tsx` and `src/app/sitemap.ts` once domain is confirmed

---

## CONTACT FORM

- [ ] Wire up the contact form to a real backend (currently logs to console)
  - Recommended: Formspree, Resend, or a simple email API
  - File: `src/components/sections/ContactForm.tsx`, `onSubmit` function

---

## GOOGLE MAPS

- [ ] Add a real Mapbox token in `.env.local` → `NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxxxx` (if switching back to Mapbox)
  - Currently using react-leaflet with CartoDB dark tiles — no token needed

---

## NICE TO HAVE (Future Phases)

- [ ] Before/After slider section with real patient images (`react-compare-slider` already planned)
- [ ] Real Google Reviews widget (requires Google Places API key)
- [ ] WhatsApp Business number verification (green tick badge)
- [ ] Blog / patient education section for SEO
