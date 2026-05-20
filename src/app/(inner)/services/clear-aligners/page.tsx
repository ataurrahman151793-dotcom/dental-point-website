import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Clear Aligners in Guwahati | Invisible Teeth Straightening",
  description:
    "Straighten your teeth invisibly with clear aligners in Guwahati. MDS prosthodontist, from ₹65,000 full treatment, 12–18 months. Free consultation at Dental Point.",
  openGraph: {
    title: "Clear Aligners in Guwahati | Dental Point",
    description: "Invisible teeth straightening from ₹65,000. No metal wires, 12–18 month timeline, retainers included.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much do clear aligners cost in Guwahati?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Clear aligner treatment at Dental Point starts from ₹65,000 for a complete course including all aligners, monthly reviews, and retainers. The final cost depends on case complexity and the number of aligners required. A binding quote is given after your consultation.",
      },
    },
    {
      "@type": "Question",
      name: "How long does clear aligner treatment take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most clear aligner cases complete in 12–18 months, with mild cases finishing in as few as 6 months. You wear each set of aligners for about 2 weeks before progressing to the next tray in your sequence.",
      },
    },
    {
      "@type": "Question",
      name: "Are clear aligners as effective as metal braces?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For mild to moderate crowding, spacing, and bite issues, clear aligners are as effective as traditional braces. Severe skeletal discrepancies may still require fixed appliances. Our specialist will advise which option suits your case after a clinical assessment.",
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
    { "@type": "ListItem", position: 3, name: "Clear Aligners", item: "https://dental-point-ataur.vercel.app/services/clear-aligners" },
  ],
};

export default function ClearAlignersPage() {
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
              Clear Aligners in Guwahati, Assam
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(246,244,239,0.75)", lineHeight: 1.65, maxWidth: 580 }}>
              Straighten your teeth without metal wires or brackets. Our MDS specialist designs a precise digital treatment plan so you can see your final result before you begin — completely invisible, removable, and comfortable.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <Link href="/#contact-form" style={{ display: "inline-flex", alignItems: "center", background: "var(--color-accent)", color: "var(--color-ink)", padding: "0.85rem 1.75rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Book Free Consultation
              </Link>
              <a href="tel:+919864097338" style={{ display: "inline-flex", alignItems: "center", border: "1.5px solid rgba(255,255,255,0.25)", color: "rgba(246,244,239,0.85)", padding: "0.85rem 1.75rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Call +91 98640 97338
              </a>
            </div>
          </div>
        </section>

        <section style={{ padding: "3.5rem 1.5rem", maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: "1rem" }}>
            A straighter smile — on your terms
          </h2>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: "1rem" }}>
            Clear aligners are custom-fabricated, near-invisible trays that gradually shift your teeth into their ideal positions. You wear each set for approximately two weeks, then move to the next tray in your sequence. Between appointments, you can remove them to eat, brush, and floss — no dietary restrictions, no difficult cleaning routines.
          </p>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: "1rem" }}>
            At Dental Point, Dr. Asif Ahmed — our MDS prosthodontist and smile design specialist — plans your treatment using digital impressions and advanced simulation software. You can see your projected final result before committing to a single tray. Monthly progress reviews keep treatment on track, and retainers are included in your treatment package.
          </p>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)" }}>
            We offer 0% interest EMI plans, making clear aligner treatment in Guwahati accessible without a large upfront payment.
          </p>

          <div style={{ margin: "2.5rem 0", padding: "1.5rem", background: "var(--color-surface)", border: "1.5px solid var(--color-line)", borderRadius: "var(--radius-md)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-primary)", marginBottom: "0.75rem" }}>Starting Price</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--color-ink)" }}>₹65,000 <span style={{ fontSize: "0.9rem", fontWeight: 400, color: "var(--color-ink-soft)" }}>full treatment*</span></p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-muted)", marginTop: "0.5rem" }}>* Starting price. Includes aligners, monthly reviews &amp; retainers. Final cost after consultation.</p>
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
            Start your smile transformation
          </p>
          <Link href="/#contact-form" style={{ display: "inline-flex", alignItems: "center", background: "var(--color-accent)", color: "var(--color-ink)", padding: "0.9rem 2rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
            Book Your Free Consultation
          </Link>
        </section>

      </article>
    </>
  );
}
