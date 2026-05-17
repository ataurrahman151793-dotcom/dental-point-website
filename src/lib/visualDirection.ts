/**
 * VISUAL DIRECTION SYSTEM — Lumen Dental Studio
 *
 * Single source of truth for every design token, easing curve,
 * timing value, material property, and motion principle.
 *
 * Human-readable version: /VISUAL_DIRECTION.md
 * These constants are imported by components — never hardcode
 * a value that exists here.
 */

// ─────────────────────────────────────────────────────────────────
// COLOR ROLES
// ─────────────────────────────────────────────────────────────────

export const COLOR = {
  bg:           "#F6F4EF",  // warm ivory — primary canvas
  surface:      "#FFFFFF",  // elevated cards, modals
  ink:          "#1A2421",  // near-black with warm forest cast
  inkSoft:      "#4A5550",  // body copy, secondary labels
  muted:        "#8A938F",  // captions, tertiary, non-critical
  primary:      "#2F5D52",  // deep forest teal — trust
  primaryHover: "#3D7065",  // hover state of primary
  accent:       "#D8B589",  // champagne — luxury signal
  mint:         "#C8E0D6",  // soft mint — comfort, selected states
  blush:        "#F4DCD0",  // warm blush — intimacy sections
  success:      "#5B8C7E",  // confirmed, valid states

  // Semantic
  line:         "rgba(26,36,33,0.08)",   // dividers, borders
  overlay75:    "rgba(26,36,33,0.75)",   // modal backdrop, image overlays
  overlay40:    "rgba(26,36,33,0.40)",   // lighter overlay
  watermark:    "rgba(26,36,33,0.03)",   // decorative text on bg

  // On-dark variants (text on --color-primary or --color-ink bg)
  onDark:       "#F6F4EF",                        // primary text on dark
  onDarkSoft:   "rgba(246,244,239,0.65)",          // body on dark
  onDarkMuted:  "rgba(246,244,239,0.40)",          // muted on dark
  onDarkBorder: "rgba(255,255,255,0.08)",          // dividers on dark
} as const;

// ─────────────────────────────────────────────────────────────────
// SECTION BACKGROUND SEQUENCE
// Maps section name → background color token
// Governs the warm↔cool arc across the page
// ─────────────────────────────────────────────────────────────────

export const SECTION_BG: Record<string, string> = {
  hero:          COLOR.bg,
  marqueeIntro:  COLOR.primary,
  doctors:       COLOR.surface,
  detailsList:   COLOR.bg,
  savingsBand:   COLOR.primary,
  yomiShowcase:  COLOR.ink,
  technologyCards: COLOR.bg,
  servicesSplit: COLOR.surface,
  expertiseMarquee: COLOR.bg,
  comfortGallery:COLOR.blush,
  testimonials:  COLOR.bg,
  scheduleCTA:   COLOR.ink,    // gradient primary→ink
  faq:           COLOR.surface,
  location:      COLOR.bg,
  trustBadges:   COLOR.surface,
  instagramFeed: COLOR.bg,
  contactForm:   COLOR.blush,
  footer:        COLOR.ink,
};

// ─────────────────────────────────────────────────────────────────
// TYPOGRAPHY TOKENS
// ─────────────────────────────────────────────────────────────────

