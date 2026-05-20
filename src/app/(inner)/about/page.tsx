import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Dental Point & Implant Centre | Guwahati's Premier Dental Clinic",
  description:
    "Meet the MDS-qualified team at Dental Point & Implant Centre, Guwahati. Specialists in computer-guided implants, cosmetic dentistry, and laser treatments since 2013.",
  openGraph: {
    title: "About Dental Point | Guwahati, Assam",
    description: "MDS-qualified specialists in computer-guided implants and cosmetic dentistry. Serving Guwahati and Northeast India since 2013.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://dental-point-ataur.vercel.app" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://dental-point-ataur.vercel.app/about" },
  ],
};

const doctors = [
  {
    name: "Dr. Dhritiman Borah",
    credentials: "MDS, Implantologist",
    experience: "12+ years",
    bio: "Trained at premier institutions including AIIMS, Dr. Dhritiman specialises in computer-guided implant surgery, full-arch rehabilitation, and bone grafting. His precise technique and commitment to pain-free outcomes have earned him the trust of patients across Northeast India.",
  },
  {
    name: "Dr. Asif Ahmed",
    credentials: "MDS, Prosthodontist & Cosmetic Dentist",
    experience: "10+ years",
    bio: "A specialist prosthodontist with an artist's eye for smile design, Dr. Asif's expertise spans porcelain veneers, clear aligners, and full-mouth rehabilitation. Colleagues and patients alike recognise his meticulous attention to every detail of your smile.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article style={{ background: "var(--color-bg)", color: "var(--color-ink)", paddingTop: "7rem" }}>

        <section style={{ background: "var(--color-primary)", padding: "4rem 1.5rem 3rem" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-mint)", marginBottom: "1rem" }}>
              Est. 2013 · Guwahati, Assam
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#F6F4EF", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.25rem" }}>
              About Dental Point & Implant Centre — Guwahati&apos;s Premier Dental Clinic
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(246,244,239,0.75)", lineHeight: 1.65, maxWidth: 620 }}>
              We exist to make world-class dental care accessible to every patient in Northeast India — with the technology, expertise, and human touch that most clinics in larger cities cannot offer.
            </p>
          </div>
        </section>

        <section style={{ padding: "3.5rem 1.5rem", maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: "1rem" }}>
            Our mission
          </h2>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: "1rem" }}>
            Dental Point & Implant Centre was founded with a single conviction: that patients in Guwahati deserve the same quality of care as patients in Mumbai, Delhi, or Chennai — without the expense and inconvenience of travelling south. Since opening in 2013, we have served thousands of patients from across Assam and the wider Northeast, bringing computer-guided implant surgery, laser dentistry, and digital smile design to the region.
          </p>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)" }}>
            We invest continuously in technology — 3D CBCT imaging, rotary endodontics, digital impressions, laser systems — because better tools mean better outcomes with less discomfort, fewer visits, and faster healing. Every patient, from a child&apos;s first check-up to a full-arch implant rehabilitation, receives the same unhurried, expert attention.
          </p>
        </section>

        <section style={{ padding: "0 1.5rem", maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: "2rem" }}>
            Meet the team
          </h2>
          <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {doctors.map((doc) => (
              <div key={doc.name} style={{ padding: "1.75rem", background: "var(--color-surface)", border: "1.5px solid var(--color-line)", borderRadius: "var(--radius-md)" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-primary)", marginBottom: "0.5rem" }}>
                  {doc.credentials}
                </p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 600, color: "var(--color-ink)", marginBottom: "0.25rem" }}>
                  {doc.name}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-muted)", marginBottom: "1rem" }}>
                  {doc.experience} experience
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.65, color: "var(--color-ink-soft)" }}>
                  {doc.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "3.5rem 1.5rem 4rem", maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: "1rem" }}>
            Find us
          </h2>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: "0.5rem" }}>
            N.C. Hazarika Complex, Beltola Basistha Road, near Last Gate, Dispur, Guwahati, Assam 781006
          </p>
          <p style={{ fontFamily: "var(--font-body)", lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: "0.5rem" }}>
            Mon–Sat · 9am – 9pm
          </p>
          <a href="tel:+919864097338" style={{ fontFamily: "var(--font-body)", color: "var(--color-primary)", fontWeight: 600, textDecoration: "none" }}>
            +91 98640 97338
          </a>
        </section>

        <section style={{ background: "var(--color-primary)", padding: "3rem 1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#F6F4EF", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: "1.25rem" }}>
            Ready to experience the difference?
          </p>
          <Link href="/#contact-form" style={{ display: "inline-flex", alignItems: "center", background: "var(--color-accent)", color: "var(--color-ink)", padding: "0.9rem 2rem", borderRadius: "9999px", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
            Book Your Consultation
          </Link>
        </section>

      </article>
    </>
  );
}
