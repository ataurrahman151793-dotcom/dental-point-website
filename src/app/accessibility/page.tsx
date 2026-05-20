import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility",
  robots: { index: false },
};

export default function AccessibilityPage() {
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
          accessibility
        </h1>
        <p className="font-body text-sm mb-10" style={{ color: "var(--color-ink-soft)" }}>
          Last updated: May 2026
        </p>

        <div
          className="font-body leading-relaxed space-y-6 text-base"
          style={{ color: "var(--color-ink-soft)" }}
        >
          <p>
            Dental Point &amp; Implant Centre is committed to ensuring our website is accessible
            to all visitors, including those with disabilities. We continually improve the user
            experience for everyone and apply relevant accessibility standards.
          </p>

          <h2 className="font-display font-semibold text-xl" style={{ color: "var(--color-ink)" }}>
            our standards
          </h2>
          <p>
            We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA.
            This includes providing text alternatives for images, keyboard-navigable interfaces,
            sufficient colour contrast, and clear focus indicators.
          </p>

          <h2 className="font-display font-semibold text-xl" style={{ color: "var(--color-ink)" }}>
            clinic accessibility
          </h2>
          <p>
            Our physical clinic at N.C. Hazarika Complex, Dispur is wheelchair accessible.
            Please call us at{" "}
            <a href="tel:+919864097338" style={{ color: "var(--color-primary)" }}>
              +91 98640 97338
            </a>{" "}
            before your visit if you have specific accessibility requirements and we will make
            appropriate arrangements.
          </p>

          <h2 className="font-display font-semibold text-xl" style={{ color: "var(--color-ink)" }}>
            known limitations
          </h2>
          <p>
            Some older embedded content and third-party maps may not fully meet accessibility
            standards. We are working to address these. If you encounter a barrier, please
            contact us and we will provide the information in an alternative format.
          </p>

          <h2 className="font-display font-semibold text-xl" style={{ color: "var(--color-ink)" }}>
            feedback
          </h2>
          <p>
            If you experience any accessibility issues on our website, please contact us at{" "}
            <a href="tel:+919864097338" style={{ color: "var(--color-primary)" }}>
              +91 98640 97338
            </a>
            . We take all feedback seriously and aim to respond within 5 business days.
          </p>

          <p
            className="text-xs pt-4 border-t"
            style={{ borderColor: "var(--color-line)", color: "var(--color-ink-soft)", opacity: 0.6 }}
          >
            This is a placeholder accessibility statement. Please review and update it to reflect
            actual compliance testing before publishing live.
          </p>
        </div>
      </div>
    </main>
  );
}
