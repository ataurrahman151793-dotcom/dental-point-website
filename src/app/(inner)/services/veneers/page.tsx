import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Porcelain Veneers in Guwahati | Smile Makeover",
  description:
    "Transform your smile with precision-crafted porcelain veneers in Guwahati. From ₹6,000 per tooth. MDS cosmetic specialist. Book your free consultation.",
  openGraph: {
    title: "Porcelain Veneers in Guwahati | Dental Point",
    description: "Smile makeover with porcelain veneers from ₹6,000 per tooth. 10+ year durability, shade-matched.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much do veneers cost in Guwahati?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Porcelain veneers at Dental Point start from ₹6,000 per tooth for composite veneers and from ₹12,000 per tooth for feldspathic porcelain veneers. The final cost depends on material choice and the number of teeth treated. A binding quote is provided after your smile design consultation.",
      },
    },
    {
      "@type": "Question",
      name: "How long do porcelain veneers last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Well-cared-for porcelain veneers typically last 10–15 years. With good oral hygiene, avoidance of very hard foods, and regular check-ups, many patients keep their veneers for 20+ years.",
      },
    },
    {
      "@type": "Question",
      name: "Is the veneer procedure painful?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Veneer preparation involves removing a thin layer of enamel (about 0.5 mm) under local anaesthesia. Most patients feel no discomfort during the procedure. Some sensitivity for a day or two afterwards is normal and resolves quickly.",
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
    { "@type": "ListItem", position: 3, name: "Veneers", item: "https://dental-point-ataur.vercel.app/services/veneers" },
  ],
};

export default function VeneersPage() {
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
              Porcelain Veneers in Guwahati, Assam
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(246,244,239,0.75)", lineHeight: 1.65, maxWidth: 580 }}>
              Thin, precision-crafted shells of porcelain bonded to the front of your teeth. Correct chips, discolouration, gaps, and shape — a complete smile transformation in as few as two appointments.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <Link href="/#contact-form" style={{ display: "inline-flex", alignItems: "center", background: "var(--color-accent)", color: "var(--color-ink)", padding: "0.85rem 1.75rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Design My Smile
              </Link>
              <a href="tel:+919864097338" style={{ display: "inline-flex", alignItems: "center", border: "1.5px solid rgba(255,255,255,0.25)", color: "rgba(246,244,239,0.85)", padding: "0.85rem 1.75rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Call +91 98640 97338
              </a>
            </div>
          </div>
        </section>

        <section style={{ padding: "3.5rem 1.5rem", maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: "1rem" }}>
            The art of smile design
          </h2>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: "1rem" }}>
            Porcelain veneers are the gold standard for smile makeovers. Each veneer is individually crafted in a dental laboratory to the exact shade, shape, and size that complements your face, skin tone, and personality. The result is a smile that looks completely natural — because it is designed specifically for you.
          </p>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: "1rem" }}>
            Dr. Asif Ahmed, our MDS prosthodontist, uses digital smile design tools to preview your result before any tooth preparation begins. Minimal enamel removal (typically 0.3–0.5 mm) preserves the strength of your underlying teeth. Composite veneers are available as a same-appointment, reversible alternative for patients who prefer a conservative approach.
          </p>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)" }}>
            Whether you want to fix a single chip or transform your entire smile with 8–10 veneers, our team delivers results that look stunning and last for over a decade.
          </p>

          <div style={{ margin: "2.5rem 0", padding: "1.5rem", background: "var(--color-surface)", border: "1.5px solid var(--color-line)", borderRadius: "var(--radius-md)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-primary)", marginBottom: "0.75rem" }}>Starting Price</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-ink)" }}>₹6,000 <span style={{ fontSize: "0.9rem", fontWeight: 400, color: "var(--color-ink-soft)" }}>per tooth*</span></p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-muted)", marginTop: "0.5rem" }}>* Composite veneers from ₹6,000; porcelain from ₹12,000 per tooth. Final price after consultation.</p>
          </div>
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
            Ready to love your smile?
          </p>
          <Link href="/#contact-form" style={{ display: "inline-flex", alignItems: "center", background: "var(--color-accent)", color: "var(--color-ink)", padding: "0.9rem 2rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
            Book Your Free Consultation
          </Link>
        </section>

      </article>
    </>
  );
}
