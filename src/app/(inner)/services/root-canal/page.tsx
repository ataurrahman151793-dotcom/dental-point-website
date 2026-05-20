import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Painless Root Canal Treatment in Guwahati | Dental Point",
  description:
    "Save your tooth with painless root canal treatment in Guwahati. Laser endodontics, MDS specialists, single-visit in most cases. Book at Dental Point.",
  openGraph: {
    title: "Painless Root Canal in Guwahati | Dental Point",
    description: "Pain-free root canal treatment using laser endodontics. Single-visit in most cases. MDS specialists in Guwahati.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is root canal treatment painful?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Modern root canal treatment is no more uncomfortable than a filling. We use advanced local anaesthesia and, where appropriate, laser endodontics to clean the root canal system with minimal instrumentation. Most patients are surprised by how comfortable the procedure is.",
      },
    },
    {
      "@type": "Question",
      name: "How many appointments does a root canal take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most root canals at Dental Point are completed in a single visit of 60–90 minutes. Complex multi-rooted teeth or cases with active infection may require two visits. A crown is placed after treatment to protect the restored tooth.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I don't get a root canal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An untreated infected tooth will not heal on its own. The infection spreads to surrounding bone and neighbouring teeth, and can cause life-threatening spread to the jaw or neck. Saving the tooth with a root canal is always preferable to extraction, as nothing replaces a natural tooth.",
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
    { "@type": "ListItem", position: 3, name: "Root Canal", item: "https://dental-point-ataur.vercel.app/services/root-canal" },
  ],
};

export default function RootCanalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article style={{ background: "var(--color-bg)", color: "var(--color-ink)", paddingTop: "7rem" }}>

        <section style={{ background: "var(--color-primary)", padding: "4rem 1.5rem 3rem" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-mint)", marginBottom: "1rem" }}>
              Restorative Dentistry · Guwahati
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#F6F4EF", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.25rem" }}>
              Painless Root Canal Treatment in Guwahati
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(246,244,239,0.75)", lineHeight: 1.65, maxWidth: 580 }}>
              Save your natural tooth with modern, virtually pain-free endodontic treatment. Using laser technology and advanced anaesthesia, our MDS specialists make root canals a calm, comfortable experience — usually completed in a single visit.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <Link href="/#contact-form" style={{ display: "inline-flex", alignItems: "center", background: "var(--color-accent)", color: "var(--color-ink)", padding: "0.85rem 1.75rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Book an Appointment
              </Link>
              <a href="tel:+919864097338" style={{ display: "inline-flex", alignItems: "center", border: "1.5px solid rgba(255,255,255,0.25)", color: "rgba(246,244,239,0.85)", padding: "0.85rem 1.75rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Call +91 98640 97338
              </a>
            </div>
          </div>
        </section>

        <section style={{ padding: "3.5rem 1.5rem", maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: "1rem" }}>
            Save your tooth — save your smile
          </h2>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: "1rem" }}>
            Root canal treatment becomes necessary when the soft tissue (pulp) inside a tooth becomes infected or inflamed — typically due to deep decay, a crack, or trauma. The pulp is removed, the root canals are cleaned and shaped, and the tooth is sealed and protected with a crown. The result: a natural tooth that can last a lifetime.
          </p>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: "1rem" }}>
            At Dental Point, we use rotary endodontic instruments and dental laser energy to clean and disinfect root canal systems with exceptional precision. Laser endodontics reaches areas that instruments cannot, dramatically reducing bacteria counts and the risk of re-infection. In most straightforward cases, the entire procedure is completed in a single 60–90 minute appointment.
          </p>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)" }}>
            After root canal treatment, your tooth is protected with a custom crown — same-day crowns are available using our in-house milling technology, so you leave with a finished restoration in a single visit.
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
            In pain? Don&apos;t wait.
          </p>
          <Link href="/#contact-form" style={{ display: "inline-flex", alignItems: "center", background: "var(--color-accent)", color: "var(--color-ink)", padding: "0.9rem 2rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
            Book an Emergency Appointment
          </Link>
        </section>

      </article>
    </>
  );
}
