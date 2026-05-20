import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book an Appointment | Dental Point & Implant Centre, Guwahati",
  description:
    "Book your appointment at Dental Point & Implant Centre in Guwahati. Call, WhatsApp, or fill the online form. Most appointments available within the week.",
  openGraph: {
    title: "Contact Dental Point | Guwahati, Assam",
    description: "Book an appointment at Dental Point, Guwahati. Available Mon–Sat, 9am–9pm. Call +91 98640 97338.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://dental-point-ataur.vercel.app" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://dental-point-ataur.vercel.app/contact" },
  ],
};

const contactPoints = [
  { label: "Phone", value: "+91 98640 97338", href: "tel:+919864097338" },
  { label: "WhatsApp", value: "Chat 24/7", href: "https://wa.me/919864097338" },
  { label: "Email", value: "Available via enquiry form", href: "/#contact-form" },
  { label: "Hours", value: "Mon–Sat · 9am – 9pm", href: undefined },
  { label: "Address", value: "N.C. Hazarika Complex, Beltola Basistha Road, near Last Gate, Dispur, Guwahati 781006", href: "https://maps.google.com/?q=26.139001,91.789896" },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article style={{ background: "var(--color-bg)", color: "var(--color-ink)", paddingTop: "7rem" }}>

        <section style={{ background: "var(--color-primary)", padding: "4rem 1.5rem 3rem" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-mint)", marginBottom: "1rem" }}>
              Guwahati, Assam
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#F6F4EF", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.25rem" }}>
              Book an Appointment at Dental Point & Implant Centre
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(246,244,239,0.75)", lineHeight: 1.65 }}>
              We typically confirm appointments within a few hours and offer early morning and evening slots to fit working professionals.
            </p>
          </div>
        </section>

        <section style={{ padding: "3.5rem 1.5rem 4rem", maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "grid", gap: "1rem", marginBottom: "3rem" }}>
            {contactPoints.map((pt) => (
              <div key={pt.label} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", padding: "1.25rem", background: "var(--color-surface)", border: "1.5px solid var(--color-line)", borderRadius: "var(--radius-md)" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-primary)", minWidth: 72, paddingTop: "0.15rem" }}>
                  {pt.label}
                </p>
                {pt.href ? (
                  <a href={pt.href} target={pt.href.startsWith("http") ? "_blank" : undefined} rel={pt.href.startsWith("http") ? "noopener noreferrer" : undefined} style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", textDecoration: "none", fontWeight: 600, lineHeight: 1.5 }}>
                    {pt.value}
                  </a>
                ) : (
                  <p style={{ fontFamily: "var(--font-body)", color: "var(--color-ink-soft)", lineHeight: 1.5 }}>{pt.value}</p>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", padding: "2rem", background: "var(--color-primary)", borderRadius: "var(--radius-md)" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", color: "#F6F4EF", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: "1rem" }}>
              Prefer to fill out a form?
            </p>
            <Link href="/#contact-form" style={{ display: "inline-flex", alignItems: "center", background: "var(--color-accent)", color: "var(--color-ink)", padding: "0.85rem 1.75rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
              Go to Appointment Form
            </Link>
          </div>
        </section>

      </article>
    </>
  );
}