export const TYPE = {
  families: {
    display: '"Fraunces Variable", Georgia, serif',
    body:    '"Inter Variable", system-ui, sans-serif',
  },

  scale: {
    heroH1: {
      size:        "clamp(48px, 7vw, 120px)",
      lineHeight:  0.95,
      tracking:    "-0.03em",
      weight:      400,       // light-regular — never bold at hero scale
      face:        "display" as const,
    },
    sectionH2: {
      size:        "clamp(36px, 5vw, 72px)",
      lineHeight:  1.05,
      tracking:    "-0.025em",
      weight:      400,
      face:        "display" as const,
    },
    cardH3: {
      size:        "clamp(20px, 2.5vw, 32px)",
      lineHeight:  1.15,
      tracking:    "-0.02em",
      weight:      500,
      face:        "display" as const,
    },
    eyebrow: {
      size:        "12px",
      lineHeight:  1.2,
      tracking:    "0.15em",
      weight:      500,
      transform:   "uppercase" as const,
      face:        "body" as const,
    },
    body: {
      size:        "17px",
      lineHeight:  1.6,
      tracking:    "0",
      weight:      400,
      face:        "body" as const,
    },
    uiLabel: {
      size:        "14px",
      lineHeight:  1.4,
      tracking:    "0",
      weight:      500,
      face:        "body" as const,
    },
    buttonLarge: {
      size:        "16px",
      lineHeight:  1,
      tracking:    "-0.01em",
      weight:      600,
      face:        "body" as const,
    },
    buttonSmall: {
      size:        "14px",
      lineHeight:  1,
      tracking:    "-0.01em",
      weight:      600,
      face:        "body" as const,
    },
    caption: {
      size:        "12px",
      lineHeight:  1.4,
      tracking:    "0",
      weight:      400,
      face:        "body" as const,
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────────
// SPACING & LAYOUT
// ─────────────────────────────────────────────────────────────────

export const SPACE = {
  containerMax:   "1440px",
  gutterDesktop:  "2rem",    // 32px
  gutterMobile:   "1.5rem",  // 24px

  // 8px base grid
  xs:   "4px",
  sm:   "8px",
  md:   "16px",
  lg:   "24px",
  xl:   "32px",
  xxl:  "48px",
  xxxl: "64px",

  // Section vertical padding (Tailwind tokens)
  sectionPyMobile:  "py-32",   // 128px
  sectionPyDesktop: "md:py-48", // 192px

  // Radius system
  radiusSm:   "8px",
  radiusMd:   "16px",
  radiusLg:   "28px",
  radiusPill: "999px",

  // Z-index layers
  zNav:     50,
  zOverlay: 100,
  zModal:   200,
  zToast:   300,
} as const;

// ─────────────────────────────────────────────────────────────────
// MOTION — EASING CURVES
// ─────────────────────────────────────────────────────────────────

/**
 * Bezier tuples — use with Framer Motion `ease` prop (must be cast
 * `as [number,number,number,number]` for TypeScript).
 *
 * GSAP string equivalents listed in comments.
 */
export const EASE = {
  /** Fast out → slow land. All scroll reveals, page-load. GSAP: "expo.out" */
  entrance:  [0.16, 1, 0.30, 1] as [number, number, number, number],

  /** Slow start → fast exit. Dismissals, closures. GSAP: "power2.in" */
  exit:      [0.40, 0, 1.00, 1] as [number, number, number, number],

  /** Symmetrical — hover responses, toggles. GSAP: "power2.inOut" */
  hover:     [0.40, 0, 0.20, 1] as [number, number, number, number],

  /** Parallax, scroll-scrub. No easing — rate matches scroll. */
  scrub:     "none" as const,

  /** Looping marquees, spinners. */
  infinite:  "linear" as const,
} as const;

// ─────────────────────────────────────────────────────────────────
// MOTION — TIMING
// ─────────────────────────────────────────────────────────────────

export const DURATION = {
  // Reveals
  heroLoad:      1200,  // ms — hero gets the longest intro
  sectionReveal:  900,  // ms — standard scroll reveal
  stagger:         80,  // ms — between sibling elements

  // Discrete interactions
  hoverIn:        150,  // ms
  hoverOut:       250,  // ms — slightly slower return
  active:         100,  // ms — physical press feel

  // Components
  modalOpen:      350,
  modalClose:     220,
  drawerOpen:     500,  // mobile menu clip-path
  drawerClose:    350,
  accordionOpen:  350,
  accordionClose: 280,

  // Loops
  scrollIndicator: 2000, // bounce loop
  marqueeFast:   15000,  // ms per full cycle (fast rows)
  marqueeDefault:25000,
  marqueeSlow:   40000,  // badge row

  // Ken Burns
  kenBurns:      8000,   // CTA section slow zoom

  // Counter
  countUp:       2000,   // review count animation

  // 3D
  spinnerLoop:    800,   // loading spinner rotation
} as const;

// ─────────────────────────────────────────────────────────────────
// MOTION — PARALLAX RATES
// ─────────────────────────────────────────────────────────────────

export const PARALLAX = {
  /** Background images (building exterior, hero orbs) */
  background:   -15,    // yPercent over full viewport travel

  /** Mid-layer elements */
  mid:          -8,

  /** Text: never parallax */
  text:          0,
} as const;

// ─────────────────────────────────────────────────────────────────
// MOTION — SCROLL REVEAL DEFAULT VARIANT
// ─────────────────────────────────────────────────────────────────

export const REVEAL_VARIANT = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.sectionReveal / 1000,
      ease:     EASE.entrance,
    },
  },
} as const;

