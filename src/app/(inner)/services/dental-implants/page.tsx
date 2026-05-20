import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dental Implants in Guwahati | Dental Point & Implant Centre",
  description:
    "Get permanent, natural-looking dental implants in Guwahati with computer-guided precision. MDS implantologists, from ₹28,000 per tooth. Free consultation.",
  openGraph: {
    title: "Dental Implants in Guwahati | Dental Point",
    description: "Computer-guided dental implants from ₹28,000 per tooth. Zero-pain procedure, 3D CBCT scan planning, 0% EMI available.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much do dental implants cost in Guwahati?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dental implants at Dental Point start from ₹28,000 per tooth for a complete titanium implant and crown. Final cost depends on case complexity, bone condition, and the type of implant system used. A binding quote is provided after your free consultation.",
      },
    },
    {
      "@type": "Question",
      name: "Is dental implant surgery painful?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. We use computer-guided surgical templates and advanced local anaesthesia techniques to ensure a virtually pain-free experience. Most patients report less discomfort than a routine extraction.",
      },
    },
    {
      "@type": "Question",
      name: "How long do dental implants last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With proper care, dental implants can last a lifetime. The titanium post fuses permanently with your jawbone (osseointegration). The crown component may need replacement after 10–15 years depending on wear.",
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
    { "@type": "ListItem", position: 3, name: "Dental Implants", item: "https://dental-point-ataur.vercel.app/services/dental-implants" },
  ],
};

export default function DentalImplantsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article style={{ background: "var(--color-bg)", color: "var(--color-ink)", paddingTop: "7rem" }}>

        {/* Hero */}
        <section style={{ background: "var(--color-primary)", padding: "4rem 1.5rem 3rem" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-mint)", marginBottom: "1rem" }}>
              Restorative Dentistry · Guwahati
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#F6F4EF", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.25rem" }}>
              Dental Implants in Guwahati, Assam
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(246,244,239,0.75)", lineHeight: 1.65, maxWidth: 580 }}>
              Permanent, natural-looking tooth replacement using computer-guided precision. Our MDS implantologists place each implant with sub-millimeter accuracy using 3D CBCT scan planning — no guesswork, minimal trauma, faster healing.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <Link href="/#contact-form" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--color-accent)", color: "var(--color-ink)", padding: "0.85rem 1.75rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Book Free Consultation
              </Link>
              <a href="tel:+919864097338" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", border: "1.5px solid rgba(255,255,255,0.25)", color: "rgba(246,244,239,0.85)", padding: "0.85rem 1.75rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Call +91 98640 97338
              </a>
            </div>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: "3.5rem 1.5rem", maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: "1rem" }}>
            Why choose implants?
          </h2>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: "1rem" }}>
            Unlike dentures or bridges, dental implants replace the tooth root itself. The titanium post integrates permanently with your jawbone, preventing bone loss and maintaining the natural shape of your face. The result is a restoration that looks, feels, and functions exactly like your natural teeth.
          </p>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: "1rem" }}>
            At Dental Point & Implant Centre, every implant case begins with a high-resolution 3D CBCT scan. This allows our specialists to plan the exact position, depth, and angle of each implant digitally — before we touch a tool. A precision-milled surgical guide then directs placement with less than 0.5 mm deviation from the plan. The result is shorter surgery time, less soft-tissue disruption, and recovery periods often half that of conventional surgery.
          </p>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)" }}>
            We offer single-tooth implants, multiple-tooth bridges on implants, and full-arch rehabilitation (All-on-4 / All-on-6). 0% interest EMI plans are available on all implant treatments, making world-class care accessible to more patients across Guwahati and Northeast India.
          </p>

          <div style={{ margin: "2.5rem 0", padding: "1.5rem", background: "var(--color-surface)", border: "1.5px solid var(--color-line)", borderRadius: "var(--radius-md)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-primary)", marginBottom: "0.75rem" }}>Starting Price</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-ink)" }}>₹28,000 <span style={{ fontSize: "0.9rem", fontWeight: 400, color: "var(--color-ink-soft)" }}>per tooth*</span></p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-muted)", marginTop: "0.5rem" }}>* Starting price for standard single-tooth implant. Final cost after consultation. 0% EMI available.</p>
          </div>
        </section>

        {/* FAQ */}
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

        {/* CTA */}
        <section style={{ background: "var(--color-primary)", padding: "3rem 1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#F6F4EF", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: "1.25rem" }}>
            Ready to restore your smile?
          </p>
          <Link href="/#contact-form" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--color-accent)", color: "var(--color-ink)", padding: "0.9rem 2rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
            Book Your Free Consultation
          </Link>
        </section>

      </article>
    </>
  );
}
