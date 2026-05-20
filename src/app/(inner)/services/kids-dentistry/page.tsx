import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kids Dentistry in Guwahati | Gentle Paediatric Dental Care",
  description:
    "Gentle, child-friendly dental care in Guwahati. Routine check-ups, fluoride treatments, and sealants designed to make your child's first dental visits positive ones.",
  openGraph: {
    title: "Kids Dentistry in Guwahati | Dental Point",
    description: "Child-friendly dental care in Guwahati — gentle check-ups, fluoride treatments, and sealants in a welcoming environment.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "At what age should my child first see a dentist?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We recommend bringing your child for their first dental visit by age 2–3, or as soon as their first teeth appear. Early visits help children become comfortable with the dental environment and allow us to monitor dental development, identify early issues, and guide good oral habits from the start.",
      },
    },
    {
      "@type": "Question",
      name: "How do you manage anxious children at the dentist?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our team uses a slow, reassuring 'tell-show-do' approach — we explain what will happen, demonstrate with instruments, and only proceed when the child is comfortable. We avoid frightening language and never rush. Most children who are nervous on their first visit are comfortable by their second.",
      },
    },
    {
      "@type": "Question",
      name: "Are dental X-rays safe for children?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Digital dental X-rays expose children to a tiny fraction of the radiation of film X-rays — less than a day's natural background radiation. We take X-rays only when clinically necessary and always use lead aprons. Early detection of hidden decay, spacing issues, and developing teeth saves children from more complex treatment later.",
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
    { "@type": "ListItem", position: 3, name: "Kids Dentistry", item: "https://dental-point-ataur.vercel.app/services/kids-dentistry" },
  ],
};

export default function KidsDentistryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article style={{ background: "var(--color-bg)", color: "var(--color-ink)", paddingTop: "7rem" }}>

        <section style={{ background: "var(--color-primary)", padding: "4rem 1.5rem 3rem" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-mint)", marginBottom: "1rem" }}>
              Preventive Dentistry · Guwahati
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#F6F4EF", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.25rem" }}>
              Kids Dentistry in Guwahati, Assam
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(246,244,239,0.75)", lineHeight: 1.65, maxWidth: 580 }}>
              Gentle, child-friendly dental care designed to build positive dental habits from the very first visit. Our team knows how to make children feel safe, heard, and even excited about their appointments.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <Link href="/#contact-form" style={{ display: "inline-flex", alignItems: "center", background: "var(--color-accent)", color: "var(--color-ink)", padding: "0.85rem 1.75rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Book Your Child&apos;s Visit
              </Link>
              <a href="tel:+919864097338" style={{ display: "inline-flex", alignItems: "center", border: "1.5px solid rgba(255,255,255,0.25)", color: "rgba(246,244,239,0.85)", padding: "0.85rem 1.75rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                Call +91 98640 97338
              </a>
            </div>
          </div>
        </section>

        <section style={{ padding: "3.5rem 1.5rem", maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: "1rem" }}>
            Building healthy smiles for life
          </h2>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: "1rem" }}>
            Children&apos;s dental health forms the foundation for a lifetime of healthy teeth and gums. Baby teeth are not &quot;just temporary&quot; — they hold space for adult teeth, support speech development, and are essential for chewing and nutrition. Decay in baby teeth can spread to developing adult teeth underneath.
          </p>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: "1rem" }}>
            At Dental Point, we offer comprehensive paediatric dental care including routine check-ups and scaling, digital X-rays (low-dose), fluoride treatments, fissure sealants (protective coating on molars), cavity fillings using tooth-coloured composite material, and guidance on diet, thumb-sucking, and oral hygiene habits. We also monitor jaw development and tooth eruption to catch orthodontic concerns early.
          </p>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)" }}>
            Our team uses gentle anaesthesia and distraction techniques to ensure pain-free treatment. We celebrate every child who completes their appointment with a small reward — because dental visits should be a positive experience.
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
            Give your child the best start
          </p>
          <Link href="/#contact-form" style={{ display: "inline-flex", alignItems: "center", background: "var(--color-accent)", color: "var(--color-ink)", padding: "0.9rem 2rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
            Book Your Child&apos;s Appointment
          </Link>
        </section>

      </article>
    </>
  );
}