/** Horizontal variant (for left-from elements) */
export const REVEAL_LEFT = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.sectionReveal / 1000, ease: EASE.entrance },
  },
} as const;

/** Horizontal variant (for right-from elements) */
export const REVEAL_RIGHT = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.sectionReveal / 1000, ease: EASE.entrance },
  },
} as const;

// ─────────────────────────────────────────────────────────────────
// SCROLL TRIGGER CONFIG DEFAULTS
// ─────────────────────────────────────────────────────────────────

export const SCROLL_TRIGGER = {
  start:         "top 75%",   // trigger when element top hits 75% of viewport
  toggleActions: "play none none none",
  scrubDefault:  true,
} as const;

// ─────────────────────────────────────────────────────────────────
// 3D — SCENE 1: TOOTH
// ─────────────────────────────────────────────────────────────────

export const TOOTH_SCENE = {
  camera: {
    position:  [0, 0.5, 5] as [number, number, number],
    fov:       42,
    near:      0.1,
    far:       20,
  },

  rotation: {
    autoSpeedY:     0.22,   // rad/s — continuous auto-rotation
    mouseInfluenceX: 0.35,  // max radians from mouse
    mouseInfluenceY: 0.35,
    mouseFollowRate: 0.30,  // 30% — damped, not 1:1
  },

  float: {
    speed:             1.5,
    rotationIntensity: 0.25,
    floatIntensity:    0.70,
  },

  sparkles: {
    count:   60,
    scale:   5,
    size:    1.5,
    speed:   0.4,
    opacity: 0.6,
    color:   COLOR.mint,
  },

  contactShadow: {
    position:  [0, -2.5, 0] as [number, number, number],
    opacity:   0.4,
    scale:     6,
    blur:      2.5,
    far:       4,
    color:     COLOR.primary,
  },

  materials: {
    crown: {
      color:               "#F8F5F0",
      roughness:            0.04,
      metalness:            0.00,
      transmission:         0.28,
      thickness:            1.60,
      ior:                  1.45,
      clearcoat:            1.00,
      clearcoatRoughness:   0.04,
      envMapIntensity:      2.20,
      attenuationColor:    "#F5F0EC",
      attenuationDistance:  0.50,
    },
    root: {
      color:               "#F0EDE8",
      roughness:            0.12,
      metalness:            0.00,
      transmission:         0.18,
      thickness:            1.00,
      ior:                  1.40,
      clearcoat:            0.60,
      clearcoatRoughness:   0.12,
      envMapIntensity:      1.40,
    },
  },

  lights: {
    key:    { position: [5, 10, 5]   as [number,number,number], intensity: 2.0,  color: "#FFF5E8" },
    fill:   { position: [-8, 3, -3]  as [number,number,number], intensity: 0.6,  color: "#E8F5FF" },
    rim:    { position: [-3, -2, -8] as [number,number,number], intensity: 1.2,  color: "#D8E8E4" },
    accent: { position: [5, -3, 5]   as [number,number,number], intensity: 0.4,  color: "#D8B589" },
    ambient: { intensity: 0.25, color: "#F6F4EF" },
  },

  environment: "studio" as const,
} as const;

