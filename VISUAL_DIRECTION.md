# Lumen Dental Studio — Cinematic Visual Direction System

> This document is the single source of truth for every visual and motion decision on this site. Before creating any image asset, 3D model, video, or illustration: read the relevant section here. Every choice — lens choice, color grade, easing curve, material IOR — is deliberate and governed by this system.

---

## 1. Brand Positioning & Visual Territory

### The Emotional Contract
This site makes one promise before a word is read: *luxury without intimidation*. The visitor should feel what they feel walking into a high-end hotel lobby — not the sterile unease of a waiting room. The visual system exists entirely to create and sustain that feeling.

### The Three Tensions We Hold
1. **Clinical precision ↔ human warmth** — Technology shown as art, not engineering.
2. **Confidence ↔ approachability** — A brand that could charge more, but doesn't need to prove it.
3. **Modern ↔ timeless** — Never trendy. The site should feel current in 10 years.

### Reference Coordinates
- **Spatial feeling:** The Aman Tokyo lobby — generous, hushed, deliberate.
- **Color temperature:** Aesop stores — warm ivory with forest-dark accents.
- **Typography character:** Le Monde Diplomatique — serif authority at scale, utility at body size.
- **Motion character:** Apple product pages circa 2019 — reveals that feel inevitable, not performed.
- **3D register:** Cartier product visualization — material over geometry, light over form.

---

## 2. Color System

### The Palette as a Narrative Arc

The page runs a deliberate warm-to-dark-to-warm color temperature arc as the user scrolls. This is not random. It mirrors the patient journey: arrival (warm, welcoming) → discovery (cool, clinical precision) → departure (warm, resolved, booked).

```
SCROLL DIRECTION ↓

Hero          bg: #F6F4EF  (warm ivory — arrival, openness)
MarqueeIntro  bg: #2F5D52  (teal — energy, transition)
Doctors       bg: #FFFFFF  (pure white — clarity, trust)
DetailsList   bg: #F6F4EF  (back to warm — grounding)
SavingsBand   bg: #2F5D52  (teal — commitment, relief)
YomiShowcase  bg: #1A2421  (near-black — awe, drama)
TechCards     bg: #F6F4EF  (return to warmth — confidence)
ServicesSplit bg: #FFFFFF  (clinical white — clarity)
ExpertiseMarq bg: #F6F4EF  (warm — abundance)
ComfortGallery bg: #F4DCD0 (blush — intimacy, desire)
Testimonials  bg: #F6F4EF  (warm — validation)
ScheduleCTA   bg: #2F5D52→#1A2421 (dark — urgency)
FAQ           bg: #FFFFFF  (white — competence)
Location      bg: #F6F4EF  (warm — accessibility)
TrustBadges   bg: #FFFFFF  (white — credibility)
InstagramFeed bg: #F6F4EF  (warm — personality)
ContactForm   bg: #F4DCD0  (blush — invitation)
Footer        bg: #1A2421  (dark — resolution)
```

**Rule:** Never place two teal sections adjacent. Never place two dark sections adjacent. Never place two blush sections adjacent. The arc must breathe.

---

### Color Roles (Hard Rules)

