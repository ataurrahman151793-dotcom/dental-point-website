import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <main
      className="min-h-screen py-16 px-6"
      style={{ background: "var(--color-bg)", color: "var(--color-ink)" }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <Link
          href="/"
          className="text-sm font-body"
          style={{ color: "var(--color-primary)" }}
        >
          ← Back to home
        </Link>

        <h1
          className="font-display font-semibold lowercase mt-8 mb-2"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}
        >
          privacy policy
        </h1>
        <p className="font-body text-sm mb-10" style={{ color: "var(--color-ink-soft)" }}>
          Last updated: May 2026
        </p>

        <div
          className="font-body leading-relaxed space-y-6 text-base"
          style={{ color: "var(--color-ink-soft)" }}
        >
          <p>
            Dental Point &amp; Implant Centre (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to
            protecting your personal information and your right to privacy. This policy explains
            what information we collect when you visit our website or contact our clinic.
          </p>

          <h2 className="font-display font-semibold text-xl" style={{ color: "var(--color-ink)" }}>
            information we collect
          </h2>
          <p>
            We may collect your name, email address, phone number, and any information you submit
            via our contact or appointment request forms. We do not share this information with
            third parties except as required to fulfil your appointment or as required by law.
          </p>

          <h2 className="font-display font-semibold text-xl" style={{ color: "var(--color-ink)" }}>
            how we use it
          </h2>
          <p>
            Your information is used solely to respond to your enquiries, confirm appointments,
            and improve our services. We do not send marketing communications without your consent.
          </p>

          <h2 className="font-display font-semibold text-xl" style={{ color: "var(--color-ink)" }}>
            cookies
          </h2>
          <p>
            Our website uses essential cookies to ensure the site functions correctly, and
            analytics cookies (Vercel Analytics) to understand how visitors use the site. No
            personally identifiable data is stored in cookies.
          </p>

          <h2 className="font-display font-semibold text-xl" style={{ color: "var(--color-ink)" }}>
            contact us
          </h2>
          <p>
            Questions about this policy? Call us at{" "}
            <a href="tel:+919864097338" style={{ color: "var(--color-primary)" }}>
              +91 98640 97338
            </a>{" "}
            or visit us at N.C. Hazarika Complex, Beltola Basistha Road, Dispur, Guwahati,
            Assam 781006.
          </p>

          <p
            className="text-xs pt-4 border-t"
            style={{ borderColor: "var(--color-line)", color: "var(--color-ink-soft)", opacity: 0.6 }}
          >
            This is a placeholder privacy policy. Please consult a legal professional to ensure
            compliance with applicable laws before publishing live.
          </p>
        </div>
      </div>
    </main>
  );
}