// ─────────────────────────────────────────────────────────────────
// 3D — SCENE 2: YOMI ARM
// ─────────────────────────────────────────────────────────────────

export const YOMI_SCENE = {
  camera: {
    position: [3, 2, 5] as [number, number, number],
    fov:      40,
  },

  /* Scroll progress → joint rotation keyframes */
  armKeyframes: [
    { progress: 0.00, baseY:  0.00, arm1Z: -0.30, arm2Z: +0.20, arm3Z: -0.10 },
    { progress: 0.33, baseY: +0.50, arm1Z: -0.10, arm2Z: -0.20, arm3Z: +0.10 },
    { progress: 0.66, baseY: +1.00, arm1Z: +0.20, arm2Z: -0.50, arm3Z: +0.20 },
    { progress: 1.00, baseY: +1.57, arm1Z: +0.40, arm2Z: -0.80, arm3Z: +0.40 },
  ],

  materials: {
    body: {     // brushed stainless
      color:              "#C8CDD0",
      roughness:           0.12,
      metalness:           0.92,
      clearcoat:           0.80,
      clearcoatRoughness:  0.06,
      envMapIntensity:     1.80,
    },
    joints: {   // dark anodized
      color:    "#1E2428",
      roughness: 0.25,
      metalness: 0.80,
      clearcoat: 0.40,
      envMapIntensity: 1.00,
    },
    endEffector: {  // champagne gold — links to COLOR.accent
      color:              "#D8B589",
      roughness:           0.02,
      metalness:           1.00,
      clearcoat:           1.00,
      clearcoatRoughness:  0.02,
      envMapIntensity:     2.50,
    },
  },

  lights: {
    key:     { position: [5, 10, 5]  as [number,number,number], intensity: 2.5, color: "#F0F4F8" },
    fill:    { position: [-8, 5, 0]  as [number,number,number], intensity: 0.6, color: "#C8E0D6" },
    ground:  { position: [0, -4, 2]  as [number,number,number], intensity: 0.3, color: "#D8B589" },
    ambient: { intensity: 0.35, color: "#F0F4F8" },
    active:  { color: "#00ff88", intensity: 3, distance: 2 },  // end effector indicator
  },

  environment: "city" as const,
} as const;

// ─────────────────────────────────────────────────────────────────
// INTERACTIVE STATE TOKENS
// ─────────────────────────────────────────────────────────────────

export const STATES = {
  hover: {
    cardLift:      -6,       // px translateY on card hover
    imageScale:    1.05,     // image within card scales
    buttonScale:   1.02,
  },
  active: {
    scale:         0.98,
    duration:      DURATION.active,
  },
  focus: {
    outline:       "2px solid var(--color-primary)",
    outlineOffset: "4px",
  },
  error: {
    shake:         [0, -8, 8, -6, 6, -4, 4, 0],  // x keyframes
    shakeDuration: 500,
    borderColor:   "#EF4444",
    bgColor:       "rgba(239,68,68,0.04)",
  },
  loading: {
    spinnerSize:   20,     // px
    spinnerBorder:  2,     // px
    spinnerTrack:  "rgba(255,255,255,0.3)",
    spinnerActive: "#FFFFFF",
    spinnerDuration: DURATION.spinnerLoop,
  },
} as const;

// ─────────────────────────────────────────────────────────────────
// PHOTOGRAPHY GRADE TARGETS
// (reference values for image processing/commissioning)
// ─────────────────────────────────────────────────────────────────