#### `--color-bg` · `#F6F4EF` — The Canvas
The warmest neutral. Think aged linen, not hospital white. Use as the default section background. Never use pure `#FFFFFF` for a section background (that's `--color-surface`, for elevated elements only).

- ✅ Section backgrounds, page base, skeleton loaders
- ✅ The background behind the hero diagonal marquee text
- ❌ Never as text color, icon color, or border
- ❌ Never paired with `--color-blush` as adjacent sections (too close in temperature)

#### `--color-surface` · `#FFFFFF` — Elevation
Pure white signals "this element is above the page." Cards, modals, form fields, the nav (when scrolled).

- ✅ Cards, modals, mega-menu panel, form input backgrounds, doc cards
- ✅ Section backgrounds for `Doctors`, `ServicesSplit`, `FAQ`, `TrustBadges`
- ❌ Never as a hero background
- ❌ Never with only white nearby (loses the elevation signal — must contrast with `--color-bg`)

#### `--color-ink` · `#1A2421` — The Voice
Not black. A near-black with a 15% warm green cast — the color of very dark forest. This tint prevents the harshness of pure black against warm backgrounds.

- ✅ All primary headings, body text, strong UI labels
- ✅ The footer background
- ✅ Mobile menu overlay
- ❌ Never at full opacity on `--color-primary` backgrounds (use ivory instead)
- ❌ Never with opacity below 0.6 for text on `--color-bg` (contrast failure)

**Opacity variants in use:**
- `rgba(26,36,33,0.08)` — `--color-line` — dividers, borders
- `rgba(26,36,33,0.75)` — image overlays, modal backdrop
- `rgba(26,36,33,0.03)` — decorative watermark text (diagonal hero marquee)

#### `--color-ink-soft` · `#4A5550` — The Reading Color
The correct color for all body copy, descriptions, secondary labels. Has better readability at paragraph length than `--color-ink` (slightly lighter, same warmth).

- ✅ All `<p>` body copy, card descriptions, nav links at rest
- ✅ Form field placeholder text
- ✅ Doctor bio text, testimonial attribution
- ❌ Never for headings (too light for display scale)
- ❌ Never below 14px (contrast margin becomes too thin)

#### `--color-muted` · `#8A938F` — The Whisper
Tertiary labels, captions, timestamps, helper text. Use sparingly. Intentionally below WCAG AA on `--color-bg` — only for genuinely non-critical decorative text.

- ✅ Placeholder text in forms, "scroll" label on hero indicator, image captions
- ✅ Footer legal text, timestamp labels
- ❌ Never for actionable information (links, errors, required field labels)
- ❌ Never as primary text at any size

#### `--color-primary` · `#2F5D52` — Trust
Deep forest teal. The color of still water, of evergreens, of something reliable and alive. The single strongest brand color. Use with restraint — its power comes from scarcity.

- ✅ Eyebrow labels, animated SVG check icons, focus rings
- ✅ Primary button backgrounds, primary link hover states
- ✅ Full-section backgrounds (`MarqueeIntro`, `SavingsBand`)
- ✅ ContactShadow color in 3D scenes (tints the floor shadow)
- ❌ Never for body text on `--color-bg` (use `--color-ink-soft` instead)
- ❌ Never as a card border (too loud)
- ❌ Never more than once as a section background without a neutral between

**On dark backgrounds** (sections with `--color-primary` bg, `--color-ink` bg):
- Text: `#F6F4EF` (ivory) — not white
- Secondary text: `rgba(246,244,239,0.65)`
- Eyebrows: `--color-mint` (`#C8E0D6`)

#### `--color-accent` · `#D8B589` — The Luxury Signal
Warm sand / champagne. The most precious color in the palette. It signals cost and quality. Because it has low contrast on light backgrounds, it must always be used on dark backgrounds or as a fill color (stars, dots, active indicators).

- ✅ Star ratings (fill), active indicator dots, floating badge elements
- ✅ CTA button text/background on dark section backgrounds (`ScheduleCTA`, footer area CTAs)
- ✅ Robot arm end-effector material in 3D (gold tip)
- ✅ The dot after "lumen" in the logo mark
- ✅ Subtle glow behind the 3D canvas (radial gradient, very low opacity)
- ❌ Never as text color on `--color-bg` or `--color-surface` (WCAG fail)
- ❌ Never for UI borders or dividers
- ❌ Never as a section background

#### `--color-mint` · `#C8E0D6` — Comfort
The most approachable color. Soft, clinical-adjacent without being cold. Used for states that mean "safe," "selected," "confirmed."

- ✅ Animated checkmark container backgrounds
- ✅ FAQ open-state background tint
- ✅ Sparkles in the 3D hero scene (particle color)
- ✅ Fill light in 3D (cool key fill, slightly tinted mint)
- ✅ Eyebrow text on dark section backgrounds
- ✅ Scrollbar thumb at rest
- ❌ Never as a primary background on a full section
- ❌ Never paired with `--color-blush` in the same component (too many warm pastels)

#### `--color-blush` · `#F4DCD0` — Intimacy
The warmest color. More pink than ivory. Use only for sections where the content is about human experience — comfort, contact, the gallery.

- ✅ `ComfortGallery` section background
- ✅ `ContactForm` section background
- ✅ Subtle radial gradient behind doctor portrait cards
- ❌ Never as a button background
- ❌ Never with `--color-accent` text on top (both warm, low contrast)
- ❌ Maximum two blush sections per page — currently used in `ComfortGallery` and `ContactForm` which are separated by multiple sections ✓

---

## 3. Typography System

### Typeface Character Profiles

#### Fraunces Variable — The Display Voice
Fraunces is an optical-size variable serif with axes for softness (SOFT), wonkiness (WONK), and optical size (opsz). At large display sizes it should feel carved and editorial. At smaller sizes, the softness axis increases and it becomes warmer.

**At hero scale (≥72px):**
- Weight: 300–400 (light, confident — not thin, not bold)
- Optical size: 144 (maximum)
- Softness (SOFT): 0 (crisp, sharp serifs)
- Letter-spacing: −0.03em (tight — the letters lean into each other)
- Line-height: 0.95 (headings should nearly touch — this is an editorial choice)
- Italic: One word only. The italic in Fraunces is true-cut, not slanted — it changes personality, not just angle.

**At section heading scale (36–72px):**
- Weight: 400 (regular — the "neutral" voice of the brand)
- Optical size: 72–96
- Softness: 10 (slightly softer)
- Letter-spacing: −0.025em
- Line-height: 1.05

**At card/component scale (18–36px):**
- Weight: 400–500
- Lowercase mandatory (brand signature)
- The lowercase is not a casualty of style — it signals approachability from a position of strength

**The Italic Rule:**
Italic in Fraunces is reserved for ONE moment per heading, maximum. It signals the emotional core of the phrase.
- Hero: "your trusted *modern* dentistry" — italic on "modern" = the word doing the work
- ScheduleCTA heading could have: "ready for the dental *experience* you deserve" — italic on "experience"
- Never italic a whole heading. Never italic a CTA button. Never italic body text (except blockquotes/testimonials).

#### Inter Variable — The Body Voice
Completely neutral. Inter should never call attention to itself. If Inter is interesting, something is wrong.

**Weights in use:**
- 400: Body copy, descriptions, form field values
- 500: UI labels, button text (secondary), nav links, eyebrows
- 600: Button text (primary), form labels, strong emphasis in body

**Inter should never be:**
- Italic (except inside `<blockquote>` for testimonials)
- Below 13px
- Set in all-caps except eyebrow labels (12px, 500, tracking 0.15em)
- Used for display headings

### Type Scale (exact values)

| Name | Size | Line-height | Tracking | Weight | Face |
|---|---|---|---|---|---|
| Hero H1 | clamp(48px, 7vw, 120px) | 0.95 | −0.03em | 300–400 | Fraunces |
| Section H2 | clamp(36px, 5vw, 72px) | 1.05 | −0.025em | 400 | Fraunces |
| Card H3 | clamp(20px, 2.5vw, 32px) | 1.15 | −0.02em | 400–500 | Fraunces |
| Eyebrow | 12px | 1.2 | 0.15em | 500 | Inter |
| Body | 17px | 1.6 | 0 | 400 | Inter |
| Body strong | 17px | 1.6 | −0.01em | 600 | Inter |
| UI label | 14–15px | 1.4 | 0 | 500 | Inter |
| Button (lg) | 16px | 1 | −0.01em | 600 | Inter |
| Button (sm) | 14px | 1 | −0.01em | 600 | Inter |
| Caption | 12px | 1.4 | 0 | 400 | Inter |

### Typographic Restrictions
- ❌ No mixed case headings — all headings lowercase
- ❌ No bold Fraunces at display scale (800–900 weight reads as overcompensating)
- ❌ No underlines on headings or buttons
- ❌ No centered body paragraphs longer than 2 lines
- ❌ No text-shadow on any typographic element
- ❌ No more than 65 characters per line for body text (max-width constraint)

---

## 4. Spatial System

### The Grid Philosophy
Asymmetry is the rule, not the exception. A perfectly centered, balanced grid reads as generic. The Lumen grid is offset, weighted, intentional.

**Container:** max-width 1440px, padding 32px (24px on mobile)
**Column gut:** 24px between columns, 48px between major layout regions

### Vertical Rhythm
Section padding: `py-32 md:py-48` (128px / 192px)
- This is intentional generosity. Sections breathe. The user never feels rushed through the page.
- Exception: MarqueeIntro and TrustBadges are `py-6` and `py-16` — transition elements between sections, not destinations.

### Spacing Scale Discipline
Internal component spacing follows an 8px base grid:
- 4px: Icon-to-label gaps
- 8px: Tight groupings (eyebrow → heading)
- 16px: Sibling elements within a card
- 24px: Card padding
- 32px: Between major card regions
- 48px: Between component sections
- 64px+: Section-level separation

**The rule of proximity:** Elements that are semantically related must be visually closer to each other than to unrelated elements. Eyebrow + heading must read as one unit (8–12px gap). Heading + body must read as one unit (16–20px gap). Body + CTA must feel deliberate and separated (24–32px gap).

---

## 5. Motion Language

### The Three Principles

**1. Slow in, fast out**
Every reveal should decelerate to stillness — the cubic bezier `[0.16, 1, 0.3, 1]` achieves this. Elements enter with momentum and come to rest confidently. When elements exit (drawer closes, modal fades), they leave quickly — the user has decided, don't drag.

**2. Stagger is choreography, not chaos**
Stagger delay: 80ms between siblings. Always top-to-bottom, left-to-right. Never random. The stagger should be perceptible but not theatrical — like a wave passing through still water, not a circus act.

**3. Motion has a source**
Everything that moves should appear to have a physical cause. Elements reveal upward (they were below, scroll brings them into view). Cards lift when you approach them (hover intent). The 3D scene responds to the mouse (the viewer is in the space). Nothing moves without a legible reason.

### The Easing Bible

| Name | Bezier | Use case | Duration range |
|---|---|---|---|
| `entrance` | `[0.16, 1, 0.3, 1]` | All scroll reveals, page-load animations | 800–1200ms |
| `exit` | `[0.4, 0, 1, 1]` | Drawer close, modal dismiss, menu close | 250–350ms |
| `hover` | `[0.4, 0, 0.2, 1]` | Button scale, card lift | 120–200ms |
| `spring-gentle` | Framer `type:"spring", stiffness:200, damping:28` | Accordion open, counter pop | — |
| `scrub` | `"none"` (linear) | Parallax, scroll-linked values | tied to scroll |
| `infinite` | `"linear"` | Marquees, loading spinners | — |

**GSAP named equivalents:**
- `entrance` → `expo.out`
- `exit` → `power2.in`
- `hover` → `power2.inOut`
- `scrub` → `none`

### Timing Rules

| Interaction | Duration | Notes |
|---|---|---|
| Section reveal | 900ms | With 80ms stagger between children |
| Page-load hero | 1200ms | The hero gets more time — it's the first impression |
| Hover in | 150–200ms | Fast, responsive |
| Hover out | 200–300ms | Slightly slower — don't snap back |
| Modal open | 350ms | `entrance` curve |
| Modal close | 220ms | `exit` curve |
| Drawer (mobile menu) | 500ms | Clip-path reveal, top to bottom |
| Accordion open | 350ms | Auto-height with `spring-gentle` |
| Accordion close | 280ms | Faster exit |
| Marquee loop | 15–40s | Speed varies by section priority |
| 3D auto-rotation | 0.25 rad/s | Slow, meditative |
| Scroll indicator bounce | 2000ms loop | `easeInOut`, 8px travel |

### The Parallax System
Parallax is used in three places: `DetailsList` (building photo), `ComfortGallery` (individual images), `Hero` (gradient orbs).

**Speed ratios:**
- Background elements: `yPercent: -15` over full viewport travel (moves at 85% of scroll speed)
- Midground elements: `yPercent: -8` (moves at 92% of scroll speed)
- Foreground text: No parallax (text must always be perfectly readable)

**Rule:** Never apply parallax to text. Never apply parallax to interactive elements (buttons, forms). Parallax should be imperceptible to users who aren't looking for it.

### The Reduced Motion Contract
When `prefers-reduced-motion: reduce` is active:
- All GSAP timelines disabled
- All Framer Motion `animate` props become instant (override transitions to `{ duration: 0 }`)
- Lenis smooth scroll disabled (native scroll)
- 3D auto-rotation disabled (scene stays at initial position)
- Parallax disabled (images fixed in place)
- Marquees remain visible but stop animating (content still readable)
- No `initial` state — elements start at their final position

This is not a degraded experience — it is an equally valid experience.

---

## 6. Three-Dimensional Direction

### Scene 1 — The Tooth (Hero)

**What this object communicates:** The practice's precision and technology made physical. A tooth rendered as a premium object — something you'd see in a luxury product launch, not a biology textbook.

#### Geometry Specification
The tooth is a procedural mesh. Until a production-quality GLB is provided, the current assembly (box crown + cone roots) communicates the essential silhouette. When a real model is introduced, these material and lighting specs apply verbatim.

**Crown geometry:** Smooth, slightly rounded. Cusp edges softened (bevel radius ≈ 0.05). Not a perfect shape — real teeth are subtly imperfect. Add micro-displacement on the enamel surface (amplitude ≤ 0.003) to break the CG perfection.

**Root geometry:** Two tapered cylinders, slightly translucent. Roots are partially obscured by the gum line plane (a flat disc at y=−0.8, `--color-bg` tinted, slight transparency).

#### Material Specification — Crown Enamel
```
MeshPhysicalMaterial {
  color:               #F8F5F0   // warm ivory — never pure white
  roughness:           0.04      // nearly polished — like wet enamel
  metalness:           0.00      // enamel is not metallic
  transmission:        0.28      // 28% light passes through
  thickness:           1.6       // optical depth
  ior:                 1.45      // real enamel ≈ 1.63; we use 1.45 for beauty
  clearcoat:           1.00      // full wet-look coat
  clearcoatRoughness:  0.04
  envMapIntensity:     2.2       // environment contributes significantly
  attenuationColor:   #F5F0EC   // internal scattering color (warm)
  attenuationDistance: 0.5
}
```

#### Material Specification — Root Dentine
```
MeshPhysicalMaterial {
  color:               #F0EDE8   // slightly warmer / more yellow than crown
  roughness:           0.12      // less polished — dentine is matte
  metalness:           0.00
  transmission:        0.18      // less transparent than crown
  thickness:           1.0
  ior:                 1.40
  clearcoat:           0.60
  clearcoatRoughness:  0.12
  envMapIntensity:     1.4
}
```

#### Lighting Rig — Tooth Scene
```
Key Light:    DirectionalLight  pos:[5, 10, 5]    intensity:2.0   color:#FFF5E8 (warm 3200K)
Fill Light:   DirectionalLight  pos:[-8, 3, -3]   intensity:0.6   color:#E8F5FF (cool 7500K)
Rim Light:    DirectionalLight  pos:[-3, -2, -8]  intensity:1.2   color:#D8E8E4 (mint-tinted)
Accent Point: PointLight        pos:[5, -3, 5]    intensity:0.4   color:#D8B589 (champagne)
Ambient:      AmbientLight                        intensity:0.25  color:#F6F4EF

Environment:  "studio" preset  (drei <Environment>)
ContactShadow: pos:[0,-2.5,0]  opacity:0.4  blur:2.5  color:#2F5D52
```

**Lighting notes:**
- The warm key light simulates natural window light from upper-right — this is the "clinical but beautiful" look.
- The cool fill is what separates the left side and prevents flatness.
- The rim light from lower-back creates the translucency effect — the tooth appears to glow from within.
- The champagne accent point creates a subtle gold warmth in the shadow areas — linking to the `--color-accent` palette.

#### Camera — Tooth Scene
```
position:  [0, 0.5, 5]     // slightly above center height
fov:       42              // tighter than default — more cinematic
near:      0.1
far:       20
```

**Do not change the FOV without updating this document.** The 42° FOV is a deliberate choice — it compresses space slightly, making the tooth appear more monumental.

#### Animation — Tooth
- **Auto-rotation:** Y axis, 0.22 rad/s, continuous. Slow enough to feel meditative.
- **Mouse influence:** X and Y rotation, ±0.35 radians maximum travel. Responsive to cursor position in the canvas. Damped — the model follows the mouse at 30% speed (not 1:1).
- **Float:** Using drei `<Float>`, speed:1.5, rotationIntensity:0.25, floatIntensity:0.7. Barely perceptible — the object breathes.
- **Sparkles:** count:60, scale:5, size:1.5, speed:0.4, opacity:0.6, color:`#C8E0D6`. The particles suggest energy radiating from the object — they orbit loosely, not chaotically.
- **Scroll tilt:** As user scrolls down from hero, camera Y rotates −0.4 radians over the first 40% of scroll progress (via GSAP ScrollTrigger scrub).

---

### Scene 2 — The Yomi Robot Arm

**What this object communicates:** Technology that is both precise and organic. The arm should look like it belongs in a surgical theater designed by a luxury brand — medical grade and beautiful simultaneously.

#### Geometry Specification
Six-segment articulated arm. Each segment: cylinder body + sphere joint cap. The proportions should evoke a slender wrist, not industrial machinery.

**Segment proportions (design, not exact code values):**
- Segments taper from base (radius 0.18) to end effector (radius 0.06)
- Each segment is slightly longer than the previous (base: 1.2, mid: 1.0, upper: 0.8, forearm: 0.6, wrist: 0.4, end: 0.3)
- Joint spheres are 1.4× the segment radius — slightly exaggerated, like a designer watch crown

#### Material Specification — Arm Body (Brushed Stainless)
```
MeshPhysicalMaterial {
  color:              #C8CDD0   // warm silver — not chrome, not aluminum
  roughness:          0.12      // brushed — directional texture
  metalness:          0.92
  clearcoat:          0.80      // polished top coat over brush
  clearcoatRoughness: 0.06
  envMapIntensity:    1.8
}
```

#### Material Specification — Joints (Dark Anodized)
```
MeshPhysicalMaterial {
  color:    #1E2428   // near-ink — dark anodized aluminum
  roughness: 0.25
  metalness: 0.80
  clearcoat: 0.40
  envMapIntensity: 1.0
}
```

#### Material Specification — End Effector (Champagne Gold)
```
MeshPhysicalMaterial {
  color:     #D8B589   // exactly --color-accent
  roughness: 0.02      // mirror-polished
  metalness: 1.00
  clearcoat: 1.00
  clearcoatRoughness: 0.02
  envMapIntensity: 2.5
}
```

The end effector tip is gold. This is a deliberate brand link — the most precise, consequential part of the robot uses the luxury accent color. Technology as jewelry.

#### Lighting Rig — Yomi Scene
```
Key Light:    DirectionalLight  pos:[5, 10, 5]   intensity:2.5   color:#F0F4F8 (cool-neutral)
Fill Light:   PointLight        pos:[-8, 5, 0]   intensity:0.6   color:#C8E0D6 (mint)
Ground Light: PointLight        pos:[0, -4, 2]   intensity:0.3   color:#D8B589 (champagne, subtle)
Ambient:      AmbientLight                       intensity:0.35  color:#F0F4F8

Environment:  "city" preset
```

The Yomi scene is on a dark `--color-ink` background. Lighting must be more dramatic — higher contrast, cooler key, to match the cinematic register of the dark section.

**Active indicator light:** The end effector emits a `PointLight` with `color:#00ff88` (medical green), `intensity:3`, `distance:2`. This is the only "hot" light in the system — it's active state, life, precision.

#### Animation — Yomi Arm
Arm joints animate in three locked stages driven by `scrollProgress` (0→1):

| scrollProgress | Base rotation | Arm1 angle | Arm2 angle | Arm3 angle |
|---|---|---|---|---|
| 0.0 | 0 rad | −0.3 rad (neutral) | +0.2 rad | −0.1 rad |
| 0.33 | +0.5 rad | −0.1 rad | −0.2 rad | +0.1 rad |
| 0.66 | +1.0 rad | +0.2 rad | −0.5 rad | +0.2 rad |
| 1.0 | +1.57 rad | +0.4 rad | −0.8 rad | +0.4 rad |

Transition between stages: smooth via GSAP interpolation, not instant jumps. The arm should feel like it's performing a choreographed surgical approach as the user reads the three stages.

---

## 7. Photography Art Direction

### The Visual World
**Reference photographers:** Dan Tobin Smith (object photography), Nick Meek (lifestyle warmth), Erik Madigan Heck (color palette and composition). **Not:** Stock-photo dental photography (sterile, posed, clinical).

### Camera Specs (all photography)
- Focal length equivalent: 35mm for architecture/interiors, 85mm for people
- Wide open aperture (f/1.8–2.8) — subject isolation, not environmental documentation
- **No wide angle for people.** Wide angle distorts faces — this is a trust brand.
- Shot on medium or full frame format feel (not mobile-phone perspective)

### Color Grade Targets

**Shadows:** Pull green-teal (+15 hue, +5 saturation). This links the dark areas of photos to `--color-primary`.
**Midtones:** Neutral to very slightly warm (+3 temperature).
**Highlights:** Creamy — reduce white luminance by 8–12%, add subtle yellow (+5 hue in highlights). Never blown-out whites.
**Saturation:** −15 from natural. Slightly desaturated overall — this gives the premium, non-stock quality.
**Clarity:** +8 (subtle texture, not over-sharpened)
**Grain:** Subtle luminance grain at 15–20% — makes the image feel organic, not CG.

**Overall mood:** Think "Muji product photography" — serene, considered, nothing fighting for attention.

### Subject Direction by Category

#### Doctor Portraits
- **Pose:** Chest-height camera. Body at 30° angle to camera. Face turned toward lens, looking at a point 6 inches to the right of the lens (not directly in — too confrontational; not away — too dismissive).
- **Expression:** Professional warmth. A partial smile — the kind that says "I'm listening" not "say cheese." Relaxed jaw. No full-teeth smile.
- **Clothing:** White doctor's coat (clean, unwrinkled) OR business-casual (neutral tones — navy, soft gray, warm white). No scrubs. No stethoscopes around neck (cliché). No visible dental tools.
- **Background:** Plain `--color-bg` seamless OR blurred clean clinical space. Depth of field 30–50mm, background at f/2.8 blur.
- **Lighting:** Split 2-light: large softbox camera-left (key), 4×6' reflector camera-right (fill). Catch light must be visible in eye.
- **No:** Stock-photo body language (pointing at X-ray, holding drill, forced-laughing).

#### Office Interior Photography
- **The rule of one light source:** Every interior shot should have one clearly identifiable light source (window). No visible overhead fluorescent lighting in frame.
- **Composition:** Rule of thirds. One focal element. Strong leading lines (hallway perspectives, countertop edges).
- **Wait for the right hour:** Windows facing east → shoot morning. West → afternoon. North → overcast (even, flattering). Never use flash in interiors.
- **Declutter:** Remove everything that isn't intentionally designed. Clean surfaces, nothing on counters that wasn't placed by the photographer.
- **Specific shots needed (reference `/images/office/` placeholder comments in code):**
  - `exterior.jpg`: Building façade, golden hour, full-width crop
  - `reception.jpg`: Warm, welcoming, slight telephoto compression
  - `treatment-1.jpg`: Equipment as sculpture — not a patient chair with trays around it
  - `lounge.jpg`: Comfortable seating area, natural light, personal-feeling scale
  - `cerec-lab.jpg`: The CEREC machine from 45°, single overhead spot, equipment as art

#### Equipment Photography (Technology Cards)
- Background: Pure `--color-ink` (#1A2421) — dark, gallery-style
- Single directional light source (strip box, 45° from right)
- Equipment fills 70% of frame
- Slight perspective (not flat product shot) — 25° horizontal angle
- **Specific files needed:**
  - `/images/tech/cerec.jpg` — CEREC milling unit, chrome against dark bg
  - `/images/tech/yomi.jpg` — Yomi robot arm from low angle, heroic perspective
  - `/images/tech/solea.jpg` — Solea laser handpiece, macro detail, light scatter visible

#### Patient Photography
- **Emotion:** Relief and trust. The feeling after a visit, not during. A patient who just found out their tooth is saved, or who just saw their new smile for the first time.
- **No:** Open-mouth-at-camera, tools near face, clinical procedure shots. 
- **Yes:** Profile shot looking at reflection. Candid moment of reading in waiting room. Doctor-patient conversation (from behind patient shoulder).
- **Clothing:** Civilian — what they came in wearing. No patient bibs unless the bib is completely out of frame.

#### Instagram Grid
- Mix of 60% office/equipment, 30% people, 10% detail/texture
- Consistent warm-tone filter on all posts (the same preset across the grid)
- Slight vignette on all posts (darkens edges 10%)

---

## 8. Interactive State System

### The Five States for Every Interactive Element

#### 1. Rest
The element at its natural position. No animation playing. Colors at default values.

#### 2. Hover
The moment intent is signaled.
- **Cards:** `y: -6px` (translateY), shadow transitions from `--shadow-soft` to `--shadow-lift`, underlying image scales to 1.05. Duration: 300ms, `hover` curve.
- **Buttons:** `scale: 1.02`. Duration: 150ms. No color change during scale (color change happens after scale lands, to prevent visual conflict).
- **Links:** `color` transitions to `--color-primary`. No underline (the color change is sufficient signal).
- **Navigation links:** Color to primary, 200ms.
- **Images (gallery, Instagram):** Image scale 1.05, overlay fades in (duration 250ms). The overlay must have `will-change: opacity` to prevent repaint jank.
- **3D models:** Respond to cursor — not hover-triggered, continuous mouse tracking.

#### 3. Focus (keyboard navigation)
```css
outline: 2px solid var(--color-primary);
outline-offset: 4px;
border-radius: inherit or 4px if none;
```
This is non-negotiable. Never `outline: none` without a replacement. The focus ring uses `--color-primary` to stay on-brand.

#### 4. Active / Pressed
- Scale: 0.98
- Duration: 100ms, linear
- Immediate — no easing delay. This feels physical.

#### 5. Disabled
- Opacity: 0.4
- `cursor: not-allowed`
- No hover response
- No focus ring (not interactable)

### Form Field States

| State | Border | Background | Label | Notes |
|---|---|---|---|---|
| Rest | `--color-line` | `--color-bg` | `--color-ink-soft` | |
| Focused | `--color-primary` 2px | `--color-surface` | `--color-primary` | Slight lift shadow |
| Filled-valid | `--color-success` 1px | `--color-bg` | `--color-ink-soft` | Subtle checkmark icon |
| Error | `#EF4444` 2px | `rgba(239,68,68,0.04)` | `#EF4444` | Shake animation + aria-live error |
| Disabled | `--color-line` | `rgba(246,244,239,0.5)` | `--color-muted` | No interaction |

**Error shake animation:**
```
keyframes: x → [0, -8, 8, -6, 6, -4, 4, 0]
duration: 500ms
trigger: on form validation failure
```

### Loading States

**Spinner:** 20px diameter, 2px border, `rgba(255,255,255,0.3)` track color, `#FFFFFF` active arc, 0.8s rotation loop.

**Skeleton:** `--color-mint` at 30% opacity, pulsing between 30%→70% opacity over 1.2s loop. Border radius matches the element being loaded.

**Button loading:** Replace content with spinner + text "sending…" or equivalent. Button width locked to prevent layout shift. Background color shifts to `--color-primary-hover` (slightly lighter, signals processing).

---

## 9. Section-by-Section Cinematic Notes

Each section produces a specific emotional state. This is the director's intent for each scene.

### Hero — Scale and Possibility
**The feeling:** Walking into a space larger than you expected. The 3D tooth should feel subtly too large for its container — aspirational scale. The left column text reveals at different rates (not uniformly) — the headline arrives last and most dramatically.

**The camera's eye:** The 42° FOV makes the tooth monumental. The slight upward camera angle (looking at Y=0.5) means the viewer is always looking slightly up at the object — subconsciously registers as authority.

**What the diagonal marquee does:** It creates a sense of depth before any 3D loads. The faint text at −15° behind the content layers the scene.

**Pacing:** The hero is the slowest section on the site. The reveal takes 600ms longer than any other section (1200ms vs 900ms). Let it breathe.

### MarqueeIntro — Energy and Abundance
**The feeling:** The double doors opening after the lobby, revealing the main space. Busy, confident, overwhelming in the best way.

**Speed rule:** The marquee at 25s per cycle is fast enough to feel energetic, slow enough to read individual items. On mobile, reduce to 35s.

**The color switch:** This is the first dark section. The contrast from `--color-bg` to `--color-primary` should feel like a chord change, not a mistake.

### Doctors — Trust at Human Scale
**The feeling:** Meeting someone before you need them. The overlapping portraits communicate a team that's close, not transactional.

**The portrait rotation:** Card 1 at −3°, card 2 at +2°. These angles are personal — like photos pinned to a board, not corporate headshots in a grid. On hover, they straighten (rotate to 0) — they're paying attention to you.

**The hover info reveal:** Name and credentials must be fully legible (white on dark gradient). The "read bio" link with arrow is a ghost element that materializes on hover — not just appearing, but translating in from the left.

### DetailsList — The Promise Delivered Slowly
**The feeling:** Reading a well-reasoned argument. Deliberate. Each check mark drawing in is a commitment being made in real time.

**The SVG check animation:** Each path draws from left to right in 500ms, staggered 150ms apart. The containment circle fills after the check completes, not simultaneously. This sequencing is important — check first, then ring — reads as "confirmed."

**The building photo:** Slightly underexposed at the top, properly exposed at the facade. This emphasizes the building's permanence.

### SavingsBand — Relief Without Salesiness
**The feeling:** Finding out something you were worried about is actually fine. The heading "no insurance? no problem." must land without exclamation — the period after "no problem" is intentional. Confidence, not excitement.

**The flowing dot lines:** They are barely visible (6% opacity). Their purpose is subliminal — motion that says "things are flowing, everything is working." Not decorative, functional at the subconscious level.

### YomiShowcase — Awe and Precision
**The feeling:** Watching a clock being assembled by a master craftsman. The robot arm is beautiful and intimidating and reassuring simultaneously.

**The section should feel different:** This is the only section where the visitor stops scrolling to watch something. Design the text reveal pacing for someone who has paused — not rushing. The three stage texts are not a list; they are a sentence broken across space.

**The dark background:** This section earns its darkness. It's a reveal — pulling back a curtain on the technology. The green active indicator pulsing on the robot arm is the only point of color in a dark field — the eye goes there immediately.

**What the arm rotation communicates:** At scroll position 0, the arm is at rest (neutral, human-scale). At scroll 1.0, it has rotated 90° (operational, active). The visitor literally "activates" the robot by scrolling past this section.

### TechnologyCards — Confidence
**The feeling:** A museum of precision tools. Cards that lift when approached — physical objects, not images.

**The image within the card must scale separately from the card.** The card container stays fixed; the image inside scales to 1.05. This creates the impression of looking through a window into a space that's expanding.

**Gradient overlay deepening on hover:** The overlay goes from 70% to 90% opacity. This increases contrast, making the text (which rises up on hover) more legible while adding drama.

### ServicesSplit — Comprehensiveness
**The feeling:** A menu at a restaurant you're going to love — you want to order everything.

**The giant background numbers:** Opacity 8% on dark backgrounds, 4% on light. They should be detectable only when you're looking for them. Their purpose is scale and confidence — "we have numbered these; this is a system."

**The left-right alternation:** Not just visual variety. Each row is a different world (Routine → Restorative → Cosmetic). The spatial alternation underscores that these are distinct offerings, not subcategories.

### ExpertiseMarquee — Abundance at Speed
**The feeling:** Watching a train go by — too much information to absorb, but confidence-inspiring in its volume.

**Three-speed rows:** Row 1 (18s), Row 2 (22s), Row 3 (15s). The different speeds create a shimmer effect when watched — the words don't travel together. This prevents reading any single row and encourages a global impression of "many things."

**The hoverable words:** On hover, a small 180×120 preview image appears near the cursor. This is the interactive layer — for curious visitors who want to dig in. The image transition must be fast (200ms) and the cursor position tracking must be perfectly smooth (`useMotionValue` with direct DOM transforms, not state updates).

### ComfortGallery — Desire
**The feeling:** Scrolling through an interior design Instagram account and wanting to be there.

**The clip-path reveal is crucial here:** Images don't fade in — they wipe in from bottom to top. This is the most photographic reveal on the site. The reveal should feel like a polaroid developing. The stagger must be perceptible — 70ms between each image (slightly faster than the 80ms global standard, because gallery items are smaller and more numerous).

**The modal:** Opens with a shared-layout animation (the image scales from thumbnail position to full-size). On close, it scales back down to origin. This should feel continuous, not like a new element appearing.

### Testimonials — Validation
**The feeling:** Reading reviews on your phone before trying a new restaurant — believable, human, reassuring.

**The drag behavior:** The slider should feel physical. When released mid-drag, it should snap to the nearest card. The drag resistance at the ends (first and last card) prevents over-dragging into empty space.

**The quote marks:** Large, primary-mint fill. They should precede the text by 1.5 line heights — the quote character looms over the text like a visual anchor.

**The counter:** Counting up from 0 to 500 takes exactly 2 seconds. Not faster (loses drama), not slower (feels slow). The easing is `power2.out` — fast start, slow landing.

### ScheduleCTA — Urgency Without Pressure
**The feeling:** A view from a terrace at golden hour — you want to stay, and you also want to act before it's over.

**The Ken Burns zoom:** The background image scales from 1.0 → 1.04 over 8 seconds. Barely perceptible. It creates the feeling that the moment is unfolding in real time. Never faster — faster reads as anxious.

**The concentric circle decorations:** They don't animate. They're static — permanent rings that suggest outward reach, proximity, a place that radiates care. They are very subtle (4–8% opacity on dark background).

**The CTA button uses `--color-accent` on this section** — the only place on the page where the primary CTA is not `--color-primary`. The contrast between champagne gold and the dark background makes this the most visually distinct button on the page. It should stop the eye.

### FAQ — Competence
**The feeling:** A doctor who answers your question before you've finished asking it.

**The accordion open state:** Background tints to `--color-mint`. The tint must be the background of the answer panel only — not the entire accordion item. The question header stays on white.

**Sticky heading on desktop:** The left column (heading + sub-copy + CTAs) is `sticky: top-32`. As the user scrolls through answers, the heading remains visible. This prevents the user from losing context — they always know why they're reading.

### Location — Accessibility
**The feeling:** "We're right there. You can come. We're real."

**The map:** Dark style, zoomed to 13 (neighborhood level). The custom pin with pulse ring must be the only moving element on the map. On hover/interaction, the map eases to zoom 14 — the user can explore without the map fighting them.

**The address, phone, hours:** Displayed as facts, not marketing. Each with its icon, label, and action link. The "get directions" link opens in a new tab (target="_blank") — respect the user's context.

### TrustBadges — Credentialing
**The feeling:** Noticing the frames on the wall in a doctor's office — you don't read them, but they register.

**Grayscale default:** At rest, badges are `filter: grayscale(100%) opacity(60%)`. On hover, they transition to full color and full opacity (300ms). The grayscale signals that the brand doesn't need to shout about credentials — they're there when you look.

**The marquee speed:** 40s per cycle — slightly faster than MarqueeIntro (25s). The speed should be fast enough to feel like a continuous stream, slow enough to read individual items.

### ContactForm — Invitation
**The feeling:** Checking into a boutique hotel. The person behind the desk already knows your name and is expecting you.

**Form field focus:** When a field is focused, its border transitions to `--color-primary` (2px), the background lightens to pure `--color-surface`, and a very subtle lift shadow appears beneath it. The field literally rises to meet you.

**The conditional insurance plan field:** Animates in with `height: 0 → auto` over 300ms. The reveal should be smooth — the form adapts to the user, not vice versa.

**The submit button:** Loading state replaces "request appointment" text with a spinner + "sending…". On success, the entire form section fades out and the success state fades in — a full section transition, not a small status message.

**The left image panel:** The image should show a patient in a moment of relief — post-treatment, looking at themselves. The frosted glass caption panel at the bottom says "your first step toward a better smile." This caption lands before the form fields — it reframes the form as a beginning, not a bureaucratic requirement.

### Footer — Resolution
**The feeling:** Closing a beautifully designed book. Everything you need is here; nothing you don't.

**The giant background text:** "lumen dental studio" — the brand name as wallpaper. Clip-path reveals left-to-right as the footer enters the viewport. At 200px height, 2.5% opacity, it's a texture, not a typographic element.

**The color:** `--color-ink` background. This is the darkest section, and it comes last. The page has traveled from warmth (hero) to dark (Yomi, CTA) back to warmth (contact form) and now resolves in authoritative dark. The journey is complete.

---

## 10. Asset Delivery Specifications

### Photography
- Format: AVIF (primary), WebP (fallback), served via `next/image`
- Dimensions: 2× physical size minimum (e.g., a 600×400 card image → deliver at 1200×800)
- Doctor portraits: 600×800 (3:4 ratio, portrait)
- Office interiors: 1200×900 (4:3 ratio, landscape)
- Technology cards: 800×1067 (3:4 ratio, portrait)
- Hero background / CTA: 1920×1080 (16:9)
- OG image: 1200×630

### 3D Models (when replaced with production GLB)
- Format: `.glb` with Draco compression (target <500KB for tooth, <300KB for robot arm)
- Polygon budget: 80,000 triangles maximum for tooth, 40,000 for arm
- UV unwrapped for potential baked AO maps
- Origin at model center (0,0,0)
- Scale: 1 unit = 1 meter in scene (Three.js default)

### Icons
- Only from `lucide-react` (consistent stroke weight: 1.5px default)
- Size: 14px (inline text), 18px (UI elements), 24px (section decorative)
- Color: Always inherited via `currentColor` — never hardcoded

### Favicon
- Format: SVG (scalable, theming) + 32×32 PNG fallback + 180×180 Apple touch icon
- Design: The "L" letterform from the wordmark, or the tooth silhouette, in `--color-primary` on `--color-bg`

---

## 11. Do Not — System-Wide Rules

These rules apply everywhere, always. No exceptions without updating this document.

| Rule | Reason |
|---|---|
| Never pure `#000000` or `#FFFFFF` for content backgrounds | Kills the warmth |
| Never `box-shadow` values not in the shadow system | Creates visual inconsistency |
| Never `border-radius` other than the 4 system values | Fractures visual cohesion |
| Never uppercase headings | Brand voice — lowercase is the signature |
| Never bold (700+) Fraunces at display scale | Reads as overconfident |
| Never full-color accent (`#D8B589`) on white/bg backgrounds | WCAG contrast failure |
| Never a section with only centered text (no visual anchor) | Feels generic, unanchored |
| Never stock-feeling photography | Destroys trust and credibility |
| Never `ease: linear` for human-facing animations (only looping bg) | Feels robotic |
| Never a transition faster than 120ms for any user-facing state | Too fast to feel intentional |
| Never a scroll reveal triggered above `top 80%` viewport entry | Too early — elements flash in |
| Never more than one 3D canvas active simultaneously | Performance — only one WebGL context per route |
| Never override `prefers-reduced-motion` behavior | Legal risk, ethical requirement |
| Never add `z-index` values outside the system: nav=50, modals=200, overlays=100 | Stacking context chaos |

---

*This document is the visual authority for this project. When in doubt about any visual or motion decision, the answer is in here. If it isn't, the answer is: choose the option that is quieter, warmer, and slower.*
