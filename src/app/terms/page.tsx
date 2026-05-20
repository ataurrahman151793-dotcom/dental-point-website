import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  robots: { index: false },
};

export default function TermsPage() {
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
          terms of service
        </h1>
        <p className="font-body text-sm mb-10" style={{ color: "var(--color-ink-soft)" }}>
          Last updated: May 2026
        </p>

        <div
          className="font-body leading-relaxed space-y-6 text-base"
          style={{ color: "var(--color-ink-soft)" }}
        >
          <p>
            By accessing or using the Dental Point &amp; Implant Centre website, you agree to be
            bound by these terms. If you do not agree, please do not use this website.
          </p>

          <h2 className="font-display font-semibold text-xl" style={{ color: "var(--color-ink)" }}>
            use of this site
          </h2>
          <p>
            This website is provided for informational purposes only. Content on this site does not
            constitute medical advice. Always consult a qualified dental professional before making
            health decisions.
          </p>

          <h2 className="font-display font-semibold text-xl" style={{ color: "var(--color-ink)" }}>
            appointments &amp; cancellations
          </h2>
          <p>
            Appointment requests submitted via this website are not confirmed until you receive a
            direct confirmation from our team by phone or message. We ask that you give at least
            24 hours&rsquo; notice if you need to cancel or reschedule.
          </p>

          <h2 className="font-display font-semibold text-xl" style={{ color: "var(--color-ink)" }}>
            intellectual property
          </h2>
          <p>
            All content on this website — including text, images, logos, and design — is the
            property of Dental Point &amp; Implant Centre and may not be reproduced without written
            permission.
          </p>

          <h2 className="font-display font-semibold text-xl" style={{ color: "var(--color-ink)" }}>
            contact us
          </h2>
          <p>
            Questions about these terms? Call us at{" "}
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
            This is a placeholder terms of service document. Please consult a legal professional
            to ensure compliance before publishing live.
          </p>
        </div>
      </div>
    </main>
  );
}