export const PHOTO_GRADE = {
  shadows:         { hue: +15, saturation: +5 },   // pull green-teal into shadows
  midtones:        { temperature: +3 },              // barely warm
  highlights:      { hue: +5, luminance: -10 },      // creamy, pulled back
  saturation:      -15,                              // desaturate from natural
  clarity:         +8,
  grain:           { luminance: 15, size: 25, roughness: 50 },

  focalLength: {
    architecture:  35,
    people:        85,
    product:       100,  // slight compression on equipment
  },

  aperture: {
    min: 1.8,
    max: 2.8,
  },
} as const;

// ─────────────────────────────────────────────────────────────────
// SHADOW SYSTEM
// ─────────────────────────────────────────────────────────────────

export const SHADOW = {
  soft: "0 10px 40px -10px rgba(26,36,33,0.12)",
  lift: "0 30px 80px -20px rgba(26,36,33,0.18)",
} as const;

// ─────────────────────────────────────────────────────────────────
// SECTION EMOTIONAL TARGETS
// Reference for copy review and asset decisions
// ─────────────────────────────────────────────────────────────────

export const SECTION_EMOTION: Record<string, string> = {
  hero:           "Scale and possibility — the space is larger than expected",
  marqueeIntro:   "Energy and abundance — we have a lot to offer",
  doctors:        "Trust at human scale — a confident handshake",
  detailsList:    "Reassurance — we have thought of everything",
  savingsBand:    "Relief — what you were worried about is solved",
  yomiShowcase:   "Awe — technology as art, precision as beauty",
  technologyCards:"Confidence — the best tools, clearly displayed",
  servicesSplit:  "Comprehensiveness — a complete system, not random services",
  expertiseMarquee:"Abundance — so many procedures it signals mastery",
  comfortGallery: "Desire — a space you want to be in",
  testimonials:   "Validation — real people, real words",
  scheduleCTA:    "Urgency without pressure — the moment is now",
  faq:            "Competence — we answer before you ask",
  location:       "Accessibility — we're real, we're close, come in",
  trustBadges:    "Credentialing — quietly noted, not shouted",
  instagramFeed:  "Personality — behind the scenes, human",
  contactForm:    "Invitation — checking in, not filling out forms",
  footer:         "Resolution — everything you need, at rest",
} as const;

// ─────────────────────────────────────────────────────────────────
// ASSET SIZE SPECIFICATIONS
// ─────────────────────────────────────────────────────────────────

export const ASSET_SIZES = {
  doctorPortrait:   { w: 600,  h: 800,  ratio: "3:4"  },
  officeInterior:   { w: 1200, h: 900,  ratio: "4:3"  },
  technologyCard:   { w: 800,  h: 1067, ratio: "3:4"  },
  heroCta:          { w: 1920, h: 1080, ratio: "16:9" },
  servicesSplit:    { w: 1000, h: 750,  ratio: "4:3"  },
  instagramPost:    { w: 600,  h: 600,  ratio: "1:1"  },
  og:               { w: 1200, h: 630,  ratio: "~2:1" },
} as const;

// ─────────────────────────────────────────────────────────────────
// SYSTEM-WIDE RESTRICTIONS (documented for code review reference)
// ─────────────────────────────────────────────────────────────────

export const SYSTEM_RULES = [
  "Never pure #000 or #FFF for content section backgrounds",
  "Never box-shadow values outside SHADOW.soft / SHADOW.lift",
  "Never border-radius outside the 4 system values (sm/md/lg/pill)",
  "Never uppercase headings — all headings lowercase",
  "Never Fraunces weight 700+ at display scale",
  "Never --color-accent on white/bg (WCAG contrast failure)",
  "Never centered body paragraphs longer than 2 lines",
  "Never ease:linear for user-facing animations (only loops)",
  "Never transition faster than 120ms for any user-facing state",
  "Never scroll reveal start above 'top 80%'",
  "Never more than one active WebGL context simultaneously",
  "Never override prefers-reduced-motion behavior",
  "z-index: nav=50, overlay=100, modal=200, toast=300 — nothing else",
] as const;
