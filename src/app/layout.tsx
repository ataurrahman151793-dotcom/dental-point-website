import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
/* Self-hosted variable fonts via @fontsource — no Google CDN dependency */
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { SITE_URL } from "@/lib/siteConfig";

const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Dental Point & Implant Centre",
  description:
    "MDS-qualified dental specialists offering computer-guided implants, same-day crowns, laser dentistry, and Invisalign in Guwahati, Assam.",
  url: SITE_URL,
  telephone: "+919864097338",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "N.C. Hazarika Complex, Beltola Basistha Road, near Last Gate",
    addressLocality: "Guwahati",
    addressRegion: "Assam",
    postalCode: "781006",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.139001,
    longitude: 91.789896,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    ratingCount: "500",
  },
  sameAs: [
    "https://www.facebook.com/dentalpointguwahati",
    "https://www.instagram.com/dentalpointassam",
  ],
};

export const metadata: Metadata = {
  title: {
    default:
      "Dental Point & Implant Centre | Best Dental Implants in Guwahati, Assam",
    template: "%s | Dental Point & Implant Centre",
  },
  description:
    "Guwahati's premier dental clinic — MDS-qualified specialists delivering computer-guided implants, same-day crowns, Invisalign & laser dentistry. 500+ 5-star reviews. 0% EMI available.",
  keywords: [
    "dentist Guwahati",
    "dental implants Guwahati",
    "same-day crowns Guwahati",
    "computer guided implants Assam",
    "Invisalign Guwahati",
    "laser dentistry Guwahati",
    "cosmetic dentistry Guwahati",
    "best dentist Dispur",
    "Dental Point & Implant Centre",
    "MDS specialist Guwahati",
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Dental Point & Implant Centre",
    title:
      "Dental Point & Implant Centre | Best Dental Implants in Guwahati",
    description:
      "MDS-qualified specialists delivering computer-guided implants, same-day crowns & laser dentistry in Guwahati. 500+ 5-star Google reviews.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dental Point & Implant Centre — Guwahati, Assam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Dental Point & Implant Centre | Best Dental Implants in Guwahati",
    description:
      "MDS-qualified specialists in Guwahati. Computer-guided implants, same-day crowns, Invisalign & laser dentistry.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  other: {
    "geo.region":    "IN-AS",
    "geo.placename": "Guwahati, Assam",
    "geo.position":  "26.139001;91.789896",
    "ICBM":          "26.139001, 91.789896",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
        />
      </head>
      <body className="bg-bg text-ink antialiased">
        <a href="#main-content" className="skip-link">
          skip to content
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
