import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Professional Teeth Whitening in Guwahati | Dental Point",
  description:
    "Get 4–6 shades brighter teeth in a single 60-minute session with laser teeth whitening in Guwahati. No sensitivity formula. Book at Dental Point.",
  openGraph: {
    title: "Teeth Whitening in Guwahati | Dental Point",
    description: "Professional laser teeth whitening — 4–6 shades brighter in 60 minutes. No sensitivity, long-lasting results.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How white will my teeth get after professional whitening?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most patients achieve 4–6 shades lighter in a single in-clinic session. The exact result depends on your natural tooth colour and the type of staining. Yellow and brown surface stains respond best. Internal discolouration (from antibiotics or fluorosis) may require a different approach.",
      },
    },
    {
      "@type": "Question",
      name: "Does teeth whitening cause sensitivity?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our professional formula is specifically designed to minimise sensitivity. Most patients experience none at all. If you already have sensitive teeth, we apply a desensitising gel before and after the procedure. Any mild sensitivity that does occur typically resolves within 24–48 hours.",
      },
    },
    {
      "@type": "Question",
      name: "How long does teeth whitening last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Professional in-clinic whitening results typically last 12–24 months with good oral hygiene and avoiding heavy staining foods and drinks. We provide take-home maintenance trays to extend and top up your results as needed.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://dental-point-ataur.vercel.app" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://dental-point-ataur.vercel.app/services" },
    { "@type": "ListItem", position: 3, name: "Teeth Whitening", item: "https://dental-point-ataur.vercel.app/services/teeth-whitening" },
  ],
};

export default function TeethWhiteningPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article style={{ background: "var(--color-bg)", color: "var(--color-ink)", paddingTop: "7rem" }}>

        <section style={{ background: "var(--color-primary)", padding: "4rem 1.5rem 3rem" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-mint)", marginBottom: "1rem" }}>
              Cosmetic Dentistry · Guwahati
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#F6F4EF", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.25rem" }}>
              Professional Teeth Whitening in Guwahati, Assam
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(246,244,239,0.75)", lineHeight: 1.65, maxWidth: 580 }}>
              Lift years of staining in a single 60-minute session. Our professional whitening formula delivers 4–6 shades of brightness while protecting your enamel — results that no over-the-counter kit can match.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <Link href="/#contact-form" style={{ display: "inline-flex", alignItems: "center", background: "var(--color-accent)", color: "var(--color-ink)", padding: "0.85rem 1.75rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Book a Session
              </Link>
              <a href="tel:+919864097338" style={{ display: "inline-flex", alignItems: "center", border: "1.5px solid rgba(255,255,255,0.25)", color: "rgba(246,244,239,0.85)", padding: "0.85rem 1.75rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Call +91 98640 97338
              </a>
            </div>
          </div>
        </section>

        <section style={{ padding: "3.5rem 1.5rem", maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: "1rem" }}>
            Whiter teeth in a single visit
          </h2>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: "1rem" }}>
            Professional in-clinic whitening uses a higher-concentration peroxide gel, activated by a dental-grade light source, to penetrate the enamel and break down deep-set stains from coffee, tea, wine, tobacco, and ageing. The result is a dramatically brighter smile in a single 60-minute session.
          </p>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: "1rem" }}>
            Unlike home whitening kits, which use concentrations too low to produce meaningful results quickly, our in-clinic formula is clinically controlled by your dentist. Gum protection, shade measurement before and after, and a customised maintenance plan ensure you get the best possible outcome safely.
          </p>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)" }}>
            We also provide custom-made take-home trays for top-up maintenance between clinic visits — so your results stay fresh for longer.
          </p>
        </section>

        <section style={{ padding: "0 1.5rem 4rem", maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: "1.5rem" }}>
            Frequently asked questions
          </h2>
          {faqSchema.mainEntity.map((item) => (
            <details key={item.name} style={{ borderTop: "1px solid var(--color-line)", padding: "1.25rem 0" }}>
              <summary style={{ fontFamily: "var(--font-body)", fontWeight: 600, cursor: "pointer", color: "var(--color-ink)", fontSize: "0.95rem" }}>
                {item.name}
              </summary>
              <p style={{ fontFamily: "var(--font-body)", marginTop: "0.75rem", color: "var(--color-ink-soft)", lineHeight: 1.65, fontSize: "0.9rem" }}>
                {item.acceptedAnswer.text}
              </p>
            </details>
          ))}
        </section>

        <section style={{ background: "var(--color-primary)", padding: "3rem 1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#F6F4EF", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: "1.25rem" }}>
            Ready for a brighter smile?
          </p>
          <Link href="/#contact-form" style={{ display: "inline-flex", alignItems: "center", background: "var(--color-accent)", color: "var(--color-ink)", padding: "0.9rem 2rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
            Book Your Session
          </Link>
        </section>

      </article>
    </>
  );
}
